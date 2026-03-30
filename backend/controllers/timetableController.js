const Timetable = require('../models/Timetable');

// Get timetable (role-based, department-based)
const getTimetable = async (req, res) => {
  try {
    const filter = req.departmentFilter || {};
    const timetable = await Timetable.find(filter).populate('department', 'name');
    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create timetable (ADMIN ONLY)
const createTimetable = async (req, res) => {
  try {
    const { department, semester, schedule } = req.body;

    if (!department || !semester || !schedule) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const timetable = await Timetable.create({
      department,
      semester,
      schedule
    });

    res.status(201).json(timetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTimetable, createTimetable };
