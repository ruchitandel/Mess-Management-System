import { useState } from "react";
import { useSystem } from "../../../context/SystemContext";
import "../../../styles/dashboard.css";

function VendorManagement() {
  const { vendors, setVendors } = useSystem();

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    status: "Active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setVendors(
        vendors.map((vendor) =>
          vendor.id === editId ? { ...vendor, ...formData } : vendor
        )
      );
    } else {
      const newVendor = {
        id: Date.now(),
        ...formData,
      };
      setVendors([...vendors, newVendor]);
    }

    setShowModal(false);
    setEditId(null);
    setFormData({ name: "", contact: "", status: "Active" });
  };

  const handleEdit = (vendor) => {
    setFormData(vendor);
    setEditId(vendor.id);
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = () => {
    setVendors(vendors.filter((vendor) => vendor.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Vendor Management</h1>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          + Add Vendor
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.name}</td>
              <td>{vendor.contact}</td>
              <td>{vendor.status}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(vendor)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => confirmDelete(vendor.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editId ? "Edit Vendor" : "Add Vendor"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Vendor Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                required
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

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

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this vendor?</p>

            <div className="modal-actions">
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="secondary-btn"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorManagement;