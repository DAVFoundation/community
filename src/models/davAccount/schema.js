import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const Schema = mongoose.Schema;

const davAccountSchema = new Schema({
  uid:{
    type:String,
    required:true,
    trim:true
  }
});

davAccountSchema.plugin(timestamp);

davAccountSchema.virtual('updates',{
  ref: 'Update',
  localField: '_id',
  foreignField: 'davAccount'
});

davAccountSchema.pre('save', function(next){
  console.log("pre save on dav account");
  next();
});

davAccountSchema.post('save', function(doc){
  console.log("post save on dav account");
});

export default davAccountSchema;
