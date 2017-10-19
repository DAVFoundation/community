import mongoose from 'mongoose';

exports.up = (db, next) => {
  mongoose.connection.db.dropDatabase();
  next();
};

exports.down = function(db, next){
  next();
};
