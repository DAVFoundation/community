export function randomDavAddress(){
  return '0x'+randomString.generate({
    length: 40,
    charset: 'hex'
  });
};
