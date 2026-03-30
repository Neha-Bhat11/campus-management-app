const User = require('../models/User');
const Department = require('../models/Department');
const Notice = require('../models/Notice');
const Complaint = require('../models/Complaint');

/* ===============================
   GET ALL STUDENTS
================================ */
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .populate('department', 'name');

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const mongoose = require("mongoose");

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await User.findOne({
      _id: id,
      role: "student"
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.deleteOne({ _id: id });

    res.json({ message: "Student deleted successfully" });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   ADD DEPARTMENT
================================ */
const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const deptExists = await Department.findOne({ name });
    if (deptExists) {
      return res.status(400).json({ message: 'Department exists' });
    }

    const department = await Department.create({ name });

    res.status(201).json(department);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   POST NOTICE
================================ */
const postNotice = async (req, res) => {
  try {
    const { title, description, department } = req.body;

    if (!title || !description || !department) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const dept = await Department.findById(department);
    if (!dept) {
      return res.status(400).json({ message: 'Invalid department' });
    }

    const notice = await Notice.create({
      title,
      description,
      department,
      postedBy: req.user._id
    });

    res.status(201).json(notice);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   VIEW COMPLAINTS
================================ */
const viewComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('student', 'name email');

    res.json(complaints);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   UPDATE COMPLAINT STATUS
================================ */
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllStudents,
  deleteStudent,            // ✅ IMPORTANT: exported
  addDepartment,
  postNotice,
  viewComplaints,
  updateComplaintStatus
};