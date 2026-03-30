const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
