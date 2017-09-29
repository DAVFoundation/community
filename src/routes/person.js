import express from 'express';
import * as person from '../controllers/person';

const router = express.Router();

router.route('/user/:userId')
  .get(person.single)

export default router;
