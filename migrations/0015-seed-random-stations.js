import config from './config';
import {generateRandomStations} from './lib/dummyData';

exports.up = function(db, next){
  if(config.generateData){
    generateRandomStations();
  }
  next();
};

exports.down = function(db, next){
  next();
};
