import config from '../config';
import Station from '../models/station/model';
import Person from '../models/person/model';
import {awardBadge, createUpdate, createThing} from '../lib/utils';
import md5 from 'md5';
import fetch from 'node-fetch';


export const create = async (req, res) => {
  if(!req.isAuthenticated()){
    return res.status(403).send("Access Denied");
  }

  if(!req.body.lat || !req.body.lng){
    return res.status(500).send("Could not find the address");
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
    description: `${req.user.name} added a ${req.body.type} station.`
  });

  let key = req.body.type;
  let dynSet = {$set: {}};
  dynSet.$set["hasStation."+key] = true;

  if(req.user.subscribed && process.env.NODE_ENV == 'production'){
    updateMailchimp(req.user.email, req.body.type);
  }

  let user = await Person.findByIdAndUpdate(req.user._id, dynSet, {new: true}).populate('stations').exec();

  if(user.stations.length == 1){
    await awardBadge(req.user, "station-master");
  }

  res.json(user);
};

export const updateMailchimp = (email, stationType) => {

  const instance = config.mailchimp.instance;
  const apiKey = config.mailchimp.apiKey;
  const listId = config.mailchimp.listId;
  const hashedEmail = md5(email.toLowerCase());
  const station = "station_"+stationType;
  const url = `https://${instance}.api.mailchimp.com/3.0/lists/${listId}/members/${hashedEmail}`;
  console.log("UPDATE MAILCHIMP");

  const fetchInit = {
    method: 'PATCH',
    headers: {
      'Authorization':'Basic ' + new Buffer('any:'+apiKey).toString('base64'),
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      'merge_fields': {
        "STATION":station
      }
    })
  };

  fetch(url, fetchInit)
    .then(resp=>{
      if(resp.ok){
        console.log("added station to user mailchimp");
      } else {
        console.log("error adding user to mailchimp");
      }
    });
};
