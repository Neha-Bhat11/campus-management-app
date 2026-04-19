import { useEffect, useState } from "react";
import API from "../../api/axios";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/admin/complaints");
        setComplaints(res.data);
      } catch (err) {
        setError("Failed to load complaints. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/admin/complaints/${id}`, { status });
      setComplaints(complaints.map((c) =>
        c._id === id ? { ...c, status } : c
      ));
    } catch (err) {
      setError("Failed to update complaint status. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Complaints</h2>

      {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
      {loading && <p className="text-muted">Loading complaints...</p>}

      {!loading && complaints.length === 0 && !error && (
        <p className="text-muted">No complaints found.</p>
      )}

      {complaints.map((c) => (
        <div key={c._id} className="card mb-3 p-3 shadow-sm">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6 className="mb-1">{c.subject}</h6>
              <p className="mb-1 text-secondary" style={{ fontSize: "13px" }}>{c.description}</p>
              <small className="text-muted">
                From: {c.student?.name} ({c.student?.email})
              </small>
            </div>
            <div className="text-end" style={{ minWidth: "120px" }}>
              <span className={`badge mb-2 d-block ${c.status === "resolved" ? "bg-success" : "bg-warning text-dark"}`}>
                {c.status}
              </span>
              {c.status === "pending" && (
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => handleStatusUpdate(c._id, "resolved")}
                >
                  Mark Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageComplaints;
