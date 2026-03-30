import React, { useState } from "react";

const Dashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [file, setFile] = useState(null);

  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedClass || !file) {
      alert("Please select a class and upload a file.");
      return;
    }

    const newMaterial = {
      className: selectedClass,
      fileName: file.name,
      uploadedAt: new Date().toLocaleString(),
    };

    setMaterials([...materials, newMaterial]);
    setFile(null);
    setSelectedClass("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Faculty Dashboard</h2>

      <form onSubmit={handleUpload} style={{ marginBottom: "20px" }}>
        <label>
          Select Class:
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">--Choose--</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </label>

        <br /><br />

        <label>
          Upload Study Material:
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <br /><br />

        <button type="submit">Upload</button>
      </form>

      <h3>Uploaded Materials</h3>
      <ul>
        {materials.map((m, index) => (
          <li key={index}>
            {m.fileName} → {m.className} (Uploaded: {m.uploadedAt})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;