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

updateSchema.pre('save', function(next){
  console.log("pre hook on update");
  next();
});

updateSchema.post('save', function(doc){
  console.log("post hook on update");
});

export default updateSchema;
