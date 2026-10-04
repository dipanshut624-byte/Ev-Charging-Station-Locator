// backend/models/station.js
const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: String,
  address: String,
  chargingSpeed: String,
  availablePorts: Number,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  }
});

const stationSchema = new mongoose.Schema({
  name: String,
  address: String,
  chargingSpeed: String,
  availablePorts: Number,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  branchStations: [branchSchema]
});

// Enable geospatial querying
stationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Station', stationSchema);
