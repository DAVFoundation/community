import express from 'express';
import * as auth from '../controllers/auth';

const router = express.Router();

export default function(passport){

  router.route('/login')
    .post((req, res, next) => {

      passport.authenticate('local-login', (err, user, info) => {
        if(err) {
          console.log("LOGIN ERROR");
          console.log(err);
          return next(err);
        }

        if(!user) {
          res.status(401);
          res.statusMessage = "Nothing";
          return res.send({message:'The email or password is incorrect'});
        }

        req.login(user, function(err){
          //return res.json(user);
          //res.cookie("user", user._id);
          res.json(user);
        });

      })(req, res, next);
    });

  router.route('/signup')
    .post(auth.signup);

  router.route('/logout')
    .get(auth.logout);

  router.route('/forgot')
    .post(auth.reset);

  router.route('/reset/:token')
    .post(auth.resetToken)

  // router.route('/verify')
  //   .post(auth.verify);

  return router;
}
