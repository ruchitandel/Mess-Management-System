import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/dashboard.css";

function StudentDashboard() {

  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      console.error("Student ID not found in localStorage");
      setLoading(false);
      return;
    }

    fetchDashboard(studentId);

  }, []);

  const fetchDashboard = async (studentId) => {

    try {

      const res = await api.get(`/student-dashboard/${studentId}`);

      setStudentData(res.data);

    } catch (error) {

      console.error("Failed to load student dashboard", error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="admin-container">
        <h2>Loading student dashboard...</h2>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="admin-container">
        <h2>Student data not found</h2>
      </div>
    );
  }

  const attendancePercentage = Math.min(
    (studentData.attendance_days / 30) * 100,
    100
  );

  return (

    <div className="admin-container">

      <h1>Student Dashboard</h1>

      {studentData.status === "Pending" && (
        <div className="alert danger">
          ⚠ Your payment of ₹{studentData.total_bill} is pending
        </div>
      )}

      <div className="billing-summary">

        <div className="summary-card">
          <h3>Name</h3>
          <p>{studentData.name}</p>
        </div>

        <div className="summary-card">
          <h3>Attendance</h3>
          <p>{studentData.attendance_days} Days</p>
        </div>

        <div className="summary-card">
          <h3>Total Bill</h3>
          <p>₹{studentData.total_bill}</p>
        </div>

        <div className="summary-card">
          <h3>Status</h3>

          {studentData.status === "Paid" ? (
            <span className="status-badge ok">Paid</span>
          ) : (
            <span className="status-badge low">Pending</span>
          )}

        </div>

      </div>

      <div style={{ marginTop: "40px" }}>

        <h2>Monthly Attendance Progress</h2>

        <div
          style={{
            background: "#eee",
            borderRadius: "10px",
            overflow: "hidden",
            height: "20px"
          }}
        >

          <div
            style={{
              width: `${attendancePercentage}%`,
              background: "#ff6b35",
              height: "100%"
            }}
          />

        </div>

        <p style={{ marginTop: "10px" }}>
          {attendancePercentage.toFixed(0)}% of monthly attendance completed
        </p>

      </div>

    </div>
  );
}

export default StudentDashboard;