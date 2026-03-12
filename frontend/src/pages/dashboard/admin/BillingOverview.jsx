import { useEffect, useState } from "react";
import api from "../../../services/api";
import "../../../styles/dashboard.css";

function BillingOverview() {

  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {

    try {

      const res = await api.get("/billing");

      setBills(res.data);

    } catch (err) {

      console.error("Failed to fetch bills", err);

    }

  };

  const markAsPaid = async (id) => {

    try {

      await api.put(`/billing/pay/${id}?payment_mode=cash`);

      fetchBills();

    } catch (err) {

      console.error("Payment failed", err);

    }

  };

  const totalRevenue = bills
    .filter(b => b.status === "Paid")
    .reduce((sum, b) => sum + b.total_bill, 0);

  const totalPending = bills
    .filter(b => b.status === "Pending")
    .reduce((sum, b) => sum + b.total_bill, 0);

  return (

    <div className="admin-container">

      <div className="admin-header">
        <h1>Billing Overview</h1>
      </div>

      <div className="billing-summary">

        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>

        <div className="summary-card pending">
          <h3>Pending Amount</h3>
          <p>₹{totalPending}</p>
        </div>

      </div>

      <table className="admin-table">

        <thead>
          <tr>
            <th>Student</th>
            <th>Attendance Days</th>
            <th>Cost / Day</th>
            <th>Total Bill</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {bills.map((bill) => (

            <tr key={bill.id}>

              <td>{bill.student}</td>
              <td>{bill.attendance_days}</td>
              <td>₹{bill.cost_per_day}</td>
              <td>₹{bill.total_bill}</td>

              <td>

                {bill.status === "Paid"
                  ? <span className="status-badge ok">Paid</span>
                  : <span className="status-badge low">Unpaid</span>
                }

              </td>

              <td>

                {bill.status === "Pending" && (

                  <button
                    className="primary-btn"
                    onClick={() => markAsPaid(bill.id)}
                  >

                    Mark as Paid

                  </button>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default BillingOverview;