import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
        <h3>Admin Dashboard</h3>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container mt-4">
        <div className="row g-4">

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h5>Manage Students</h5>
              <button
                className="btn btn-primary mt-2"
                onClick={() => navigate("/admin/students")}
              >
                Go
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h5>Manage Faculty</h5>
              <button
                className="btn btn-success mt-2"
                onClick={() => navigate("/admin/faculty")}
              >
                Go
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h5>Resolve Complaints</h5>
              <button
                className="btn btn-warning mt-2"
                onClick={() => navigate("/admin/complaints")}
              >
                Go
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h5>Add Timetable</h5>
              <button
                className="btn btn-info mt-2"
                onClick={() => navigate("/admin/timetable")}
              >
                Go
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h5>Add Notice</h5>
              <button
                className="btn btn-secondary mt-2"
                onClick={() => navigate("/admin/notice")}
              >
                Go
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;