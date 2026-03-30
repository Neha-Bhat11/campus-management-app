import { useState, useEffect } from "react";
import { getDepartments, createDepartment } from "../../services/adminService";

const ManageDepartments = () => {
  const [name, setName] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getDepartments();
      setDepartments(data);
    };
    fetch();
  }, []);

  const handleAdd = async () => {
    const newDep = await createDepartment({ name });
    setDepartments([...departments, newDep]);
  };

  return (
    <div>
      <h2>Departments</h2>
      <input placeholder="Department Name" onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      {departments.map((d) => (
        <div key={d._id}>{d.name}</div>
      ))}
    </div>
  );
};

export default ManageDepartments;
