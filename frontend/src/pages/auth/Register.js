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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" name="name" placeholder="Name" onChange={handleChange} />
          <input className="form-control mb-3" name="email" placeholder="Email" onChange={handleChange} />
          <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} />

          <select className="form-select mb-3" name="role" onChange={handleChange}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          <select className="form-select mb-3" name="department" onChange={handleChange}>
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
