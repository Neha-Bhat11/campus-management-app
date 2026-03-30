const Complaint = require('../models/Complaint');

const createComplaint = async (req, res) => {
  try {
    const { subject, description } = req.body;

    if (!subject || !description) {
      return res.status(400).json({
        message: 'Subject and description are required'
      });
    }

    const complaint = await Complaint.create({
      student: req.user._id,
      subject,
      description
    });

    res.status(201).json({
      success: true,
      complaint
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createComplaint };
