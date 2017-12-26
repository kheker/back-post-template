import { Router } from 'express';
import validate from 'express-validator';
import userValidation from './user.validation';
import * as userController from './user.controllers';
import { authJwt } from '../../services/passport';
import { authLocal } from '../../services/passport';

const routes = new Router();
routes.post('/login', authLocal ,userController.login);
routes.post('/register',validate(userValidation.register), userController.register);
routes.put('/editPerfil', authJwt, userController.editPerfil);
routes.get('/Users', userController.getAllUsers);
routes.get('/Users/:id', userController.getUser);
routes.get('/perfil', authJwt ,userController.perfil);

export default routes;