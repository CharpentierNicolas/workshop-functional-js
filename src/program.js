let chalk = require('chalk');
var _ = require("lodash");

let checkpointsService = require('./staticCheckpoints');


let calculateDistanceWithRssi = rssi => {
  var txPower = -59; // hard coded power value. Usually ranges between -59 to -65
  if (rssi == 0) {
    return -1.0;
  }
  var ratio = rssi * 1.0 / txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  } else {
    var distance = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
    return distance;
  }
};

let transformCheckpoint = (checkpoint) => {
  if (checkpoint) {
    // Get back essential properties
    var checkp = Object.assign({}, checkpoint);
    checkp.serviceData = checkpoint.advertisement.serviceData;
    checkp.serviceUuids = checkpoint.advertisement.serviceUuids;
    // Transform data about distance
    checkp.distance = calculateDistanceWithRssi(checkpoint.rssi);
    // Clean uninteresting properties
    delete checkp.id;
    delete checkp.address;
    delete checkp.addressType;
    delete checkp.advertisement;
    delete checkp.rssi;
    delete checkp.services;
    // Everything is ok
    return true;
  } else {
    return false;
  }
};

let showCheckpoint = (checkpoint, index) => {
  console.log(chalk.green('CHECKPOINT'), chalk.yellow(index + 1));
  _.forIn(checkpoint, function(value, property) {
      if (checkpoint.hasOwnProperty(property)) {
      console.log(chalk.cyan(property.toUpperCase()), checkpoint[property]);
  }
});

  console.log('\n');
};

let run = () => {
  let checkpoints = checkpointsService.getCheckpoints();


  checkpoints.forEach(function(checkpoint, index) {
    transformCheckpoint(checkpoint);
    showCheckpoint(checkpoint, index);
});

};

module.exports = {
  transformCheckpoint: transformCheckpoint,
  showCheckpoint: showCheckpoint,
  run: run
};