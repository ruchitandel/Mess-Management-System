import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../styles/dashboard.css";

function DashboardLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  const roleId = localStorage.getItem("role_id");

  const role =
    roleId === "1" ? "admin"
    : roleId === "2" ? "student"
    : roleId === "3" ? "staff"
    : null;

  useEffect(() => {
    if (!roleId) {
      navigate("/auth");
    }
  }, [roleId, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2 className="logo">Mess System</h2>

        {/* ================= ADMIN ================= */}

        {role === "admin" && (
          <ul>

            <li className={location.pathname === "/admin" ? "active" : ""}
                onClick={() => navigate("/admin")}>
              Dashboard
            </li>

            <li className={isActive("/admin/users") ? "active" : ""}
                onClick={() => navigate("/admin/users")}>
              User Management
            </li>

            <li className={isActive("/admin/meals") ? "active" : ""}
                onClick={() => navigate("/admin/meals")}>
              Meal Planning
            </li>

            <li className={isActive("/admin/attendance") ? "active" : ""}
                onClick={() => navigate("/admin/attendance")}>
              Attendance
            </li>

            <li className={isActive("/admin/billing") ? "active" : ""}
                onClick={() => navigate("/admin/billing")}>
              Billing
            </li>

            <li className={isActive("/admin/inventory") ? "active" : ""}
                onClick={() => navigate("/admin/inventory")}>
              Inventory
            </li>

            <li className={isActive("/admin/vendors") ? "active" : ""}
                onClick={() => navigate("/admin/vendors")}>
              Vendors
            </li>

            <li className={isActive("/admin/reports") ? "active" : ""}
                onClick={() => navigate("/admin/reports")}>
              Reports
            </li>

            <li className={isActive("/admin/announcements") ? "active" : ""}
                onClick={() => navigate("/admin/announcements")}>
              Announcements
            </li>

            <li className="logout" onClick={handleLogout}>
              Logout
            </li>

          </ul>
        )}

        {/* ================= STUDENT ================= */}

        {role === "student" && (
          <ul>

            <li className={isActive("/student") ? "active" : ""}
                onClick={() => navigate("/student")}>
              Dashboard
            </li>

            <li className={isActive("/student/attendance") ? "active" : ""}
                onClick={() => navigate("/student/attendance")}>
              Attendance
            </li>

            <li className={isActive("/student/billing") ? "active" : ""}
                onClick={() => navigate("/student/billing")}>
              Billing
            </li>

            <li className={isActive("/student/profile") ? "active" : ""}
                onClick={() => navigate("/student/profile")}>
              Profile
            </li>

            <li className="logout" onClick={handleLogout}>
              Logout
            </li>

          </ul>
        )}

        {/* ================= STAFF ================= */}

        {role === "staff" && (
          <ul>

            <li className={isActive("/staff") ? "active" : ""}
                onClick={() => navigate("/staff")}>
              Dashboard
            </li>

            <li className={isActive("/staff/attendance") ? "active" : ""}
                onClick={() => navigate("/staff/attendance")}>
              Attendance
            </li>

            <li className={isActive("/staff/billing") ? "active" : ""}
                onClick={() => navigate("/staff/billing")}>
              Billing
            </li>

            <li className={isActive("/staff/meals") ? "active" : ""}
                onClick={() => navigate("/staff/meals")}>
              Meals
            </li>

            <li className={isActive("/staff/announcements") ? "active" : ""}
                onClick={() => navigate("/staff/announcements")}>
              Announcements
            </li>

            <li className="logout" onClick={handleLogout}>
              Logout
            </li>

          </ul>
        )}

      </aside>

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;