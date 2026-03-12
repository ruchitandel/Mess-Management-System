import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import api from "../../services/api";
import "../../styles/dashboard.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function AdminDashboard() {

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_students: 0,
    today_attendance: 0,
    monthly_revenue: 0,
    low_stock_items: 0,
    pending_bills: 0
  });

  const [inventory, setInventory] = useState([]);
  const [bills, setBills] = useState([]);

  const COLORS = ["#ff6b35", "#2ecc71", "#3498db", "#9b59b6", "#f1c40f"];

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const dashboard = await api.get("/dashboard/overview");
      setStats(dashboard.data);   // ✅ FIXED HERE

      const inventoryRes = await api.get("/inventory/");
      setInventory(inventoryRes.data);

      const billingRes = await api.get("/billing/");
      setBills(billingRes.data);

    } catch (err) {

      console.error("Dashboard load failed", err);

    }

    setLoading(false);

  };

  if (loading) return <Loader />;

  /* ================= CHART DATA ================= */

  const revenueData = bills.map(b => ({
    name: b.student,
    revenue: b.total_bill
  }));

  const attendanceData = bills.map(b => ({
    name: b.student,
    attendance: b.attendance_days
  }));

  const inventoryPieData = inventory.map(item => ({
    name: item.item_name,
    value: item.quantity * (item.price || 0)
  }));

  const pendingAmount = bills
    .filter(b => b.status === "Pending")
    .reduce((sum, b) => sum + b.total_bill, 0);

  const lowStockItems = inventory.filter(item => item.quantity < 30);

  return (

    <div className="admin-container">

      <h1>Admin Dashboard</h1>

      {/* ALERTS */}

      <div className="alert-section">

        {lowStockItems.length > 0 && (
          <div className="alert warning">
            ⚠ {lowStockItems.length} inventory items are low in stock
          </div>
        )}

        {pendingAmount > 0 && (
          <div className="alert danger">
            💰 ₹{pendingAmount} pending payments
          </div>
        )}

      </div>

      {/* SUMMARY CARDS */}

      <div className="billing-summary">

        <div className="summary-card">
          <h3>Total Students</h3>
          <p>{stats.total_students}</p>
        </div>

        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p>₹{stats.monthly_revenue}</p>
        </div>

        <div className="summary-card">
          <h3>Pending Amount</h3>
          <p>₹{pendingAmount}</p>
        </div>

        <div className="summary-card">
          <h3>Low Stock Items</h3>
          <p>{stats.low_stock_items}</p>
        </div>

      </div>

      {/* REVENUE CHART */}

      <div style={{ marginTop: "50px" }}>
        <h2>Revenue Per Student</h2>

        <div style={{ width: "100%", height: 350 }}>

          <ResponsiveContainer>

            <BarChart data={revenueData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar dataKey="revenue" fill="#ff6b35" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ATTENDANCE CHART */}

      <div style={{ marginTop: "60px" }}>
        <h2>Attendance Comparison</h2>

        <div style={{ width: "100%", height: 350 }}>

          <ResponsiveContainer>

            <BarChart data={attendanceData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar dataKey="attendance" fill="#2ecc71" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* INVENTORY PIE */}

      <div style={{ marginTop: "60px" }}>

        <h2>Inventory Value Distribution</h2>

        <div style={{ width: "100%", height: 400 }}>

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={inventoryPieData}
                cx="50%"
                cy="50%"
                outerRadius={140}
                dataKey="value"
                label
              >

                {inventoryPieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;