import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";

import DashboardLayout from "./layouts/DashboardLayout";

import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import StaffDashboard from "./pages/dashboard/StaffDashboard";

import StudentAttendance from "./pages/dashboard/StudentAttendance";
import StudentBilling from "./pages/dashboard/StudentBilling";
import StudentProfile from "./pages/dashboard/StudentProfile";

import StaffAttendance from "./pages/dashboard/StaffAttendance";
import StaffBilling from "./pages/dashboard/StaffBilling";
import StaffMeals from "./pages/dashboard/StaffMeals";
import StaffAnnouncements from "./pages/dashboard/StaffAnnouncements";

import UserManagement from "./pages/dashboard/admin/UserManagement";
import MealPlanning from "./pages/dashboard/admin/MealPlanning";
import AttendanceReport from "./pages/dashboard/admin/AttendanceReport";
import BillingOverview from "./pages/dashboard/admin/BillingOverview";
import InventoryManagement from "./pages/dashboard/admin/InventoryManagement";
import VendorManagement from "./pages/dashboard/admin/VendorManagement";
import Reports from "./pages/dashboard/admin/Reports";
import Announcements from "./pages/dashboard/admin/Announcements";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("role_id");

  return (
    <Router>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/auth"
          element={
            token
              ? roleId === "1"
                ? <Navigate to="/admin" />
                : roleId === "2"
                ? <Navigate to="/student" />
                : roleId === "3"
                ? <Navigate to="/staff" />
                : <Auth />
              : <Auth />
          }
        />

        {/* ADMIN */}

        <Route path="/admin/*" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>

          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="meals" element={<MealPlanning />} />
          <Route path="attendance" element={<AttendanceReport />} />
          <Route path="billing" element={<BillingOverview />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="vendors" element={<VendorManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="announcements" element={<Announcements />} />

        </Route>

        {/* STUDENT */}

        <Route path="/student/*" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>

          <Route index element={<StudentDashboard />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="billing" element={<StudentBilling />} />
          <Route path="profile" element={<StudentProfile />} />

        </Route>

        {/* STAFF */}

        <Route path="/staff/*" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>

          <Route index element={<StaffDashboard />} />
          <Route path="attendance" element={<StaffAttendance />} />
          <Route path="billing" element={<StaffBilling />} />
          <Route path="meals" element={<StaffMeals />} />
          <Route path="announcements" element={<StaffAnnouncements />} />

        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </Router>
  );
}

export default App;