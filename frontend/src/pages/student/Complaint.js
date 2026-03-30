import { useState } from "react";
import { createComplaint } from "../../services/studentService";

const Complaint = () => {
  const [data, setData] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createComplaint(data);
    alert("Complaint Submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" onChange={(e) => setData({ ...data, title: e.target.value })} />
      <textarea placeholder="Description" onChange={(e) => setData({ ...data, description: e.target.value })} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Complaint;
