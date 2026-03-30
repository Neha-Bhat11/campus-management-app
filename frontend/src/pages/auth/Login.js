import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student"
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(form);

      if (user.role === "admin") navigate("/admin/dashboard");
      if (user.role === "student") navigate("/student/dashboard");
      if (user.role === "faculty") navigate("/faculty/dashboard");

    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Campus Login</h3>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <select
            className="form-control mb-3"
            name="role"
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>

          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          New User? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;