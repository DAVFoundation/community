import config from '../config';
import Station from '../models/station/model';
import {awardBadge, createUpdate, createThing} from '../lib/utils';

export const test = async(req, res, next) => {
  return res.json({"what":"tf"});
};

export const create = async (req, res) => {
  console.log("CREATE STATIon");
  if(!req.isAuthenticated()){
    return res.status(403).send("Access Denied");
  }

  let stationDetails = Object.assign({},req.body, {
    person: req.user._id
  });

  let station = await createThing(stationDetails, config.accountType.station);

  await createUpdate(req.user, {
    description: `${req.user.name} added a ${req.body.type} station`
  });
  //await awardBadge(req.user, "station");

  res.json({"success":true});
};
