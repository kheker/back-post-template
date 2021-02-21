import { Router } from 'express';
import { authJwt } from '../../services/passport';
import { validateUserJoi } from '../user/user.validation';
import * as postControllers from './post.controller';
import postValidation from './post.validation';

const routes = new Router();

routes.post('/agregar-post', authJwt, validateUserJoi(postValidation), postControllers.addPost);
routes.post('/proposal/:id', authJwt, postControllers.addProposal);
routes.put('/hireUser/:id', authJwt, postControllers.hireUser);
routes.put('/edit/:id', authJwt, postControllers.editPost);
routes.get('/:id', postControllers.getPost);
routes.get('/', postControllers.getAll);


export default routes;
