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

  let stationType = req.body.type;
  console.log("STATION TYPE", stationType);

  // let newuser = await Person.findByIdAndUpdate(req.user._id, {$set: {'hasStation.haha':true}}, {new: true}).exec(function(err,doc){
  //   console.log("SAVED NEW PERSON STATION");
  //   console.log(doc);
  // });

  var newuser = null;
  console.log("before station save");

  await Person.findById(req.user._id, function(err, doc){
    doc.hasStation[stationType] = true;
    doc.save(function(err, newdoc){
      console.log(newdoc);
      newuser = newdoc;
    });
  });
  console.log("after station save");
  console.log(newuser);

  if(user.stations.length == 1){
    await awardBadge(req.user, "station-master");
  }

  res.json({"success":true});
};
