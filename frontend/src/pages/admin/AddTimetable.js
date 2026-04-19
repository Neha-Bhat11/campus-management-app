import { useState, useEffect } from "react";
import API from "../../api/axios";
import { getDepartments } from "../../services/adminService";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const AddTimetable = () => {
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [departments, setDepartments] = useState([]);
  const [schedule, setSchedule] = useState([{ day: "Monday", subject: "", time: "" }]);
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

  const handleScheduleChange = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const addRow = () => setSchedule([...schedule, { day: "Monday", subject: "", time: "" }]);
  const removeRow = (index) => setSchedule(schedule.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!department) return setError("Please select a department");
    if (!semester) return setError("Please select a semester");
    if (schedule.some((s) => !s.subject.trim() || !s.time.trim()))
      return setError("Please fill in all subject and time fields");

    try {
      setLoading(true);
      await API.post("/timetable", { department, semester, schedule });
      setSuccess("Timetable created successfully!");
      setDepartment("");
      setSemester("");
      setSchedule([{ day: "Monday", subject: "", time: "" }]);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create timetable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4" style={{ maxWidth: "600px" }}>
        <h4 className="mb-4">Add Timetable</h4>

        {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
        {success && <div className="alert alert-success py-2" role="alert">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
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
            <div className="col">
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
          </div>

          <label className="form-label">Schedule</label>
          {schedule.map((row, index) => (
            <div key={index} className="row mb-2 align-items-center">
              <div className="col">
                <select
                  className="form-select form-select-sm"
                  value={row.day}
                  onChange={(e) => handleScheduleChange(index, "day", e.target.value)}
                >
                  {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="col">
                <input
                  className="form-control form-control-sm"
                  placeholder="Subject"
                  value={row.subject}
                  onChange={(e) => handleScheduleChange(index, "subject", e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <input
                  className="form-control form-control-sm"
                  placeholder="Time (e.g. 9:00 AM)"
                  value={row.time}
                  onChange={(e) => handleScheduleChange(index, "time", e.target.value)}
                  required
                />
              </div>
              <div className="col-auto">
                {schedule.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeRow(index)}
                  >✕</button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm mb-3"
            onClick={addRow}
          >
            + Add Row
          </button>

          <button className="btn btn-info w-100 d-block" disabled={loading}>
            {loading ? "Saving..." : "Save Timetable"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTimetable;
