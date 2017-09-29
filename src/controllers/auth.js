import User from '../models/user/model';
import {awardBadge, createUpdate, createDavAccount,createUser, followUser, savePerson} from '../lib/utils';

export const login = (req, res) => {
  res.send("logged in");
};

export const signup = async (req, res, next) => {

  let existingPerson = await User.findOne({email: req.body.email}).exec();

  if(existingPerson){
    console.log("already exists");
    return res.send("user already exists");
  }

  console.log("new user signing up");

  let newPerson = await savePerson(req.body);
  console.log("person is fully created");
  console.log("sending response now");
  res.json(newPerson);

};

export const logout = (req, res) => {
  req.logout();
};

