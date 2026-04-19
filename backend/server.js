const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

// ✅ Startup guard: crash early if required env vars are missing
const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET', 'JWT_EXPIRES_IN', 'ALLOWED_ORIGIN'];
const missingVars = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('Add them to your .env file and restart the server.');
  process.exit(1);
}

connectDB();

const app = express();

// ✅ Restrict CORS to your frontend URL only (set ALLOWED_ORIGIN in .env)
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
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
