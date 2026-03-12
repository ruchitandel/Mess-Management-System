import { useState, useEffect } from "react";
import api from "../../../services/api";
import "../../../styles/dashboard.css";

function AttendanceReport() {

  const [students, setStudents] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  /* ================= FETCH STUDENTS ================= */

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {

      const res = await api.get("/students/");
      const studentList = res.data || [];

      setStudents(studentList);

      loadAttendance();

    } catch (error) {

      console.error("Failed to fetch students", error);

    }
  };

  /* ================= FETCH ATTENDANCE ================= */

  const loadAttendance = async () => {

    try {

      const res = await api.get(`/attendance/date?date=${selectedDate}`);

      const map = {};

      (res.data || []).forEach(record => {
        map[record.student_id] = true;
      });

      setTodayAttendance(map);

    } catch (error) {

      console.error("Failed to fetch attendance", error);

    }

  };

  /* ================= DATE CHANGE ================= */

  useEffect(() => {

    loadAttendance();

  }, [selectedDate]);

  /* ================= TOGGLE ================= */

  const toggleAttendance = (studentId) => {

    setTodayAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));

  };

  /* ================= SAVE ATTENDANCE ================= */

  const saveAttendance = async () => {

    try {

      const presentStudents = Object.keys(todayAttendance)
        .filter(id => todayAttendance[id]);

      if (presentStudents.length === 0) {
        alert("Please mark at least one student present");
        return;
      }

      for (const studentId of presentStudents) {

        const payload = {
          student_id: Number(studentId),
          meal_id: 1,
          date: selectedDate
        };

        await api.post("/attendance/", payload);

      }

      alert("Attendance saved successfully");

      loadAttendance();

    } catch (error) {

      console.error("Attendance save failed", error);

      if (error.response?.data) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Failed to save attendance");
      }

    }

  };

  /* ================= COUNT ================= */

  const totalPresentToday =
    Object.values(todayAttendance).filter(Boolean).length;

  return (

    <div className="admin-container">

      <div className="admin-header">

        <h1>Attendance Report</h1>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-input"
        />

      </div>

      {/* SUMMARY */}

      <div className="billing-summary">

        <div className="summary-card">
          <h3>Present Today</h3>
          <p>{totalPresentToday}</p>
        </div>

        <div className="summary-card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

      </div>

      {/* TABLE */}

      <table className="admin-table">

        <thead>
          <tr>
            <th>Student</th>
            <th>Mark Present</th>
          </tr>
        </thead>

        <tbody>

          {students.map(student => (

            <tr key={student.id}>

              <td>{student.name}</td>

              <td>

                <input
                  type="checkbox"
                  checked={todayAttendance[student.id] || false}
                  onChange={() => toggleAttendance(student.id)}
                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div style={{ marginTop: "20px" }}>

        <button
          className="primary-btn"
          onClick={saveAttendance}
        >
          Save Attendance
        </button>

      </div>

    </div>

  );

}

export default AttendanceReport;