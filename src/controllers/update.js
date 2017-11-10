import Update from '../models/update/model';
import DavAccount from '../models/davAccount/model';
import Person from '../models/person/model';
import config from '../config';

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
