import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const ViewTimetable = () => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await API.get("/timetable"); // ✅ fixed
        setTimetable(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTimetable();
  }, []);

  return (
    <div>
      <h3>Timetable</h3>
      <ul>
        {timetable.map((item, index) => (
          <li key={index}>
            {item.subject} - {item.lecture} - {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTimetable;