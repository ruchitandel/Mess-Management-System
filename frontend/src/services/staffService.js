import api from "./api";

export const getStaffDashboard = () =>
  api.get("/staff-dashboard");

export const getAttendance = () =>
  api.get("/staff-attendance");

export const getBilling = () =>
  api.get("/staff-billing");

export const getAnnouncements = () =>
  api.get("/staff-announcements");