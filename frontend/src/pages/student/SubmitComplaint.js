import { useState } from "react";
import API from "../../api/axios";

const SubmitComplaint = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!subject.trim()) return setError("Subject is required");
    if (!description.trim()) return setError("Description is required");

    try {
      setLoading(true);
      await API.post("/student/complaints", { subject, description });
      setSuccess("Complaint submitted successfully!");
      setSubject("");
      setDescription("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4" style={{ maxWidth: "500px" }}>
        <h4 className="mb-4">Submit a Complaint</h4>

        {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
        {success && <div className="alert alert-success py-2" role="alert">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              className="form-control"
              placeholder="Brief subject of your complaint"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="5"
              placeholder="Describe your complaint in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-danger w-100" disabled={loading}>
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitComplaint;
