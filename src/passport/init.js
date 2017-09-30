import Person from '../models/person/model';
import local from './local';

export default function(passport){

  passport.serializeUser((person, done) => {
    done(null, person._id);
  });

  passport.deserializeUser((id,done) => {
    Person.findById(id, function(err,user){
      done(err,user);
    });
  });

  // load strategies
  local(passport);

}
