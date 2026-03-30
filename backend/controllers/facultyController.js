// controllers/facultyController.js
const StudyMaterial = require('../models/StudyMaterial');

// Faculty uploads study material
const uploadMaterial = async (req, res) => {
  try {
    const { title, semester } = req.body;

    // ✅ Validate required fields
    if (!title || !semester) {
      return res.status(400).json({ message: 'Title and semester required' });
    }

    // ✅ Validate file existence
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    // ✅ Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type' });
    }

    // ✅ Create study material
    const material = await StudyMaterial.create({
      title,
      semester,
      fileUrl: `/uploads/${req.file.filename}`,
      uploadedBy: req.user._id,
      department: req.user.department
    });

    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadMaterial };
