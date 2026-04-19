import { useState, useEffect } from "react";
import API from "../../api/axios";
import { getDepartments } from "../../services/adminService";

const AddNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (err) {
        setError("Could not load departments.");
      }
    };
    fetchDepts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) return setError("Title is required");
    if (!description.trim()) return setError("Description is required");
    if (!department) return setError("Please select a department");

    try {
      setLoading(true);
      await API.post("/admin/notice", { title, description, department });
      setSuccess("Notice posted successfully!");
      setTitle("");
      setDescription("");
      setDepartment("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to post notice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4" style={{ maxWidth: "500px" }}>
        <h4 className="mb-4">Post a Notice</h4>

        {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
        {success && <div className="alert alert-success py-2" role="alert">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              placeholder="Notice title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Notice details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>

          <button className="btn btn-secondary w-100" disabled={loading}>
            {loading ? "Posting..." : "Post Notice"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
