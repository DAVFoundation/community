import config from '../config';
import Person from '../models/person/model';
import {awardBadge, createUpdate, createThing, followPerson} from '../lib/utils';
import fetch from 'node-fetch';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(config.sendgrid.apiKey);

export const signup = async (req, res, next) => {

  let existingPerson = await Person.findOne({email: req.body.email}).exec();

  if(existingPerson){
    res.status(401);
    res.statusMessage = "Nothing";
    return res.send({message: 'User already exists', error: 'user_exists'});
  }

  if(!req.body.password || !req.body.name || !req.body.email){
    res.status(401);
    res.statusMessage = "Nothing";
    return res.send({message: 'Please fill in all the fields', error: 'required_fields_missing'});
  }

  if(req.body.password.length < 8){
    res.status(401);
    res.statusMessage = "Nothing";
    return res.send({message: 'Password must be at least 8 characters', error: 'short_pass'});
  }


  let person = await createThing({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, config.accountType.person);

  req.login(person, function(err){
    console.log("logged in new user");
  });

  if(req.body.subscribe && process.env.NODE_ENV == 'production'){
    console.log("subscribe to list");
    subscribe(req.body.name, req.body.email);
  }

  await createUpdate(person, {
    description: `${person.name} has joined DAV.`
  });

  if(person.createdAt <= config.cutoffDate){
    await awardBadge(person, "founding-member");
  }

  let mainDav = await Person.findOne({email: config.dav.email}).exec();

  let updatedPerson = await followPerson(person, mainDav.account.uid, false);

  res.json(updatedPerson);

};

function genCrypto(){
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buf) => {
      if(err){
        reject(err);
      }
      resolve(buf.toString('hex'));
    });
  });
}

export const register = async(req, res, next) => {

  let existingPerson = await Person.findOne({email: req.body.email}).exec();

  if(existingPerson){
    res.status(401);
    res.statusMessage = "Nothing";
    return res.send({message: 'You have already subscribed!', error: 'user_exists'});
  }

  let tempPassword = await genCrypto();

  let person = await createThing({
    email: req.body.email,
    password: tempPassword
  }, config.accountType.person);

  if(req.body.subscribe && process.env.NODE_ENV == 'production'){
    subscribe("Subscriber", req.body.email);
  }

  if(person.createdAt <= config.cutoffDate){
    await awardBadge(person, "founding-member");
  }

  res.status(200)
  return res.send({message:"Thanks! You've been added", error: null});

};

function sendMail(mailer, options){
  return new Promise((resolve, reject)=> {
    mailer.sendMail(options, (err) => {
      if(err){
        reject(err);
      }
      resolve('done');
    });
  });
}

export const reset = async(req, res, next) => {

  let token = await genCrypto();

  let user = await Person.findOne({email: req.body.email}).exec();

  if(!user){
    res.status(401);
    res.statusMessage = "Access Denied";
    return res.send({message: 'No account with this email', error: 'no_account'});
  }
  let expiryDate = Date.now() + 43200000; // 12 hour expiry

  let updatedUser = await Person.findOneAndUpdate({email:req.body.email}, {$set:{resetPasswordToken:token, resetPasswordExpires: expiryDate}}).exec();

  //let mailer = nodemailer.createTransport(sgTransport(config.sendgrid))
  let msg = {
    to: user.email,
    from: 'passwordreset@dav.network',
    subject: 'DAV - Reset your Password',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your DAV community account.
           Please click on the following link, or paste this into your browser to complete the process:
           https://my.dav.network/?token=${token}#verify

           If you did not request this, please ignore this email and your password will remain unchanged.`
  };

  if(config.sendgrid.apiKey != ""){
    console.log("Send mail");
    sgMail.send(msg);
  }

  res.status(200);
  return res.send({message: "An email has been sent to you", error: null});

};

export const resetToken = async (req, res) => {

  if(req.body.password != req.body.passwordCopy){
    res.status(401);
    res.statusMessage = "Nothing";
    return res.send({message: "Passwords don't match", error: 'password_matching'});
  }

  if(!req.body.password || !req.body.passwordCopy){
    res.status(401);
    res.statusMessage = "Nothing";
    return res.send({message: 'Please enter the password twice', error: 'password_fields_missing'});
  }

  if(req.body.password.length < 8){
    res.status(401);
    res.statusMessage = "Nothing";
    return res.send({message: 'Password must be at least 8 characters', error: 'short_pass'});
  }

  let user = await Person.findOne({resetPasswordToken: req.params.token,
    resetPasswordExpires: {$gt: Date.now()}}).exec();

  if(!user){
    res.status(401);
    res.statusMessage = "Access Denied";
    return res.send({message: 'The reset link has expired. Please request another password.', error: 'reset_expire'});
  }

  let updatedUser = await Person.findByIdAndUpdate(user._id, {$set:{password: req.body.password, resetPasswordToken:undefined, resetPasswordExpires:undefined}}).exec();

  let msg = {
    to: user.email,
    from: 'passwordreset@dav.network',
    subject: 'DAV - Password Reset Successful',
    text: `This is to confirm that the password for your DAV community account with email ${updatedUser.email} has been changed`
  };

  if(config.sendgrid.apiKey != ""){
    sgMail.send(msg);
  }

  res.status(200);
  return res.send({message: "Success! You will be redirected to the login page automatically.", error: null});
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
      'merge_fields':{
        'NAME':name
      }
    })
  };

  fetch(url, fetchInit)
    .then(resp=>{
      console.log("RESPONSE FROM MAILCHIMP");
      console.log(resp.status);
      if(resp.ok){
        console.log("user subscribed to mailchimp list");
        Person.findOneAndUpdate({email:email}, {$set:{subscribed:true}}).exec();
      }
    });
};

export const logout = (req, res) => {
  req.logout();
  res.json({
    success: true
  });
};

