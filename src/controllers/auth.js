import config from '../config';
import Person from '../models/person/model';
import {awardBadge, createUpdate, createThing, followPerson} from '../lib/utils';
import fetch from 'node-fetch';

export const signup = async (req, res, next) => {

  let existingPerson = await Person.findOne({email: req.body.email}).exec();

  if(existingPerson){
    return res.send("person already exists");
  }


  let person = await createThing({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, config.accountType.person);

  req.login(person, function(err){
    console.log("logged in new user");
  });

  if(req.body.subscribe){
    console.log("subscribe to list");
    subscribe(req.body.name, req.body.email);
    await createUpdate(person, {
      description: `${person.name} joined the DAV mailing list`
    });
  }

  await createUpdate(person, {
    description: `${person.name} has joined DAV`
  });

  if(person.createdAt <= config.cutoffDate){
    await awardBadge(person, "founder");
  }

  let mainDav = await Person.findOne({email: config.dav.email}).exec();

  let updatedPerson = await followPerson(person, mainDav.account.uid);

  res.json(updatedPerson);

};

export const subscribe = (name, email) => {
  const instance = config.mailchimp.instance;
  const apiKey = config.mailchimp.apiKey;
  const listId = config.mailchimp.listId;
  const url = `https://${instance}.api.mailchimp.com/3.0/lists/${listId}/members/`;
  const fetchInit = {
    method: 'POST',
    headers: {
      'Authorization':'Basic ' + new Buffer('any:'+apiKey).toString('base64'),
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      'email_address': email,
      'status':'subscribed',
      'FNAME': name
    })
  };

  fetch(url, fetchInit)
    .then(resp=>{
      console.log("RESPONSE FROM MAILCHIMP");
      console.log(resp.status);
      if(resp.ok){
        console.log("user subscribed to mailchimp list");
      }
    });
};

export const logout = (req, res) => {
  req.logout();
  res.json({
    success: true
  });
};

