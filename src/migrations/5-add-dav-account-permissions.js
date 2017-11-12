import Person from '../models/person/model';
import config from '../config';

module.exports.id = "add-dav-account-permissions";

module.exports.up = async function (done) {
  let person = Person.findOne({email: config.dav.email}).exec();

  if(person){
    let dynSet = {$set: {}};
    dynSet.$set["permissions.canGrantPermissions"] = true;
    dynSet.$set["permissions.canAccessAdmin"] = true;
    dynSet.$set["permissions.canPostDavUpdates"] = true;
    dynSet.$set["permissions.canDeleteDavUpdates"] = true;

    let updatedPerson = await Person.findByIdAndUpdate(person._id, dynSet, {new:true}).exec();
  }

  done();
};

module.exports.down = function(done){
  done();
};
