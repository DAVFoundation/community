import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const Schema = mongoose.Schema;

const updateSchema = new Schema({
  title:{
    type:String,
    trim:true
  },
  name: {
    type: String,
    trim:true
  },
  createdAt: Date,
  updatedAt: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
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


updateSchema.pre('save', function(next){
  console.log("pre hook on update");
  let currentDate = new Date();

  this.updatedAt = currentDate;

  if(this.isNew){
    this.createdAt = currentDate;
  }

  next();
});

updateSchema.post('save', function(doc){
  console.log("post hook on update");
});

export default updateSchema;
