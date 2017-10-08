import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  owner:{
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
    readable:{
      type:String
    },
    coords:{
      type: Array
    }
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
