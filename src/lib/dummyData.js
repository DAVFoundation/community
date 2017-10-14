// This script is only to be used for staging and testing purposes
// It generates dummy stations to populate the map
import random from 'geojson-random';
import DummyData from '../models/dummyData/model';

export const generateRandomStations = (count) => {

  const boundingBoxes = [
    {
      country: "usa",
      count: 3193,
      bbox: [-122.3,31.1,-72.1,49.6],
    },
    {
      country: "mexico",
      count: 1006,
      bbox: [-109.5,16.1,-94.0,33.3],
    },
    {
      country: "canada",
      count: 2508,
      bbox: [-128.3,50.7,-93.2,67.6],
    },
    {
      country: "southamerica",
      count: 1924,
      bbox: [-76.8,-19.6,-39.2,0.4],
    },
    {
      country: "southamericalower",
      count: 893,
      bbox: [-69.7,-37.7,-53.4,-20.3],
    },
    {
      country: "europe",
      count: 3432,
      bbox: [1.1,43.1,29.2,53.1],
    },
    {
      country: "europeupper",
      count: 984,
      bbox: [5.0,57.9,30.9,70.6],
    },
    {
      country: "africa",
      count: 2303,
      bbox: [-14.8,7.4,35.5,34.0],
    },
    {
      country: "africalower",
      count: 1235,
      bbox: [13.9,-22.6,36.2,5.6],
    },
    {
      country: "asia",
      count: 6928,
      bbox: [56.3,35.5,137.1,71.2],
    },
    {
      country: "india",
      count: 930,
      bbox: [71.4,12.9,87.2,34.0],
    },
    {
      country: "australia",
      count: 2034,
      bbox: [114.8,-35.7,150.8,-14.9],
    },
    {
      country: "japan",
      count: 647,
      bbox: [135.59,33.62,142.85,40.07],
    },
    {
      country: "uk",
      count: 506,
      bbox: [-6.13,50.45,1.46,57.29]
    }
  ];

  let allPoints = [];

  for(var region in boundingBoxes){
    let points = random.point(1, region.bbox);

    for(var index in points.features){
      let obj = {"loc":points.features[index].geometry}
      allPoints.push(obj); // contains geojson point obj which can be saved in mongoose
    }
  }
  console.log(allPoints);
  console.log(allPoints.length);

  DummyData.insertMany(allPoints)
    .then(docs => {
      console.log(docs);
    })
    .catch(err => {
      console.log(err);
    });
};
