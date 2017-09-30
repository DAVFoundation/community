import express from 'express';
import * as auth from '../controllers/auth';

const router = express.Router();

export default function(passport){

  router.route('/login')
    .post((req, res, next) => {
      passport.authenticate('local-login', (err, user, info) => {
        if(err) return next(err);

        if(!user) return res.send("no user exists");

        req.login(user, function(err){
          return res.json(user);
        });

      })(req, res, next);
    });

  router.route('/signup')
    .post(auth.signup);

  router.route('/logout')
    .get(auth.logout);

  return router;
}
