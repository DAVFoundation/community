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


