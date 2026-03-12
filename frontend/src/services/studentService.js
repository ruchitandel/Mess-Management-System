import api from "./api";

export const getStudentDashboard = (id) =>
  api.get(`/student-dashboard/${id}`);

export const getStudentAttendance = (id) =>
  api.get(`/student-attendance/${id}`);

export const getStudentBilling = (id) =>
  api.get(`/student-billing/${id}`);