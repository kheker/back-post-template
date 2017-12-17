import HTTPStatus from 'http-status';
import Post from './post.model';

export async function addPost(req, res , next) {
  try {
    const body = {
      category:req.body.category,
      title:req.body.title,
      description:req.body.description,
      tags:req.body.tags,
      fixedValue:req.body.fixedValue,
      owner:req.user.id
    }
    const post = await Post.create(body);
    return res.status(HTTPStatus.CREATED).json(post);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}