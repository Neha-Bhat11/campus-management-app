import { useEffect, useState } from "react";
import { viewComplaints } from "../../services/facultyService";

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await viewComplaints();
      setComplaints(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2>Student Complaints</h2>
      {complaints.map((c) => (
        <div key={c._id}>{c.title}</div>
      ))}
    </div>
  );
};

export default ViewComplaints;
