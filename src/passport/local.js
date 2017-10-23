import passportLocal from 'passport-local';
import Person from '../models/person/model';

const LocalStrategy = passportLocal.Strategy;

export default function(passport){
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async(req, email, password, done) => {
    console.log("begin auth");
    let person = await Person.findOne({email: email}).exec();
    console.log("finding person");
    if(!person) return done(null, false);
    console.log("found person");
    //console.log(person.comparePassword(password));
    console.log("comparing password");
    let correctPassword = await person.comparePassword(password);
    console.log("compared password");

    if(!correctPassword) return done(null, false);
    let clone = Object.assign({},person._doc);
    delete clone.password;
    return done(null, clone);
  }));
}

