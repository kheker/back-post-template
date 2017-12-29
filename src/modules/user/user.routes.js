import { Router } from 'express';
import { validateUserJoi, Schemas } from './user.validation';
import * as userController from './user.controllers';
import { authJwt, authLocal } from '../../services/passport';



const routes = new Router();
routes.post('/login', authLocal, userController.login);
routes.post('/register', validateUserJoi(Schemas.singInSchema), userController.register);
routes.put('/editPerfil', authJwt, validateUserJoi(Schemas.updateUserSchema), userController.editPerfil);
routes.get('/Users', userController.getAllUsers);
routes.get('/Users/:id', userController.getUser);
routes.get('/perfil', authJwt, userController.perfil);

export default routes;
