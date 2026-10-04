// backend/routes/stationRoutes.js
const express = require('express');
const router = express.Router();
const Station = require('../models/Station');
const { findShortestPath } = require('../utils/shortestPath');

// Mock stations data for testing
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

// Helper to build graph from station data
function buildGraph(stations) {
  const graph = {};
  for (const station of stations) {
    graph[station.name] = {};
    for (const neighbor of station.connections) {
      graph[station.name][neighbor.name] = neighbor.distance;
    }
  }
  return graph;
}

// Get all stations
router.get('/', async (req, res) => {
  try {
    // For mock testing, return mock data directly
    res.json(mockStations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stations/shortest-path?source=A&destination=B
router.get('/shortest-path', async (req, res) => {
  const { source, destination } = req.query;

  if (!source || !destination) {
    return res.status(400).json({ error: 'Missing source or destination' });
  }

  try {
    // Use mock data for testing
    const graph = buildGraph(mockStations);
    const result = findShortestPath(source, destination, graph);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
