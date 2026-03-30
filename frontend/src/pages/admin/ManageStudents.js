import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../../services/adminService";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.log("Error fetching students:", err);
      alert("Failed to load students");
    }
  };

  fetchStudents();
}, []);

const handleDelete = async (id) => {
  try {
    await deleteStudent(id);
    setStudents(students.filter((s) => s._id !== id));
  } catch (err) {
    console.log("Delete failed:", err);
    alert("Failed to delete student");
  }
};

  

  return (
    <div>
      <h2>Manage Students</h2>
      {students.map((s) => (
        <div key={s._id}>
          {s.name} - {s.email}
          <button onClick={() => handleDelete(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageStudents;
