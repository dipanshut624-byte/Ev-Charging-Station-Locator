const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Using mock

// Mock users storage
let mockUsers = [];

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists (mock)
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Mock save
    const newUser = {
      _id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };
    mockUsers.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};
