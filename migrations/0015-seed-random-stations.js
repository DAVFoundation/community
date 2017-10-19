import config from '../src/config';
import {generateRandomStations} from '../src/lib/dummyData';

exports.up = function(db, next){
  if(config.generateData){
    this.log('Generating random stations');
    generateRandomStations();
  }
  next();
};

exports.down = function(db, next){
  next();
};
