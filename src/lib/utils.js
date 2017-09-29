import randomstring from 'randomstring';
import config from '../config';
import DavAccount from '../models/davAccount/model';
import Update from '../models/update/model';
import Badge from '../models/badge/model';
import Person from '../models/person/model';


export const randomDavAddress = () => {
  console.log("Random DAV address generated");
  return '0x'+randomstring.generate({
    length: 40,
    charset: 'hex'
  });
};

export const createThing = async (obj, type) => {

  let account = await DavAccount.create({});

  let thingDetails = Object.assign({},obj);

  thingDetails.uid = account.uid;

  switch(type){
  case config.accountType.person:
    return Person.create(thingDetails);

  case config.accountType.station:
    return console.log("create a station");

  case config.accountType.vehicle:
    return console.log("create a vehicle");

  default:
    return console.log("not a valid type");
  }
};

export const awardBadge = async (person, badgeSlug) => {

  let badge = await Badge.findOne({slug:badgeSlug}).exec();

  await createUpdate(awardee,{
    description: `${owner.name} was awarded the ${badge.title} badge`
  });

  return Person.findByIdAndUpdate(person._id, {$push:{badges:badge._id}}, {new:true}).exec();

};

export const createUpdate = async (person, update) => {

  let account = await DavAccount.findOne({uid:person.uid}).exec();
  let updateDetails = Object.assign({},update);
  updateDetails.davAccount = account._id;
  console.log(`${update.description}`);
  return Update.create(updateDetails);
};

export const followPerson = async (person, followee) => {

  let followeePerson = await Person.findOne({uid:followee.uid}).exec();

  await createUpdate(person,{
    description: `${person.name} started following ${followeePerson.name}`
  });

  console.log("following dav account");
  return Person.findByIdAndUpdate(person._id, {$push:{following:followeePerson._id}}, {new:true}).exec();

};

export const createMainDavAccount = async () => {

  let person = {
    name:config.dav.name,
    email:config.dav.email,
    password:config.dav.password
  };

  let existingPerson = await Person.findOne({email: person.email}).exec();

  if(existingPerson){
    console.log("Main account already exists");
    return;
  }

  console.log("Creating main account");
  let mainAccount = await createThing(person, config.accountType.person);
  console.log("Created main account");

  await createUpdate(mainAccount, {
    description: `${mainAccount.name} has joined DAV`
  });

  if(person.createdAt <= config.cutoffDate){
    await awardBadge(mainAccount, "founder");
  }

  console.log("Returning new main account");
  return mainAccount;
};
