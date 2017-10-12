import Person from '../models/person/model';
import Badge from '../models/badge/model';
import DavAccount from '../models/davAccount/model';
import Update from '../models/update/model';

export const single = async (req, res) => {

  if(req.isAuthenticated()){
    return res.json(req.user);
  }

  return res.status(403).send("Access Denied");

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

    return res.json({
      badgeIds:badgeIds,
      badgesById:badgesById
    });
  }

  return res.status(403).send("Access Denied");
};

export const updates = async (req, res) => {

  if(req.isAuthenticated()){
    let ownUpdates = await Update.find({davAccount:req.user.account.id}).exec();

    let followeesUpdates = await Update.find({davAccount:{$in:req.user.following}}).exec();

    let allUpdates = [...ownUpdates,...followeesUpdates];

    allUpdates.sort((a,b) => {
      if(a.createdAt < b.createdAt){
        return 1;
      }
      if(a.createdAt > b.createdAt){
        return -1;
      }
      return 0;
    });

    let updateIds = allUpdates.map(obj => {
      return obj._id;
    });

    let updatesById = {};

    allUpdates.map(obj => {
      updatesById[obj._id] = obj;
    });

    return res.json({
      updateIds:updateIds,
      updatesById:updatesById
    });
  }

  return res.status(403).send("Access Denied");

};

