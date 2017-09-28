import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  owner:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

stationSchema.plugin(timestamp);

export default stationSchema;
