import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';
import {randomDavAddress} from '../../lib/utils';


const Schema = mongoose.Schema;

const davAccountSchema = new Schema({
  uid:{
    type:String,
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
  if(this.isNew){
    console.log("this is a new dav account");
    this.uid = randomDavAddress();
  }
  next();
});

davAccountSchema.post('save', function(doc){
  console.log("post save on dav account");
});

export default davAccountSchema;
