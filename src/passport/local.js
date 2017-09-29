import passportLocal from 'passport-local';
import bcrypt from 'bcrypt-nodejs';
import User from '../models/user/model';

const LocalStrategy = passportLocal.Strategy;

export default login = (passport) => {

  passport.use('local-login', new LocalStrategy({
  }))
};
