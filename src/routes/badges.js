import express from 'express';
import * as badges from '../controllers/badges';

const router = express.Router();

router.route('/badges')
  .get(badges.list)
  .post(badges.create);

export default router;
