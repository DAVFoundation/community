import randomstring from 'randomstring';
import DavAccount from '../models/davAccount/model';
import Update from '../models/update/model';
import Badge from '../models/badge/model';
import User from '../models/user/model';

export function randomDavAddress(){
  console.log("Random DAV address generated");
  return '0x'+randomstring.generate({
    length: 40,
    charset: 'hex'
  });
}

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

  return DavAccount.create(account);
};

export const createUser = (account, req) => {

  let user = {
    name: "Tennis",
    email: "a@7.com",
    password: "test",
    uid: account.uid
  };

  return User.create(user);
}

export const followUser = async (user, followee) => {

  let followeeUser = await User.findOne({uid:followee.uid}).exec();

  await createUpdate(user,{
    description: `${user.name} started following ${followeeUser.name}`
  });

  console.log("following dav account");
  return User.findByIdAndUpdate(user._id, {$push:{following:followeeUser._id}}, {new:true}).exec();

};
