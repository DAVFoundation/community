import config from '../config';
import Badge from '../models/badge/model';
import Person from '../models/person/model';
import {createThing, awardBadge} from '../lib/utils';


export const initialSetup = async () => {
  let f = await createBadge({
    title: "Founding Member"
  });

  await createBadge({
    title: "Station Master"
  });

  await createMainDavAccount();
};

export const createBadge = async (obj) => {
  let badge = await Badge.findOne({title: obj.title}).exec();
  if(badge){
    console.log("Badge already exists");
    return;
  }
  console.log("creating new badge");
  let badgeDetails = Object.assign({}, obj);
  return Badge.create(badgeDetails);
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
  let mainAccount = await createThing(person, config.accountType.person, true);
  console.log("Created main account");

  if(person.createdAt <= config.cutoffDate){
    await awardBadge(mainAccount, "founding-member");
  }

  console.log("Returning new main account");
  return mainAccount;
};
