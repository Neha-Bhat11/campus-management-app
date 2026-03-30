const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Auth & role routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));

// 🔥 MISSING ROUTES FIXED
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/timetable', require('./routes/timetableRoutes'));
app.use('/api/materials', require('./routes/studyMaterialRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
