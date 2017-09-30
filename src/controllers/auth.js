import config from '../config';
import Person from '../models/person/model';
import {awardBadge, createUpdate, createThing, followPerson} from '../lib/utils';


export const signup = async (req, res, next) => {

  let existingPerson = await Person.findOne({email: req.body.email}).exec();

  if(existingPerson){
    console.log("already exists");
    return res.send("person already exists");
  }

  console.log("new person signing up");

  let person = await createThing({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, config.accountType.person);

  req.login(person, function(err){
    console.log("logged in new user");
  });

  await createUpdate(person, {
    description: `${person.name} has joined DAV`
  });

  if(person.createdAt <= config.cutoffDate){
    await awardBadge(person, "founder");
  }

  let mainDav = await Person.findOne({email: config.dav.email}).exec();

  let updatedPerson = await followPerson(person, {uid:mainDav.uid});

  console.log("person is fully created");
  console.log("sending response now");
  res.json(updatedPerson);

};

export const logout = (req, res) => {
  req.logout();
};

