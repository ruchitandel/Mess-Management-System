import { useState } from "react";
import { useSystem } from "../../../context/SystemContext";
import "../../../styles/dashboard.css";

function Announcements() {
  const { announcements, setAnnouncements } = useSystem();

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setAnnouncements(
        announcements.map((a) =>
          a.id === editId ? { ...a, ...formData } : a
        )
      );
    } else {
      setAnnouncements([
        ...announcements,
        { id: Date.now(), ...formData },
      ]);
    }

    setShowModal(false);
    setEditId(null);
    setFormData({ title: "", message: "", date: "" });
  };

  const handleEdit = (announcement) => {
    setFormData(announcement);
    setEditId(announcement.id);
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = () => {
    setAnnouncements(
      announcements.filter((a) => a.id !== deleteId)
    );
    setDeleteId(null);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Announcements</h1>
        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Create Announcement
        </button>
      </div>

      <div className="meal-grid">
        {announcements.map((a) => (
          <div key={a.id} className="meal-card">
            <h3>{a.title}</h3>
            <p>{a.message}</p>
            <p style={{ fontSize: "12px", opacity: 0.7 }}>
              {a.date}
            </p>

            <div className="meal-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(a)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => confirmDelete(a.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editId ? "Edit Announcement" : "Create Announcement"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                required
              />

              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                required
              />

              <textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                required
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  marginBottom: "12px",
                  border: "none",
                }}
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

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this announcement?</p>

            <div className="modal-actions">
              <button
                className="delete-btn"
                onClick={handleDelete}
              >
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

export default Announcements;