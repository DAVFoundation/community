import express from 'express';
import * as auth from '../controllers/auth';

const router = express.Router();

router.route('/login')
  .get(auth.login);

router.route('/signup')
  .post(auth.signup);

router.route('/logout')
  .get(auth.logout);

export default router;
