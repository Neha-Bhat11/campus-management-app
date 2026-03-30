const mongoose = require('mongoose');

const studyMaterialSchema = mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  semester: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
