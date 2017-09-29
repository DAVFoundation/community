import Person from '../models/person/model';

export default init = (passport) => {

  passport.serializeUser((person, done) => {
    done(null, person._id);
  });

  passport.deserializeUser((id,done) => {
    Person.findById(id, done);
  });

  // load strategies
}
