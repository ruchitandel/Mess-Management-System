import { useEffect, useState } from "react";
import api from "../../../services/api";
import "../../../styles/dashboard.css";

function MealPlanning() {

  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    meal_type: "",
    day_of_week: "",
    food_items: "",
    special_menu: "",
  });

  /* ================= FETCH MEALS ================= */

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {

    try {

      const res = await api.get("/meals/");
      setMeals(res.data || []);

    } catch (err) {

      console.error("Error fetching meals:", err);

    }

  };

  /* ================= FORM SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        meal_type: formData.meal_type,
        day_of_week: formData.day_of_week,
        food_items: formData.food_items,
        special_menu: formData.special_menu
      };

      if (editId) {

        await api.put(`/meals/${editId}`, payload);

      } else {

        await api.post("/meals/", payload);

      }

      await fetchMeals();

      closeModal();

    } catch (err) {

      console.error("Save failed:", err);

    }

  };

  /* ================= EDIT ================= */

  const handleEdit = (meal) => {

    setFormData({
      meal_type: meal.meal_type || "",
      day_of_week: meal.day_of_week || "",
      food_items: meal.food_items || "",
      special_menu: meal.special_menu || ""
    });

    setEditId(meal.id);
    setShowModal(true);

  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this meal?")) return;

    try {

      await api.delete(`/meals/${id}`);
      fetchMeals();

    } catch (err) {

      console.error("Delete failed:", err);

    }

  };

  /* ================= CLOSE MODAL ================= */

  const closeModal = () => {

    setShowModal(false);
    setEditId(null);

    setFormData({
      meal_type: "",
      day_of_week: "",
      food_items: "",
      special_menu: "",
    });

  };

  return (

    <div className="admin-container">

      <div className="admin-header">

        <h1>Weekly Meal Planning</h1>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Meal
        </button>

      </div>

      {/* ================= MEAL GRID ================= */}

      <div className="meal-grid">

        {meals.length === 0 ? (

          <p style={{ marginTop: "20px" }}>
            No meals added yet.
          </p>

        ) : (

          meals.map((meal) => (

            <div key={meal.id} className="meal-card">

              <h3>{meal.day_of_week}</h3>

              <p>
                <strong>Type:</strong> {meal.meal_type}
              </p>

              <p>
                <strong>Items:</strong> {meal.food_items}
              </p>

              {meal.special_menu && (

                <p>
                  <strong>Special:</strong> {meal.special_menu}
                </p>

              )}

              <div className="meal-actions">

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(meal)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(meal.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* ================= MODAL ================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              {editId ? "Edit Meal" : "Add Meal"}
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                placeholder="Meal Type (Breakfast/Lunch/Dinner)"
                value={formData.meal_type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    meal_type: e.target.value
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Day of Week"
                value={formData.day_of_week}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    day_of_week: e.target.value
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Food Items"
                value={formData.food_items}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    food_items: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Special Menu"
                value={formData.special_menu}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    special_menu: e.target.value
                  })
                }
              />

              <div className="modal-actions">

                <button
                  type="submit"
                  className="primary-btn"
                >
                  {editId ? "Update" : "Create"}
                </button>

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}

export default MealPlanning;