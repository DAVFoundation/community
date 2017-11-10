import express from 'express';
import * as update from '../controllers/update';

const router = express.Router();

router.route('/update/add')
  .post(update.create);

router.route('/update/edit/:id')
  .put(update.edit);

router.route('/update/delete/:id')
  .delete(update.remove);

export default router;
