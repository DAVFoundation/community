import express from 'express';
import * as station from '../controllers/station';

const router = express.Router();

router.route('/station')
  .post(station.create);

export default router;
