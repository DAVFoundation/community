import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import timestamp from 'mongoose-timestamp';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type:String,
    required:true,
    trim:true
  },
  uid: {
    type:String,
    unique: true
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
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

userSchema.plugin(timestamp);

userSchema.virtual('stations', {
  ref: 'Station',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.pre('save', function(next){
  //const saltRounds = 10;
  console.log("Pre save user hook");
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

userSchema.methods.comparePassword = (passw, cb) => {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};

export default userSchema;
