import Update from '../../models/update/model';
import DavAccount from '../../models/davAccount/model';
import Person from '../../models/person/model';
import config from '../../config';

export const list = async (req, res) => {
  let person = await Person.findOne({email:config.dav.email}).exec();

  let updates = await Update.find({davAccount: person.account.id}).sort('-createdAt').exec();

  return res.json({
    updates: updates
  });

};

export const create = async (req, res) => {

  let person = await Person.findOne({email:config.dav.email}).exec();

  let account = await DavAccount.findById(person.account.id).exec();

  let updateDetails = Object.assign({}, req.body, {
    davAccount: person.account.id,
    name: person.name,
    avatar: person.avatar
  });

  let newUpdate = await Update.create(updateDetails);

  return res.json(newUpdate);
};

export const edit = async(req, res) => {

  let dynSet = {$set: {}};
  for(var prop in req.body){
    dynSet.$set[prop] = req.body[prop];
  }

  let editedUpdate = Update.findByIdAndUpdate(req.params.id, dynSet, {new:true}).exec();

  res.json(editedUpdate);

};

export const remove = async (req, res) => {

  await Update.findByIdAndRemove(req.params.id).exec();

  return res.json({"success":true});
};
