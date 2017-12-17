import { Router } from 'express';

import * as postControllers from './post.controller';

const routes = new Router();

routes.post('/Agregar-Post',postControllers.addPost);

export default routes;