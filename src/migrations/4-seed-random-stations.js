const mongoose = require('mongoose');
import config from '../config';
import { generateRandomStations } from '../lib/dummyData';

module.exports.id = "seed-random-stations";

module.exports.up = function (done) {
  if(config.generateData){
    this.log('Generating random stations');
    generateRandomStations();
  }
  done();
};

module.exports.down = function (done) {
  done();
};
