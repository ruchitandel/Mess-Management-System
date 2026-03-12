import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/dashboard.css";

function StudentAttendance() {

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem("student_id");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {

    try {

      const res = await api.get(`/student-attendance/${studentId}`);

      if (Array.isArray(res.data)) {
        setAttendance(res.data);
      } else {
        setAttendance([]);
      }

    } catch (error) {

      console.error("Attendance fetch error", error);
      setAttendance([]);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="admin-container">
        <h2>Loading attendance...</h2>
      </div>
    );
  }

  return (

    <div className="admin-container">

      <h1>My Attendance</h1>

      {attendance.length === 0 ? (

        <p>No attendance records</p>

      ) : (

        <table className="data-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Meal</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {attendance.map((a) => (

              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.meal_id}</td>
                <td>{a.date}</td>
              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}

export default StudentAttendance;