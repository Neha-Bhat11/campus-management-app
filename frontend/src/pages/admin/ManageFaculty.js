import { useEffect, useState } from "react";
import API from "../../api/axios";

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await API.get("/admin/faculty");
        setFaculty(res.data);
      } catch (err) {
        setError("Failed to load faculty. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/faculty/${id}`);
      setFaculty(faculty.filter((f) => f._id !== id));
    } catch (err) {
      setError("Failed to delete faculty member. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Faculty</h2>

      {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
      {loading && <p className="text-muted">Loading faculty...</p>}

      {!loading && faculty.length === 0 && !error && (
        <p className="text-muted">No faculty members found.</p>
      )}

      {faculty.map((f) => (
        <div
          key={f._id}
          className="d-flex justify-content-between align-items-center border-bottom py-2"
        >
          <div>
            <span className="fw-500">{f.name}</span>
            <span className="text-muted ms-2" style={{ fontSize: "13px" }}>{f.email}</span>
            {f.department?.name && (
              <span className="badge bg-secondary ms-2">{f.department.name}</span>
            )}
          </div>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(f._id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageFaculty;
