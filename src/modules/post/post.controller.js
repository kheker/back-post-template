import HTTPStatus from 'http-status';
import Post from './post.model';

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
    return res.status(HTTPStatus.CREATED).json(post);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json({error:true,message:'hubo un error en el servidor intentalo de nuevo o mas tarde'});
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
      return res.status(HTTPStatus.UNAUTHORIZED).json({error:true, messaje:'No eres el propietario del post'});
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