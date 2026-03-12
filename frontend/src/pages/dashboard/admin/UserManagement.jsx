import { useState, useEffect, useMemo } from "react";
import api from "../../../services/api";
import "../../../styles/dashboard.css";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role_id: "",
  });

  /* ================= FETCH USERS ================= */

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER + SEARCH + SORT ================= */

  const filteredUsers = useMemo(() => {
    let data = [...users];

    if (searchTerm) {
      data = data.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      data = data.filter(
        (user) => String(user.role_id) === roleFilter
      );
    }

    if (sortOrder === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    return data;
  }, [users, searchTerm, roleFilter, sortOrder]);

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/users/${editId}`, formData);
      } else {
        await api.post("/users/", {
          ...formData,
          phone: null,
          password: "123456", // temp password for admin created users
        });
      }

      fetchUsers();
      setShowModal(false);
      setEditId(null);
      setFormData({ name: "", email: "", role_id: "" });
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      role_id: user.role_id,
    });
    setEditId(user.id);
    setShowModal(true);
  };

  /* ================= DELETE ================= */

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/users/${deleteId}`);
      fetchUsers();
    } catch (error) {
      console.error("Delete failed:", error);
    }

    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  /* ================= ROLE NAME MAPPER ================= */

  const getRoleName = (role_id) => {
    if (role_id === 1) return "Admin";
    if (role_id === 2) return "Student";
    if (role_id === 3) return "Staff";
    return "Unknown";
  };

  if (loading) return <h2>Loading users...</h2>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>User Management</h1>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          + Add User
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div style={{ margin: "20px 0", display: "flex", gap: "15px" }}>
        <input
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="date-input"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="date-input"
        >
          <option value="all">All Roles</option>
          <option value="1">Admin</option>
          <option value="2">Student</option>
          <option value="3">Staff</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="date-input"
        >
          <option value="none">Sort by Name</option>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No users found
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{getRoleName(user.role_id)}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => openDeleteModal(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editId ? "Edit User" : "Add User"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <select
                value={formData.role_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role_id: Number(e.target.value),
                  })
                }
                required
              >
                <option value="">Select Role</option>
                <option value="1">Admin</option>
                <option value="2">Student</option>
                <option value="3">Staff</option>
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

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>

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

export default UserManagement;