const StudyMaterial = require('../models/StudyMaterial');

const getStudyMaterials = async (req, res) => {
  try {
    const filter =
      req.user.role === 'admin'
        ? {}
        : { department: req.user.department };

    const materials = await StudyMaterial.find(filter)
      .populate('department', 'name');

    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadMaterial = async (req, res) => {
  try {
    const { title, semester } = req.body;

    if (!title || !semester) {
      return res.status(400).json({ message: 'Title and semester required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

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

module.exports = { getStudyMaterials, uploadMaterial };

