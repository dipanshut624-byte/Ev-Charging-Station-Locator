const express = require('express');
const router = express.Router();
// const Feedback = require('../models/feedback'); // Using mock

// Mock feedback storage
let mockFeedbacks = [];

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ success: false, message: 'Email and message are required.' });
    }

    // Mock save
    const feedback = {
      _id: Date.now().toString(),
      email,
      message,
      createdAt: new Date()
    };
    mockFeedbacks.push(feedback);

    res.status(201).json({ success: true, message: 'Feedback submitted successfully.' });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ success: false, message: 'Failed to submit feedback.' });
  }
});

module.exports = router;
