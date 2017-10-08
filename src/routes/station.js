import express from 'express';
import * as station from '../controllers/station';

const router = express.Router();

export default function(){

  router.route('/station')
    .post(station.create);

  return router;
}
