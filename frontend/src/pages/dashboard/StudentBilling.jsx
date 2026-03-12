import { useEffect, useState } from "react";
import api from "../../services/api";

function StudentBilling() {

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem("student_id");

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {

    try {

      const res = await api.get(`/student-billing/${studentId}`);

      if (Array.isArray(res.data)) {
        setBills(res.data);
      } else {
        setBills([]);
      }

    } catch (error) {

      console.error("Billing fetch error", error);
      setBills([]);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="admin-container">
        <h2>Loading billing...</h2>
      </div>
    );
  }

  return (

    <div className="admin-container">

      <h1>My Billing</h1>

      {bills.length === 0 ? (

        <p>No billing records</p>

      ) : (

        <table className="data-table">

          <thead>
            <tr>
              <th>Month</th>
              <th>Total Meals</th>
              <th>Bill Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {bills.map((b) => (

              <tr key={b.id}>
                <td>{b.month}</td>
                <td>{b.total_meals}</td>
                <td>₹{b.bill_amount}</td>
                <td>{b.payment_status}</td>
              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}

export default StudentBilling;