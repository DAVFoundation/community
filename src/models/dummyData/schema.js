import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dummyDataSchema = new Schema({
  loc: {
    type: {type:String,default:'Point'},
    coordinates: [Number]
  }
});

export default dummyDataSchema;
