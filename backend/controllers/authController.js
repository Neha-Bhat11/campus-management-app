const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

// Register user with hashed password
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // ❌ Block admin registration
    if (role === 'admin') {
      return res.status(403).json({ message: 'Admin registration not allowed' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      department
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Login user with role
const loginWithRole = async (req, res, role) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, role });
  if (!user) return res.status(401).json({ message: `${role} not found` });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

 res.json({
  token: generateToken(user._id),
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
});
};

const adminLogin = (req, res) => loginWithRole(req, res, 'admin');
const facultyLogin = (req, res) => loginWithRole(req, res, 'faculty');
const studentLogin = (req, res) => loginWithRole(req, res, 'student');

module.exports = { registerUser, adminLogin, facultyLogin, studentLogin };
