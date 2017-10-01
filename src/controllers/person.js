import Person from '../models/person/model';
import Badge from '../models/badge/model';
import mongoose from 'mongoose';

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

  if(req.isAuthenticated()){
    console.log("yes");
  }
  return res.status(403).send("Access Denied");
};
