import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../../services/adminService";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  // ✅ QUALITY FIX: replaced alert() with inline error message
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        setError("Failed to load students. Please refresh the page.");
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter((s) => s._id !== id));
    } catch (err) {
      setError("Failed to delete student. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Students</h2>

      {/* ✅ QUALITY FIX: inline error banner */}
      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}

      {students.length === 0 && !error && (
        <p className="text-muted">No students found.</p>
      )}

      {students.map((s) => (
        <div
          key={s._id}
          className="d-flex justify-content-between align-items-center border-bottom py-2"
        >
          <span>{s.name} — {s.email}</span>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(s._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageStudents;
