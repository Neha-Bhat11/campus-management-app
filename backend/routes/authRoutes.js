const express = require('express');
const {
  registerUser,
  adminLogin,
  facultyLogin,
  studentLogin,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/admin/login', adminLogin);
router.post('/faculty/login', facultyLogin);
router.post('/student/login', studentLogin);

// 🔥 ADD THIS
router.post('/login', (req, res) => {
  const { role } = req.body;

  if (role === "admin") return adminLogin(req, res);
  if (role === "faculty") return facultyLogin(req, res);
  if (role === "student") return studentLogin(req, res);

  return res.status(400).json({ message: "Invalid role" });
});

module.exports = router;