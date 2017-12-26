import HTTPStatus from 'http-status';
import Post from './post.model';
import Proposal from '../proposal/proposal.model';
import Comment from '../comments/comment.model';

export async function addPost(req, res) {
  try {
    const body = {
      category:req.body.category,
      title:req.body.title,
      description:req.body.description,
      tags:req.body.tags,
      fixedValue:req.body.fixedValue,
      owner:req.user.id
    }
    const post = await Post.createPost(body, req.user.id);
    await Comment.create({postRefId:post._id, userRef:req.user.id});
    return res.status(HTTPStatus.CREATED).json(post);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json({e,error:true,message:'hubo un error en el servidor intentalo de nuevo o mas tarde'});
  }
}

export async function getAll(req, res){
  try {
    const post = await Post.find().populate('owner');
    return res.status(HTTPStatus.OK).json(post);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json({error:true,message:'hubo un error en el servidor intentalo de nuevo o mas tarde'});
  }
}

export async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate('owner');
    return res.status(HTTPStatus.OK).json(post);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json({error:true,message:'hubo un error en el servidor intentalo de nuevo o mas tarde'});    
  }
}

export async function editPost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (post.owner.toString() !== req.user.id.toString()) {
      return res.status(HTTPStatus.UNAUTHORIZED).json({e,error:true, messaje:'No eres el propietario del post'});
    } else {
      // const body = {
      // category:req.body.category,
      // title:req.body.title,
      // description:req.body.description,
      // tags:req.body.tags,
      // fixedValue:req.body.fixedValue,
      // }
      Object.keys(req.body).forEach(key => {
        post[key] = req.body[key];
      });
        console.log(post);
      return res.status(HTTPStatus.OK).json(await post.save());
    }
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json({e,error:true,message:'hubo un error en el servidor intentalo de nuevo o mas tarde'});        
  }
}

export async function addProposal(req, res){
  try {
    const offerts = await Proposal.findOne({userId:req.user.id});
    const post = await Post.findById(req.params.id);
    if (offerts.proposals.some(t => t.postId.equals(post._id))) {
      return res.status(HTTPStatus.BAD_REQUEST).json({error:true, message:'Ya has enviado una propuesta a este post'});
    }else{
      const offer = {
        bid: req.body.bid,
        message: req.body.message,
        postId: req.params.id
      }
      offerts.proposals.push(offer);
      const newPost = await Post.incProposalCount(post._id);
      await offerts.save();
      return res.status(HTTPStatus.CREATED).json({offerts:offerts,newPost});
    }
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function hireUser(req, res) {
  try {
    const hired = {
      hireUserId: req.params.id
    }
    const post = await Post.findById({_id: req.body.postId});
    if (post.owner.toString() !== req.user.id.toString()) {
      return res.status(HTTPStatus.UNAUTHORIZED).json({e,error:true, messaje:'No eres el propietario del post'});
    } else {
      await Comment.findByIdAndUpdate(post._id,{hireUserId},{new: true});
      return res.status(HTTPStatus.OK).json({message: 'Has contratado a este usuario'});
    }
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}