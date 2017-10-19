const mongoose = require('mongoose');
import config from '../config';

module.exports.id = "drop-db";

module.exports.up = function (done) {
  this.log('Dropping DB');
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongo.url, { useMongoClient: true })
    .then(() => {
      mongoose.connection.db.dropDatabase();
      done();
    });
};

module.exports.down = function (done) {
  done();
};
