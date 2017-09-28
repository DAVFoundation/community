import randomstring from 'randomstring';

export function randomDavAddress(){
  return '0x'+randomstring.generate({
    length: 40,
    charset: 'hex'
  });
}

export function awardBadge(user, badgeSlug){
  console.log(`${user.name} is awarded ${badgeSlug} badge`);
}

export function createUpdate(user, update){
  console.log(`${user.name} has a new update: ${update.description}`);
}
