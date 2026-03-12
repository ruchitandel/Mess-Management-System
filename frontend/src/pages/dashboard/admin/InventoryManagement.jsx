import { useState, useMemo, useEffect } from "react";
import api from "../../../services/api";
import "../../../styles/dashboard.css";

function InventoryManagement() {

  const [inventory, setInventory] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
    price: ""
  });

  /* ================= FETCH INVENTORY ================= */

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {

    try {

      const res = await api.get("/inventory/");

      const formatted = res.data.map(item => ({
        id: item.id,
        name: item.item_name,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price || 0
      }));

      setInventory(formatted);

    } catch (err) {

      console.error("Failed to fetch inventory", err);

    }

  };

  /* ================= FILTER + SEARCH + SORT ================= */

  const filteredInventory = useMemo(() => {

    let data = [...inventory];

    if (searchTerm) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showLowStockOnly) {
      data = data.filter((item) => item.quantity < 30);
    }

    if (sortOrder === "asc") {
      data.sort((a, b) => a.quantity - b.quantity);
    }

    if (sortOrder === "desc") {
      data.sort((a, b) => b.quantity - a.quantity);
    }

    return data;

  }, [inventory, searchTerm, showLowStockOnly, sortOrder]);

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await api.put(`/inventory/${editId}`, {
          item_name: formData.name,
          quantity: Number(formData.quantity),
          unit: formData.unit
        });

      } else {

        await api.post("/inventory/", {
          item_name: formData.name,
          quantity: Number(formData.quantity),
          unit: formData.unit,
          price: Number(formData.price)
        });

      }

      fetchInventory();

      setShowModal(false);
      setEditId(null);

      setFormData({
        name: "",
        quantity: "",
        unit: "",
        price: ""
      });

    } catch (err) {

      console.error("Save failed", err);

    }

  };

  const handleEdit = (item) => {

    setFormData(item);
    setEditId(item.id);
    setShowModal(true);

  };

  /* ================= DELETE ================= */

  const openDeleteModal = (id) => {

    setDeleteId(id);
    setShowDeleteModal(true);

  };

  const confirmDelete = async () => {

    try {

      await api.delete(`/inventory/${deleteId}`);

      fetchInventory();

      setShowDeleteModal(false);
      setDeleteId(null);

    } catch (err) {

      console.error("Delete failed", err);

    }

  };

  const cancelDelete = () => {

    setShowDeleteModal(false);
    setDeleteId(null);

  };

  /* ================= CALCULATIONS ================= */

  const totalStockValue = inventory.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const lowStockItems = inventory.filter(item => item.quantity < 30);

  /* ================= UI ================= */

  return (
    <div className="admin-container">

      <div className="admin-header">
        <h1>Inventory Management</h1>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          + Add Item
        </button>
      </div>

      {/* SUMMARY */}

      <div className="billing-summary">

        <div className="summary-card">
          <h3>Total Stock Value</h3>
          <p>₹{totalStockValue}</p>
        </div>

        <div className="summary-card pending">
          <h3>Low Stock Items</h3>
          <p>{lowStockItems.length}</p>
        </div>

      </div>

      {/* CONTROLS */}

      <div style={{ margin: "20px 0", display: "flex", gap: "15px", flexWrap: "wrap" }}>

        <input
          type="text"
          placeholder="Search item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="date-input"
        />

        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <input
            type="checkbox"
            checked={showLowStockOnly}
            onChange={() => setShowLowStockOnly(!showLowStockOnly)}
          />
          Show Low Stock Only
        </label>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="date-input"
        >

          <option value="none">Sort by Quantity</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>

        </select>

      </div>

      {/* TABLE */}

      <table className="admin-table">

        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price / Unit</th>
            <th>Total Value</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredInventory.map(item => {

            const total = item.quantity * item.price;
            const isLow = item.quantity < 30;

            return (

              <tr key={item.id} className={isLow ? "low-stock" : ""}>

                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>₹{item.price}</td>
                <td>₹{total}</td>

                <td>
                  {isLow
                    ? <span className="status-badge low">Low Stock</span>
                    : <span className="status-badge ok">In Stock</span>}
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => openDeleteModal(item.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>{editId ? "Edit Item" : "Add Item"}</h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                placeholder="Item Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Unit"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Price per Unit"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />

              <div className="modal-actions">

                <button type="submit" className="primary-btn">
                  {editId ? "Update" : "Create"}
                </button>

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* DELETE MODAL */}

      {showDeleteModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>Confirm Deletion</h2>

            <p>Are you sure you want to delete this item?</p>

            <div className="modal-actions">

              <button className="delete-btn" onClick={confirmDelete}>
                Yes, Delete
              </button>

              <button className="secondary-btn" onClick={cancelDelete}>
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );

}

export default InventoryManagement;