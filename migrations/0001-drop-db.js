import mongoose from 'mongoose';

exports.up = (db, next) => {
  this.log('Dropping DB');
  mongoose.connection.db.dropDatabase();
  next();
};

exports.down = function(db, next){
  next();
};
