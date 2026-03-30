const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

const {
  getAllStudents,
  deleteStudent,
  addDepartment,
  postNotice,
  viewComplaints,
  updateComplaintStatus
} = require('../controllers/adminController');

const router = express.Router();

router.use(protect, allowRoles('admin'));

router.get('/students', getAllStudents);
router.delete('/students/:id', deleteStudent);

router.post('/department', addDepartment);
router.post('/notice', postNotice);

router.get('/complaints', viewComplaints);
router.put('/complaints/:id', updateComplaintStatus);

module.exports = router;