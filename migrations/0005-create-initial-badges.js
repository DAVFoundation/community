import { createBadge } from '../lib/utils';

exports.up = async (db, next) => {

  this.log('Creating initial badges');
  await createBadge({
    title: "Founding Member"
  });

  await createBadge({
    title: "Station Master"
  });

  next();
};

exports.down = (db, next) => {
  next();
};
