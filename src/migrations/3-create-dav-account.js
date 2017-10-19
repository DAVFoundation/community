import config from '../config';
import Person from '../models/person/model';
import { createThing } from '../lib/utils';

module.exports.id = "create-dav-account";

module.exports.up = async function (done) {
  let person = {
    name:config.dav.name,
    email:config.dav.email,
    password:config.dav.password
  };

  let existingPerson = await Person.findOne({email: person.email}).exec();

  if(existingPerson){
    this.log("Main account already exists");
  } else {
    this.log("Creating main account");
    await createThing(person, config.accountType.person, true);
    this.log("Created main account");
  }

  done();
};

module.exports.down = function (done) {
  done();
};
