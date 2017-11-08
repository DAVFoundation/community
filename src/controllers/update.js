import Update from '../models/update/model';

export const create = async (req, res) => {

  let account = await DavAccount.findById(req.user.account.id).exec();

  let updateDetails = Object.assign({}. req.body, {
    davAccount: req.user.account.id,
    name: req.user.name,
    avatar: req.user.avatar
  });

  let newUpdate = await Update.create(updateDetails);

  return res.json(newUpdate);
};
