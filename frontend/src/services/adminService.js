import API from "../api/axios";

// Students
export const getStudents = async () => {
  const res = await API.get("/admin/students");
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await API.delete(`/admin/students/${id}`);
  return res.data;
};

// Departments
export const getDepartments = async () => {
  const res = await API.get("/departments");
  return res.data;
};

export const createDepartment = async (data) => {
  const res = await API.post("/admin/departments", data);
  return res.data;
};

// Complaints
export const getComplaints = async () => {
  const res = await API.get("/admin/complaints");
  return res.data;
};
