import { createBadge } from '../lib/utils';

module.exports.id = "create-initial-badges";

module.exports.up = async function (done) {
  this.log('Creating initial badges');

  await createBadge({
    title: "Founding Member"
  });

  await createBadge({
    title: "Station Master"
  });

  done();
};

module.exports.down = function (done) {
  done();
};
