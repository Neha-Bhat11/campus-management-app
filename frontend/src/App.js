import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/Dashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageDepartments from "./pages/admin/ManageDepartments";
import ManageComplaints from "./pages/admin/ManageComplaints";
import AddTimetable from "./pages/admin/AddTimetable";
import AddNotice from "./pages/admin/AddNotice";
import ManageFaculty from "./pages/admin/ManageFaculty";

import StudentDashboard from "./pages/student/Dashboard";
import Complaint from "./pages/student/Complaint";
import Materials from "./pages/student/Materials";
import Timetable from "./pages/student/Timetable";

import FacultyDashboard from "./pages/faculty/Dashboard";
import UploadMaterial from "./pages/faculty/UploadMaterial";
import ViewComplaints from "./pages/faculty/ViewComplaints";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="/admin/students" element={
        <ProtectedRoute role="admin"><ManageStudents /></ProtectedRoute>
      } />
      <Route path="/admin/departments" element={
        <ProtectedRoute role="admin"><ManageDepartments /></ProtectedRoute>
      } />
      <Route path="/admin/complaints" element={
        <ProtectedRoute role="admin"><ManageComplaints /></ProtectedRoute>
      } />
      <Route path="/admin/faculty" element={
  <ProtectedRoute role="admin"><ManageFaculty /></ProtectedRoute>
} />

<Route path="/admin/timetable" element={
  <ProtectedRoute role="admin"><AddTimetable /></ProtectedRoute>
} />

<Route path="/admin/notice" element={
  <ProtectedRoute role="admin"><AddNotice /></ProtectedRoute>
} />

      {/* Student */}
      <Route path="/student/dashboard" element={
        <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>
      } />
      <Route path="/student/complaint" element={
        <ProtectedRoute role="student"><Complaint /></ProtectedRoute>
      } />
      <Route path="/student/materials" element={
        <ProtectedRoute role="student"><Materials /></ProtectedRoute>
      } />
      <Route path="/student/timetable" element={
        <ProtectedRoute role="student"><Timetable /></ProtectedRoute>
      } />

      {/* Faculty */}
      <Route path="/faculty/dashboard" element={
        <ProtectedRoute role="faculty"><FacultyDashboard /></ProtectedRoute>
      } />
      <Route path="/faculty/upload" element={
        <ProtectedRoute role="faculty"><UploadMaterial /></ProtectedRoute>
      } />
      <Route path="/faculty/complaints" element={
        <ProtectedRoute role="faculty"><ViewComplaints /></ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
