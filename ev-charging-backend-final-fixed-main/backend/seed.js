const mongoose = require('mongoose');
const Station = require('./models/Station');

const bhopalStations = [
  {
    name: "Bhopal Central Station",
    address: "MP Nagar, Bhopal",
    chargingSpeed: "Fast",
    availablePorts: 3,
    location: { type: "Point", coordinates: [77.4126, 23.2599] },
  },
  {
    name: "Lake View Charger",
    address: "Upper Lake Road, Bhopal",
    chargingSpeed: "Standard",
    availablePorts: 2,
    location: { type: "Point", coordinates: [77.3990, 23.2510] },
  },
  {
    name: "Smart City EV Point",
    address: "New Market, Bhopal",
    chargingSpeed: "Rapid",
    availablePorts: 4,
    location: { type: "Point", coordinates: [77.4300, 23.2650] },
  },
  {
    name: "Ayodhya Bypass Charger",
    address: "Ayodhya Bypass, Bhopal",
    chargingSpeed: "Fast",
    availablePorts: 5,
    location: { type: "Point", coordinates: [77.4600, 23.2700] },
  },
  {
    name: "Habibganj EV Hub",
    address: "Habibganj Station, Bhopal",
    chargingSpeed: "Standard",
    availablePorts: 1,
    location: { type: "Point", coordinates: [77.4450, 23.2450] },
  }
];

const mainStations = [
   {
    name: "Bhopal Central Station",
    address: "MP Nagar, Bhopal",
    chargingSpeed: "Fast",
    availablePorts: 3,
    location: { type: "Point", coordinates: [77.4126, 23.2599] },
  },
  {
    name: "Lake View Charger",
    address: "Upper Lake Road, Bhopal",
    chargingSpeed: "Standard",
    availablePorts: 2,
    location: { type: "Point", coordinates: [77.3990, 23.2510] },
  },
  {
    name: "Smart City EV Point",
    address: "New Market, Bhopal",
    chargingSpeed: "Rapid",
    availablePorts: 4,
    location: { type: "Point", coordinates: [77.4300, 23.2650] },
  },
  {
    name: "Ayodhya Bypass Charger",
    address: "Ayodhya Bypass, Bhopal",
    chargingSpeed: "Fast",
    availablePorts: 5,
    location: { type: "Point", coordinates: [77.4600, 23.2700] },
  },
  {
    name: "Habibganj EV Hub",
    address: "Habibganj Station, Bhopal",
    chargingSpeed: "Standard",
    availablePorts: 1,
    location: { type: "Point", coordinates: [77.4450, 23.2450] },
  },
  {
    name: 'Station A',
    address: 'MG Road, Bangalore',
    availablePorts: 4,
    chargingSpeed: 'Fast',
    location: { type: 'Point', coordinates: [77.5946, 12.9716] },
    branchStations: bhopalStations, // ✅ correctly referenced
  },
  {
    name: 'Station B',
    address: 'Koramangala, Bangalore',
    availablePorts: 6,
    chargingSpeed: 'Medium',
    location: { type: 'Point', coordinates: [77.6090, 12.9352] }
  },
  {
    name: 'Station C',
    address: 'Rajajinagar, Bangalore',
    availablePorts: 3,
    chargingSpeed: 'Slow',
    location: { type: 'Point', coordinates: [77.5670, 12.9880] }
  },
];

async function seedStations() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ev-charging');
    console.log('Connected to MongoDB');

    await Station.deleteMany({});
    await Station.insertMany(mainStations);

    console.log('Main and branch stations inserted');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

seedStations();
