import app from './app';
import mongoose from 'mongoose';
import {createMainDavAccount} from './lib/utils';


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017')
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
