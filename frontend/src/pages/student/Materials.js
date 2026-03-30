import { useEffect, useState } from "react";
import { getMaterials } from "../../services/studentService";

const Materials = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getMaterials();
      setMaterials(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2>Study Materials</h2>
      {materials.map((m) => (
        <div key={m._id}>{m.title}</div>
      ))}
    </div>
  );
};

export default Materials;
