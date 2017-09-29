import passportLocal from 'passport-local';
import bcrypt from 'bcrypt-nodejs';
import Person from '../models/person/model';

const LocalStrategy = passportLocal.Strategy;

export default login = (passport) => {

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passReqToCallback: true
  },
  async (req, email, password, done) => {

    let existingUser = await Person.findOne({email: email}).exec();

    if(!existingUser) return done(null, false);

    let correctPassword = await user.comparePassword(password);

    if(!correctPassword) return done(null, false);

    return done(null, user);

  });
  );
};
