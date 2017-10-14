import config from '../config';
import Station from '../models/station/model';
import Person from '../models/person/model';
import {awardBadge, createUpdate, createThing} from '../lib/utils';


export const create = async (req, res) => {
  if(!req.isAuthenticated()){
    return res.status(403).send("Access Denied");
  }

  let coordinates = [];
  coordinates.push(req.body.lat);
  coordinates.push(req.body.lng);

  let stationDetails = Object.assign({},req.body, {
    person: req.user._id,
    loc:{
      type: "Point",
      coordinates: coordinates
    }
  });

  let station = await createThing(stationDetails, config.accountType.station);

  await createUpdate(req.user, {
    description: `${req.user.name} added a ${req.body.type} station`
  });

  let user = await Person.findById(req.user._id).populate('stations').exec();

  if(user.stations.length == 1){
    await awardBadge(req.user, "station");
  }

  res.json({"success":true});
};
