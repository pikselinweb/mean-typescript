import * as mongoose from 'mongoose';
import * as util from 'util';

import { config } from './config';

const debug = require('debug')('express-mongoose-es6-rest-api:index');
mongoose.set('useCreateIndex', true);

const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}
