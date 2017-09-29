global.globalDavUid = null;

import app from './app';
import mongoose from 'mongoose';
import {createMainDavAccount} from './lib/utils';

if(process.env.NODE_ENV !== 'production'){
  var config = require('./config/config.dev.js');
} else {
  var config = require('./config/config.js');
}

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.url)
  .then(() => {
    console.log('connected to DB');
    createMainDavAccount();
    //mongoose.connection.db.dropDatabase();
  })
  .catch((err) => console.log(err));


app.listen(3000, () => {
  console.log("api server started on port 3000");
});

export default app;
