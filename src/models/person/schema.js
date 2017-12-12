import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import timestamp from 'mongoose-timestamp';

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type:String,
    required:true,
    trim:true
  },
  account: {
    uid:{
      type:String,
      unique:true
    },
    id:{
      type:Schema.Types.ObjectId,
      ref:'DavAccount'
    }
  },
  avatar: {
    type:String,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  subscribed: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required:true
  },
  badges:[{
    badge:{
      type: Schema.Types.ObjectId,
      ref: 'Badge'
    },
    awardedOn:{
      type: Date
    }
  }],
  roof: {
    type: Boolean,
    default: false
  },
  hasStation:{
    backyard: {
      type: Boolean,
      default: false
    },
    roof: {
      type: Boolean,
      default: false
    },
    driveway: {
      type: Boolean,
      default: false
    },
    mailbox: {
      type: Boolean,
      default: false
    }
  },
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  resetPasswordToken:{
    type:String
  },
  resetPasswordExpires:{
    type:Date
  },
  permissions: {
    canAccessAdmin:{
      type:Boolean,
      default:false
    },
    canPostDavUpdates:{
      type:Boolean,
      default:false
    },
    canDeleteDavUpdates:{
      type:Boolean,
      default:false
    },
    canGrantPermissions: {
      type: Boolean,
      default: false
    }
  }
});

personSchema.plugin(timestamp);

personSchema.virtual('stations', {
  ref: 'Station',
  localField: '_id',
  foreignField: 'person'
});

personSchema.pre('save', function(next){
  //const saltRounds = 10;
  console.log("Pre save person hook");
  this.wasNew = this.isNew;

  //next();
  if(this.isModified('password') || this.isNew){
    bcrypt.genSalt(5, (err,salt) => {
      if(err) return next(err);
      bcrypt.hash(this.password, salt, null, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    return next();
  }

});

personSchema.methods.comparePassword = function(passw){
  return new Promise((resolve, reject) => {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
      if(err) return reject(err);
      console.log("passwords match");
      resolve(isMatch);
    });
  });
};


export default personSchema;
