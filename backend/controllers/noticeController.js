// controllers/noticeController.js
const Notice = require('../models/Notice');

const getNotices = async (req, res) => {
  try {
    const filter = req.departmentFilter || {}; // Admin sees all
    const notices = await Notice.find(filter).populate('department');
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotices };
