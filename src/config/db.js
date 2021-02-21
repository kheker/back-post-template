import mongoose from 'mongoose';

import constants from './constants';

mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
}

mongoose.connection
  .once('open', () => { console.log('mongodb esta corriendo'); })
  .on('error', (e) => {
    throw e;
  });
