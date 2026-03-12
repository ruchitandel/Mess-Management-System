import "../../styles/dashboard.css";

function StaffBilling() {

  const bills = [
    {
      id: 1,
      student_name: "Ruchi Tandel",
      total_meals: 25,
      bill_amount: 1500,
      status: "Paid"
    },
    {
      id: 2,
      student_name: "Rahul Patel",
      total_meals: 18,
      bill_amount: 1080,
      status: "Pending"
    },
    {
      id: 3,
      student_name: "Priya Shah",
      total_meals: 22,
      bill_amount: 1320,
      status: "Paid"
    }
  ];

  return (

    <div className="admin-container">

      <h1>Billing Records</h1>

      <div className="table-container">

        <table className="data-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Total Meals</th>
              <th>Bill Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {bills.map((b, index) => (

              <tr key={b.id}>
                <td>{index + 1}</td>
                <td>{b.student_name}</td>
                <td>{b.total_meals}</td>
                <td>₹{b.bill_amount}</td>
                <td>{b.status}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default StaffBilling;