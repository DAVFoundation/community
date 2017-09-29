import randomstring from 'randomstring';
import DavAccount from '../models/davAccount/model';
import Update from '../models/update/model';
import Badge from '../models/badge/model';
import User from '../models/user/model';

if(process.env.NODE_ENV !== 'production'){
  var config = require('../config/config.dev.js');
} else {
  var config = require('../config/config.js');
}

export const randomDavAddress = () => {
  console.log("Random DAV address generated");
  return '0x'+randomstring.generate({
    length: 40,
    charset: 'hex'
  });
};

export const savePerson = async (obj, isAdmin=false) => {

  let account = await createDavAccount();
  console.log(account);
  console.log("dav account created");

  let person = await createUser(account, obj);
  console.log("user created");

  await createUpdate(person,{
    description: `${person.name} has joined DAV`
  });
  console.log("update created");

  let cutoff = new Date("2017-12-31");
  if(person.createdAt<=cutoff){
    console.log("he is a founder");
    await awardBadge(person,"founder");
    console.log("founder badge added");
  }

  return followUser(person, {uid:globalDavUid}, isAdmin);
  //let updatedUser = await User.findById(newuser._id).exec();
  //console.log("started following main account");
  //res.json(updatedUser);

};

export const awardBadge = async (user, badgeSlug) => {

  let badge = await Badge.findOne({slug:badgeSlug}).exec();

  //console.log(badge);

  let owner = await User.findByIdAndUpdate(user._id, {$push:{badges:badge._id}}, {new:true}).exec();

  //console.log(owner);

  return createUpdate(owner,{
    description: `${owner.name} was awarded the ${badge.title} badge`
  });
  // add badge to user
  // add update about badge add to user
};

export const createUpdate = async (user, update) => {

  let account = await DavAccount.findOne({uid:user.uid}).exec();
  console.log(account);
  let updateDetails = Object.assign({},update);
  updateDetails.davAccount = account._id;
  console.log(`${update.description}`);
  return Update.create(updateDetails);
  // uses user.uid to find davaccount with same uid and adds that to itself
};

export const createDavAccount = () => {

  return DavAccount.create({});
};

export const createUser = (account, obj) => {

  let user = {
    name: obj.name,
    email: obj.email,
    password: obj.password,
    uid: account.uid
  };

  return User.create(user);
};

export const createMainDavAccount = async () => {
  let user = {
    name:config.dav.name,
    email:config.dav.email,
    password:config.dav.password
  };

  let existingUser = await User.findOne({email: user.email}).exec();

  if(existingUser){
    console.log("Main account already exists");
    globalDavUid = existingUser.uid;
    console.log(globalDavUid);
    return;
  }

  console.log("Creating main account");
  let newuser = await savePerson(user, true);
  console.log("Created main account");
  globalDavUid = newuser.uid;
  console.log(globalDavUid);

};

export const followUser = async (user, followee, isAdmin = false) => {

  if(!isAdmin){
    let followeeUser = await User.findOne({uid:followee.uid}).exec();

    await createUpdate(user,{
      description: `${user.name} started following ${followeeUser.name}`
    });

    console.log("following dav account");
    return User.findByIdAndUpdate(user._id, {$push:{following:followeeUser._id}}, {new:true}).exec();
  }

  return User.findById(user._id).exec();

};
