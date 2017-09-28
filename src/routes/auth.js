import express from 'express';
import * as auth from '../controllers/auth';

const router = express.Router();

router.route('/login')
  .get(auth.login);

router.route('/signup')
  .get(auth.signup);

export default router;
