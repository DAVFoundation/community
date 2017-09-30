import express from 'express';
import * as person from '../controllers/person';

const router = express.Router();

router.route('/user')
  .get(person.single);

export default router;
