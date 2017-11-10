import express from 'express';
import * as update from '../../controllers/admin/update';
import * as restrict from '../../passport/restrict';

const router = express.Router();

router.route('/update/add')
  .post(restrict.canAccessAdmin, restrict.canPostDavUpdates, update.create);

router.route('/update/edit/:id')
  .put(restrict.canAccessAdmin, restrict.canPostDavUpdates, update.edit);

router.route('/update/delete/:id')
  .delete(restrict.canAccessAdmin, restrict.canDeleteDavUpdates, update.remove);

export default router;
