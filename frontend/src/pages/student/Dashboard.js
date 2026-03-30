// frontend/src/pages/student/Dashboard.js
import React, { useState } from "react";
import SubmitComplaint from "./SubmitComplaint";
import ViewNotice from "./ViewNotice";
import ViewTimetable from "./ViewTimetable";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("timetable");

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", borderRight: "1px solid gray" }}>
        <h3>Student Dashboard</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li onClick={() => setActiveTab("timetable")} style={{ cursor: "pointer", margin: "10px 0" }}>
            View Timetable
          </li>
          <li onClick={() => setActiveTab("notice")} style={{ cursor: "pointer", margin: "10px 0" }}>
            View Notices
          </li>
          <li onClick={() => setActiveTab("complaint")} style={{ cursor: "pointer", margin: "10px 0" }}>
            Submit Complaint
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px", flex: 1 }}>
        {activeTab === "timetable" && <ViewTimetable />}
        {activeTab === "notice" && <ViewNotice />}
        {activeTab === "complaint" && <SubmitComplaint />}
      </div>
    </div>
  );
};

export default Dashboard;