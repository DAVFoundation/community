import { createBadge } from '../lib/utils';

exports.up = async (db, next) => {

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
