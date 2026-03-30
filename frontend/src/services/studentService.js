import API from "../api/axios";

export const createComplaint = async (data) => {
  const res = await API.post("/student/complaints", data);
  return res.data;
};

export const getMaterials = async () => {
  const res = await API.get("/student/materials");
  return res.data;
};

export const getTimetable = async () => {
  const res = await API.get("/student/timetable");
  return res.data;
};
