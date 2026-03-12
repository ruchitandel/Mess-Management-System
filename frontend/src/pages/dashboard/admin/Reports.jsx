import { useSystem } from "../../../context/SystemContext";
import "../../../styles/dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

function Reports() {
  const { students, inventory, totalRevenue, totalPending } = useSystem();

  /* ===== DATA PREPARATION ===== */

  const revenueData = [
    { name: "Revenue", amount: totalRevenue },
    { name: "Pending", amount: totalPending },
  ];

  const attendanceData = students.map((s) => ({
    name: s.name,
    attendance: s.attendance,
  }));

  const inventoryData = inventory.map((item) => ({
    name: item.name,
    quantity: item.quantity,
  }));

  return (
    <div className="admin-container">
      <h1>Reports & Analytics</h1>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="billing-summary">
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>

        <div className="summary-card pending">
          <h3>Pending Amount</h3>
          <p>₹{totalPending}</p>
        </div>

        <div className="summary-card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <div className="summary-card">
          <h3>Inventory Items</h3>
          <p>{inventory.length}</p>
        </div>
      </div>

      {/* ===== CHARTS SECTION ===== */}
      <div style={{ marginTop: "40px" }}>

        {/* Revenue Chart */}
        <div style={{ height: 300, marginBottom: 50 }}>
          <h2>Financial Overview</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#ff6b35" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Chart */}
        <div style={{ height: 300, marginBottom: 50 }}>
          <h2>Student Attendance</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#2ecc71"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Chart */}
        <div style={{ height: 300 }}>
          <h2>Inventory Stock Levels</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Reports;