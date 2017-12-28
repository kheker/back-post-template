import express from 'express';
import constants from './config/constants';
import './config/db';
import middlewares from './config/middlewares';
import routes from './modules';

const app = express();

middlewares(app);


routes(app);


app.listen(constants.PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`
    Server corriendo en el puerto : ${constants.PORT}
    ---
    corriendo en ${process.env.NODE_ENV}
    ---
    mi primer backend!
    `);
  }
});
