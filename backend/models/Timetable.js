const mongoose = require('mongoose');
const timetableSchema = mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  semester: { type: Number, required: true },
  schedule: [{ day: String, subject: String, time: String }]
},{ timestamps: true });
module.exports = mongoose.model('Timetable', timetableSchema);
