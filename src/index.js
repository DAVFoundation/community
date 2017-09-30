import app from './app';
import mongoose from 'mongoose';
import config from './config';
import {initialSetup} from './lib/setup';


mongoose.Promise = global.Promise;
mongoose.createConnection(config.mongo.url, {useMongoClient:true})
  .then(() => {
    console.log('connected to DB');
    initialSetup();
    //mongoose.connection.db.dropDatabase();
  })
  .catch((err) => console.log(err));


app.listen(3000, () => {
  console.log("api server started on port 3000");
});

export default app;
