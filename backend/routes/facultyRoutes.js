// routes/facultyRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const { uploadMaterial } = require('../controllers/facultyController');
const multer = require('multer');

const router = express.Router();

// Only faculty can access all routes in this file
router.use(protect, allowRoles('faculty'));

// ✅ File upload setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Upload folder
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  }
});

// ✅ Limit file size (optional but recommended)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// POST /api/faculty/upload
router.post('/upload', upload.single('file'), uploadMaterial);

module.exports = router;
