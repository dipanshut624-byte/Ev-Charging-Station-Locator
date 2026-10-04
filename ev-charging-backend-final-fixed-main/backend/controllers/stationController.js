// Station controller
const Station = require('../models/Station');

exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createStation = async (req, res) => {
  const { name, location, address, availablePorts, chargingSpeed } = req.body;

  try {
    const newStation = new Station({
      name,
      location,
      address,
      availablePorts,
      chargingSpeed,
    });
    await newStation.save();
    res.status(201).json(newStation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStation = async (req, res) => {
  const stationId = req.params.id;
  const updates = req.body;

  try {
    const station = await Station.findByIdAndUpdate(stationId, updates, { new: true });
    if (!station) return res.status(404).json({ message: 'Station not found' });

    res.json(station);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStation = async (req, res) => {
  const stationId = req.params.id;

  try {
    const station = await Station.findByIdAndDelete(stationId);
    if (!station) return res.status(404).json({ message: 'Station not found' });

    res.json({ message: 'Station deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getNearbyStations = async (req, res) => {
  const { lat, lng, maxDistance = 5000 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  try {
    const stations = await Station.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });

    res.json(stations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
