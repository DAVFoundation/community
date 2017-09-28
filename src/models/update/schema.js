import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const Schema = mongoose.Schema;

const updateSchema = new Schema({
  title:{
    type:String,
    trim:true
  },
  description:{
    type:String,
    required:true,
    trim:true
  },
  davAccount:{
    type: Schema.Types.ObjectId,
    ref:'DavAccount'
  }
});

updateSchema.plugin(timestamp);

export default updateSchema;
