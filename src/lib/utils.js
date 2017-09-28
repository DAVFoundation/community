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
  console.log(`${user.name} is awarded ${badgeSlug} badge`);

  let badge = await Badge.findOne({slug:badgeSlug}).exec();

  let owner = await User.findOneAndUpdate({id:user._id}, {$push:{badges:badge._id}}).exec();

  createUpdate(owner,{
    description: `${owner.name} was awarded the ${badge.title} badge`
  });
  // add badge to user
  // add update about badge add to user
};

export const createUpdate = async (user, update) => {

  let account = await DavAccount.findOne({uid:user.uid});

  let updateDetails = Object.assign({},update);
  updateDetails.davAccount = account._id;
  console.log(`${user.name} has a new update: ${update.description}`);
  return await Update.create(updateDetails);
  // uses user.uid to find davaccount with same uid and adds that to itself
};

export const createDavAccount = async (owner) => {

  let account = {
    uid: owner.uid
  };
  console.log("creating linked Dav Account");
  return await DavAccount.create(account);
};

export const followUser = async (user, followee) => {

  let followeeUser = await User.findOne({uid:followee.uid}).exec();
  console.log("following dav account");
  return await User.findByIdAndUpdate(user._id, {$push:{following:followeeUser._id}}).exec();

};
