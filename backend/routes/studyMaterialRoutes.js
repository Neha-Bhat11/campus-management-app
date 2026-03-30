const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const { allowDepartmentAccess } = require('../middleware/departmentAccess');
const {
  getStudyMaterials,
  uploadMaterial
} = require('../controllers/studyMaterialController');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

router.get('/', protect, allowDepartmentAccess(), getStudyMaterials);

// ✅ only FACULTY can upload
router.post(
  '/',
  protect,
  allowRoles('faculty'),
  upload.single('file'),
  uploadMaterial
);

module.exports = router;
