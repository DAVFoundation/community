import app from './app';
import mongoose from 'mongoose';
import config from './config';
import {initialSetup} from './lib/setup';
import {generateRandomStations} from './lib/dummyData';


mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.url, {useMongoClient:true})
  .then(() => {
    console.log('connected to DB');
    initialSetup();
    //mongoose.connection.db.dropDatabase();

    if(config.generateData){
      generateRandomStations();
    }
  })
  .catch((err) => console.log(err));


app.listen(3000, () => {
  console.log("api server started on port 3000");
});

export default app;
