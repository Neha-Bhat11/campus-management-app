import API from "../api/axios";

export const uploadMaterial = async (data) => {
  const res = await API.post("/faculty/materials", data);
  return res.data;
};

export const viewComplaints = async () => {
  const res = await API.get("/faculty/complaints");
  return res.data;
};
