const Timetable = require('../models/Timetable');
const StudyMaterial = require('../models/StudyMaterial');
const Complaint = require('../models/Complaint');

const viewTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find({ department: req.user.department });
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const viewMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find({ department: req.user.department });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ BUG FIX: submitComplaint was exported but never defined — now properly implemented
const submitComplaint = async (req, res) => {
  try {
    const { subject, description } = req.body;

    if (!subject || !description) {
      return res.status(400).json({ message: 'Subject and description are required' });
    }

    const complaint = await Complaint.create({
      student: req.user._id,
      subject,
      description,
    });

    res.status(201).json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { viewTimetable, viewMaterials, submitComplaint };
