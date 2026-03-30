const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const { allowDepartmentAccess } = require('../middleware/departmentAccess');
const { getStudyMaterials } = require('../controllers/studyMaterialController');
const { getNotices } = require('../controllers/noticeController');
const { createComplaint } = require('../controllers/complaintController');

const router = express.Router();

// ✅ Submit complaint
router.post(
  '/complaints',
  protect,
  allowRoles('student'),
  createComplaint
);

router.get(
  '/materials',
  protect,
  allowRoles('student'),
  allowDepartmentAccess(),
  getStudyMaterials
);

router.get(
  '/notices',
  protect,
  allowRoles('student'),
  allowDepartmentAccess(),
  getNotices
);

module.exports = router;
