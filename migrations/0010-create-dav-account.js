import config from '../config';
import Person from '../models/person/model';
import {createThing, awardBadge} from '../lib/utils';

exports.up = async (db, next) => {
  let person = {
    name:config.dav.name,
    email:config.dav.email,
    password:config.dav.password
  };

  let existingPerson = await Person.findOne({email: person.email}).exec();

  if(existingPerson){
    this.log("Main account already exists");
    return;
  }

  this.log("Creating main account");
  await createThing(person, config.accountType.person, true);
  this.log("Created main account");

  next();
};

exports.down = function(db, next){
  next();
};
