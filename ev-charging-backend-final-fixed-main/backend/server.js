const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/authRoutes');
const stationRoutes = require('./routes/stationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express(); // ✅ initialize first

const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve frontend
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/feedback', feedbackRoutes); // ✅ lowercase

// ✅ Mock Database for testing (replace with real MongoDB later)
const mockStations = [
  {
    _id: '1',
    name: 'Station A',
    location: 'Downtown',
    availableChargers: 5,
    connections: [
      { name: 'Station B', distance: 10 },
      { name: 'Station C', distance: 15 }
    ]
  },
  {
    _id: '2',
    name: 'Station B',
    location: 'Midtown',
    availableChargers: 3,
    connections: [
      { name: 'Station A', distance: 10 },
      { name: 'Station C', distance: 8 }
    ]
  },
  {
    _id: '3',
    name: 'Station C',
    location: 'Uptown',
    availableChargers: 7,
    connections: [
      { name: 'Station A', distance: 15 },
      { name: 'Station B', distance: 8 }
    ]
  }
];

let mockUsers = [];
let mockFeedbacks = [];

console.log('Using mock database for testing');

// Mock mongoose models
const MockModel = function(data) {
  Object.assign(this, data);
  this.save = function() {
    return Promise.resolve(this);
  };
};

MockModel.find = function() {
  return Promise.resolve(mockStations);
};
MockModel.findById = function(id) {
  return Promise.resolve(mockStations.find(s => s._id === id));
};
MockModel.create = function(data) {
  const newItem = { ...data, _id: Date.now().toString() };
  if (data.email && data.message) {
    mockFeedbacks.push(newItem);
  }
  return Promise.resolve(newItem);
};

// Override mongoose.model to return our mock
const originalModel = mongoose.model;
mongoose.model = function(name) {
  if (name === 'Station') return MockModel;
  if (name === 'User') {
    const UserModel = function(data) {
      Object.assign(this, data);
      this.save = function() {
        const user = { ...this, _id: Date.now().toString() };
        mockUsers.push(user);
        return Promise.resolve(user);
      };
    };
    UserModel.findOne = function(query) {
      return Promise.resolve(mockUsers.find(u => u.email === query.email));
    };
    return UserModel;
  }
  if (name === 'feedback') {
    const FeedbackModel = function(data) {
      Object.assign(this, data);
      this.save = function() {
        const feedback = { ...this, _id: Date.now().toString() };
        mockFeedbacks.push(feedback);
        return Promise.resolve(feedback);
      };
    };
    return FeedbackModel;
  }
  return originalModel.call(mongoose, name);
};

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
