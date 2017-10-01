import Person from '../models/person/model';
import Badge from '../models/badge/model';
import DavAccount from '../models/davAccount/model';
import Update from '../models/update/model';

export const single = async (req, res) => {

  if(req.isAuthenticated()){
    console.log("Authenticated");
    return res.json(req.user);
  }

  return res.status(403).send("Access Denied");


  // let person = await Person.findById(req.params.userId).exec();

  // res.json(person);

};

export const badges = async (req, res) => {

  if(req.isAuthenticated()){

    let badgeIds = req.user.badges.map((b) => {
      return b.badge;
    });

    let bs = await Badge.find({_id:{$in:badgeIds}}).exec();

    let badgesById = {};

    bs.map((badge) => {
      badgesById[badge._id] = badge;
    });

    console.log(badgesById);

    return res.json({
      badgeIds:badgeIds,
      badgesById:badgesById
    });
  }

  return res.status(403).send("Access Denied");
};

export const updates = async (req, res) => {

  // if(req.isAuthenticated()){



  // }
  // return res.status(403).send("Access Denied");

  let mainAccount = await DavAccount.findById(req.user.account.id).exec();

  let updates = await Update.find({}).exec();
  console.log(mainAccount);
  console.log(updates);

  res.send("ya");
};
