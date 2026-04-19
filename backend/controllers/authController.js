const User = require('../models/User');
const Department = require('../models/Department');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    if (role === 'admin') {
      return res.status(403).json({ message: 'Admin registration not allowed' });
    }

    if (!department || !department.trim()) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // ✅ Find department by name (case-insensitive), or create it if it doesn't exist yet
    const deptName = department.trim();
    let dept = await Department.findOne({ name: { $regex: new RegExp(`^${deptName}$`, 'i') } });
    if (!dept) {
      dept = await Department.create({ name: deptName });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      department: dept._id
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

const loginWithRole = async (req, res, role) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

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
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

const adminLogin = (req, res) => loginWithRole(req, res, 'admin');
const facultyLogin = (req, res) => loginWithRole(req, res, 'faculty');
const studentLogin = (req, res) => loginWithRole(req, res, 'student');

module.exports = { registerUser, adminLogin, facultyLogin, studentLogin };
