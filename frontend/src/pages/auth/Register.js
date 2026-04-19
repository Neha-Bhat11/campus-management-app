import { useState, useEffect } from "react";
import { registerUser } from "../../services/authService";
import { getDepartments } from "../../services/adminService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    department: ""
  });

  // ✅ BUG FIX: added error and success state instead of alert()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ BUG FIX: client-side validation before hitting the server
  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.password.trim()) return "Password is required";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (!form.department) return "Please select a department";
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
      // Show the server's error message if available, otherwise a fallback
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h3 className="text-center mb-4">Register</h3>

        {/* ✅ BUG FIX: inline error and success messages */}
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success py-2" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ✅ BUG FIX: added required to all inputs */}
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

          <select className="form-select mb-3" name="department" onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.name}
              </option>
            ))}
          </select>

          <button className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
