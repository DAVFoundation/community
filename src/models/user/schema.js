import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import timestamp from 'mongoose-timestamp';
import {randomDavAddress} from '../../lib/utils';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type:String,
    required:true,
    trim:true
  },
  uid: {
    type:String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
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
  stations:[{
    type: Schema.Types.ObjectId,
    ref: 'Station'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

UserSchema.plugin(timestamp);

userSchema.pre('save', (next) => {
  const saltRounds = 10

  if(!this.isNew){
    this.uid = randomDavAddress();
  }

  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if(err) return next(err);
    this.password = hash;
    next();
  })
})

userSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if(err) return cb(err);
    cb(null, isMatch);
  })
}

export default userSchema;
