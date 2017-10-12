import config from '../config';
import Station from '../models/station/model';
import {awardBadge, createUpdate, createThing, followPerson} from '../lib/utils';

export const create = async (req, res) => {

  if(!req.isAuthenticated()){
    return res.status(403).send("Access Denied");
  }

  let stationDetails = req.body.formData;

  stationDetails.person = req.user._id;

  let station = await createThing(status, config.accountType.station);
  console.log("created base station");
  console.log(station);
  await createUpdate(req.user, {
    description: `${req.user.name} added a ${req.body.formData.type} station`
  });
  console.log("created station update");
  await awardBadge(req.user, "station-owner");
  console.log("station is fully created");

  res.json({"success":true});
}
