const StudyMaterial = require('../models/StudyMaterial');
const { validateUploadedFile } = require('../utils/validateUpload'); // ✅ QUALITY FIX: use shared helper

const uploadMaterial = async (req, res) => {
  try {
    const { title, semester } = req.body;

    if (!title || !semester) {
      return res.status(400).json({ message: 'Title and semester required' });
    }

    const fileError = validateUploadedFile(req.file);
    if (fileError) {
      return res.status(400).json({ message: fileError });
    }

    const material = await StudyMaterial.create({
      title,
      semester,
      fileUrl: `/uploads/${req.file.filename}`,
      uploadedBy: req.user._id,
      department: req.user.department,
    });

    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadMaterial };
