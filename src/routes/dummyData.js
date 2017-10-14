import express from 'express';
import DummyData from '../models/dummyData/model';

const router = express.Router();

router.route('/dummy-data')
  .get(async (req, res) => {

    let dummyStations = await DummyData.find({}).select({"loc":1, "_id":0}).exec();

    let stationCoords = [];

    for(var station in dummyStations){
      stationCoords.push(dummyStations[station].loc);
    }

    res.json({points: stationCoords});

  });

export default router;
