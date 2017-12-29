import HTTPStatus from 'http-status';
import Post from './post.model';
import Proposal from '../proposal/proposal.model';
import Comment from '../comments/comment.model';
import filteredBody from '../../utils/filteredBody';
import { SchemaList } from '../../config/constants';

export async function addPost(req, res, next) {
  const body = filteredBody(req.body, SchemaList.posts.create)
  try {
    const post = await Post.createPost(body, req.user.id);
    await Comment.create({ postRefId: post._id, userRef: req.user.id });
    return res.status(HTTPStatus.CREATED).json(post);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function getAll(req, res, next) {
  try {
    const post = await Post.find().populate('owner');
    return res.status(HTTPStatus.OK).json(post);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function getPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id).populate('owner');
    return res.status(HTTPStatus.OK).json(post);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function editPost(req, res, next) {
  const body = filteredBody(req.body, SchemaList.posts.update)
  try {
    const post = await Post.findById(req.params.id);
    if (post.owner.toString() !== req.user.id.toString()) {
      return res.status(HTTPStatus.UNAUTHORIZED).json({ error: true, messaje: 'No eres el propietario del post' });
    }
    Object.keys(body).forEach((key) => {
      post[key] = body[key];
    });
    return res.status(HTTPStatus.OK).json(await post.save());
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function addProposal(req, res) {
  try {
    const offerts = await Proposal.findOne({ userId: req.user.id });
    const post = await Post.findById(req.params.id);
    if (offerts.proposals.some(t => t.postId.equals(post._id))) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ error: true, message: 'Ya has enviado una propuesta a este post' });
    }
    const offer = {
      bid: req.body.bid,
      message: req.body.message,
      postId: req.params.id,
    };
    offerts.proposals.push(offer);
    const newPost = await Post.incProposalCount(post._id);
    await offerts.save();
    return res.status(HTTPStatus.CREATED).json({ offerts, newPost });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function hireUser(req, res) {
  try {
    const post = await Post.findById({ _id: req.body.postId });
    if (post.owner.toString() !== req.user.id.toString()) {
      return res.status(HTTPStatus.UNAUTHORIZED).json({ error: true, messaje: 'No eres el propietario del post' });
    }
    await Comment.findByIdAndUpdate(post._id, { hireUserId: req.params.id }, { new: true });
    return res.status(HTTPStatus.OK).json({ message: 'Has contratado a este usuario' });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
