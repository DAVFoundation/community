import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';
import slugify from 'mongoose-url-slugs';

const Schema = mongoose.Schema;

const badgeSchema = new Schema({
  title:{
    type:String,
    required: true,
    trim:true
  },
  image:{
    type: String,
    required:true,
    trim:true
  }
})

badgeSchema.plugin(slugify('title'));
badgeSchema.plugin(timestamp);

export default badgeSchema;
