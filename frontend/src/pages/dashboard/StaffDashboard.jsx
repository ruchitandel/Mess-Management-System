import React from "react";

function StaffDashboard() {
  return (
    <div className="dashboard-page">
      <h1>Staff Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Meals Prepared Today</h3>
          <p>350</p>
        </div>

        <div className="stat-card">
          <h3>Inventory Status</h3>
          <p>Stable</p>
        </div>

        <div className="stat-card">
          <h3>Tasks Assigned</h3>
          <p>5</p>
        </div>

        <div className="stat-card">
          <h3>Suppliers Active</h3>
          <p>12</p>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;