const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { allowDepartmentAccess } = require('../middleware/departmentAccess');
const { getNotices } = require('../controllers/noticeController');

const router = express.Router();

router.get('/', protect, allowDepartmentAccess(), getNotices);

module.exports = router;
