import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type:String,
    required:true,
    trim:true
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
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

userSchema.pre('save', (next) => {
  const saltRounds = 10
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
