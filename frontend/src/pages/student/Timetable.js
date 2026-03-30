import { useEffect, useState } from "react";
import { getTimetable } from "../../services/studentService";

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getTimetable();
      setTimetable(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2>Timetable</h2>
      {timetable.map((t) => (
        <div key={t._id}>{t.subject} - {t.time}</div>
      ))}
    </div>
  );
};

export default Timetable;
