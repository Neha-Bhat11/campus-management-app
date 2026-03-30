const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const { allowDepartmentAccess } = require('../middleware/departmentAccess');
const { getTimetable, createTimetable } = require('../controllers/timetableController');
const router = express.Router();

// ✅ Allow admin, student, faculty to GET timetable
router.get(
  '/',
  protect,
  allowDepartmentAccess(),
  allowRoles('admin', 'student', 'faculty'),
  getTimetable
);

// Only admin can create
router.post('/', protect, allowRoles('admin'), createTimetable);

module.exports = router;
