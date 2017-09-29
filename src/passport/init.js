import User from '../models/user/model';

export default init = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id,done) => {
    User.findById(id, done);
  });

  // load strategies
}
