import app from './app';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017')
  .then(() => console.log('connected to DB'))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("api server started on port 3000");
});

export default app;
