import User from '../models/user/model';
import {awardBadge, createUpdate, createDavAccount,createUser, followUser} from '../lib/utils';

export const login = (req, res) => {
  res.send("logged in");
};

export const signup = (req, res) => {

  saveUser(req, res);

};

export const logout = (req, res) => {
  req.logout();
};

const saveUser = async (req, res) => {

  let account = await createDavAccount();
  console.log("dav account created");

  let newuser = await createUser(account, req);
  console.log("user created");

  await createUpdate(newuser,{
    description: `${user.name} has joined DAV`
  });
  console.log("update created");

  let cutoff = new Date("2017-12-31");
  if(newuser.createdAt<=cutoff){
    console.log("he is a founder");
    await awardBadge(newuser,"founder");
    console.log("founder badge added");
  }

  let updatedUser = await followUser(newuser, {uid:"0xf2a0b28a62aebd3b7e17592b920cf7ec10470d02"});
  //let updatedUser = await User.findById(newuser._id).exec();
  console.log("started following main account");
  res.json(updatedUser);

};

//"0xa725aa4a54328940f503d082194d7aca67ac4341"
