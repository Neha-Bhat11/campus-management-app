import { useState } from "react";
import API from "../../api/axios";

const UploadMaterial = () => {
  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!title.trim()) return setError("Title is required");
    if (!semester) return setError("Please select a semester");
    if (!file) return setError("Please select a file to upload");

    // Build multipart form data (required for file uploads)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("semester", semester);
    formData.append("file", file);

    try {
      setLoading(true);
      await API.post("/faculty/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Material uploaded successfully!");
      setTitle("");
      setSemester("");
      setFile(null);
      e.target.reset();
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4" style={{ maxWidth: "500px" }}>
        <h4 className="mb-4">Upload Study Material</h4>

        {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
        {success && <div className="alert alert-success py-2" role="alert">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              placeholder="e.g. Chapter 3 Notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Semester</label>
            <select
              className="form-select"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">File (PDF, DOC, DOCX, JPG, PNG)</label>
            <input
              className="form-control"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Uploading..." : "Upload Material"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMaterial;
