import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    department: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.password.trim()) return "Password is required";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (!form.department.trim()) return "Department name is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await registerUser(form);
      setSuccess("Registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h3 className="text-center mb-4">Register</h3>

        {error && (
          <div className="alert alert-danger py-2" role="alert">{error}</div>
        )}
        {success && (
          <div className="alert alert-success py-2" role="alert">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password (min. 6 characters)"
            onChange={handleChange}
            required
            minLength={6}
          />

          <select className="form-select mb-3" name="role" onChange={handleChange}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          {/* ✅ Free-text input instead of dropdown */}
          <div className="mb-3">
            <input
              className="form-control"
              name="department"
              placeholder="Department (e.g. Computer Science)"
              onChange={handleChange}
              required
            />
            <div className="form-text text-muted" style={{ fontSize: "12px" }}>
              Type your department name exactly as it should appear.
            </div>
          </div>

          <button className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
