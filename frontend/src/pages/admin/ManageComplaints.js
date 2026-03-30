import { useEffect, useState } from "react";
import { getComplaints } from "../../services/adminService";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getComplaints();
      setComplaints(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2>All Complaints</h2>
      {complaints.map((c) => (
        <div key={c._id}>
          <p>{c.title}</p>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ManageComplaints;
