import { useState } from "react";
import { uploadMaterial } from "../../services/facultyService";

const UploadMaterial = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadMaterial({ title });
    alert("Uploaded Successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Material Title" onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadMaterial;
