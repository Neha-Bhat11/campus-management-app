import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const ViewNotice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await API.get("/student/notices");
        setNotices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotices();
  }, []);

  return (
    <div>
      <h3>Notices</h3>
      <ul>
        {notices.map((notice) => (
          <li key={notice._id}>{notice.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewNotice;