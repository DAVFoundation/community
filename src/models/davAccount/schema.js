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
})

export default davAccountSchema;
