import { Router } from 'express';
import validate from 'express-validator';
import { authJwt } from '../../services/passport';
import * as postControllers from './post.controller';
import postValidation from './post.validation';
const routes = new Router();

routes.post('/agregar-post', authJwt , validate(postValidation.addPost) ,postControllers.addPost);
routes.put('/edit/:id', authJwt, postControllers.editPost);
routes.get('/:id', postControllers.getPost);
routes.get('/',postControllers.getAll);


export default routes;