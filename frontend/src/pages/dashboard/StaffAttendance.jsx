import "../../styles/dashboard.css";

function StaffAttendance() {

  const attendance = [
    {
      id: 1,
      student_name: "Ruchi Tandel",
      meal_name: "Lunch",
      date: "19 Feb 2026"
    },
    {
      id: 2,
      student_name: "Rahul Patel",
      meal_name: "Dinner",
      date: "19 Feb 2026"
    },
    {
      id: 3,
      student_name: "Priya Shah",
      meal_name: "Breakfast",
      date: "19 Feb 2026"
    }
  ];

  return (
    <div className="admin-container">

      <h1>Attendance Records</h1>

      <div className="table-container">

        <table className="data-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Meal</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {attendance.map((a, index) => (

              <tr key={a.id}>
                <td>{index + 1}</td>
                <td>{a.student_name}</td>
                <td>{a.meal_name}</td>
                <td>{a.date}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );

}

export default StaffAttendance;