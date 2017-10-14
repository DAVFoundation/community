import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  person:{
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
  account: {
    uid:{
      type: String,
      unique: true
    },
    id:{
      type:Schema.Types.ObjectId,
      ref:'DavAccount'
    }
  },
  type: {
    type: String
  },
  address: {
    type: String
  },
  loc: {
    type: {type:String,default:'Point'},
    coordinates: [Number]
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  residenceType : {
    type: String
  },
  electricalOutlet: {
    type: String
  },
  pedestrianAccess:{
    type: Boolean,
    default: false
  },
  drivewayAccess: {
    type: Boolean,
    default: false
  }
});

stationSchema.plugin(timestamp);

export default stationSchema;
