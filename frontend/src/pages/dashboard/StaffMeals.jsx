import "../../styles/dashboard.css";

function StaffMeals() {

  const meals = [
    { id: 1, name: "Breakfast", type: "Veg" },
    { id: 2, name: "Lunch", type: "Veg" },
    { id: 3, name: "Dinner", type: "Veg" }
  ];

  return (

    <div className="admin-container">

      <h1>Meal Schedule</h1>

      <div className="table-container">

        <table className="data-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Meal Name</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>

            {meals.map((m, index) => (

              <tr key={m.id}>
                <td>{index + 1}</td>
                <td>{m.name}</td>
                <td>{m.type}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default StaffMeals;