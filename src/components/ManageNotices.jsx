import { useEffect, useState } from "react";
import "./ManageNotices.css";

const API_URL = "https://nurture-grow-backend.onrender.com/api/notices";

const initialForm = {
  title: "",
  category: "Important",
  description: "",
  noticeDate: "",
  expiryDate: "",
};

function ManageNotices() {
  const [form, setForm] = useState(initialForm);
  const [notices, setNotices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchNotices = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch notices");
      }

      setNotices(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          expiryDate: form.expiryDate || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save notice");
      }

      setMessage(
        editingId
          ? "Notice updated successfully!"
          : "Notice added successfully!"
      );

      setForm(initialForm);
      setEditingId(null);
      await fetchNotices();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (notice) => {
    setEditingId(notice._id);

    setForm({
      title: notice.title,
      category: notice.category,
      description: notice.description,
      noticeDate: notice.noticeDate
        ? new Date(notice.noticeDate).toISOString().split("T")[0]
        : "",
      expiryDate: notice.expiryDate
        ? new Date(notice.expiryDate).toISOString().split("T")[0]
        : "",
    });

    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
    setMessage("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete notice");
      }

      if (editingId === id) {
        handleCancelEdit();
      }

      setMessage("Notice deleted successfully!");
      await fetchNotices();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="manage-notices">
      <div className="manage-notices-heading">
        <h3>Manage Notice Board</h3>
        <p>Add important announcements for parents.</p>
      </div>

      <form className="notice-form" onSubmit={handleSubmit}>
        <div className="notice-form-group">
          <label>Notice Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter notice title"
            required
          />
        </div>

        <div className="notice-form-group">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="Holiday">Holiday</option>
            <option value="Circular">Circular</option>
            <option value="School Timings">School Timings</option>
            <option value="Important">Important</option>
          </select>
        </div>

        <div className="notice-form-group">
          <label>Notice Details</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write the announcement details"
            rows="4"
            required
          />
        </div>

        <div className="notice-form-row">
          <div className="notice-form-group">
            <label>Notice Date</label>
            <input
              type="date"
              name="noticeDate"
              value={form.noticeDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="notice-form-group">
            <label>Expiry Date (Optional)</label>
            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              min={form.noticeDate || undefined}
            />
          </div>
        </div>

        <div className="notice-form-actions">
          <button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : editingId
                ? "Update Notice"
                : "Add Notice"}
          </button>

          {editingId && (
            <button
              type="button"
              className="notice-cancel-btn"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {message && <p className="notice-admin-message">{message}</p>}

      <div className="notice-admin-list">
        <h4>Published Notices ({notices.length})</h4>

        {notices.length === 0 ? (
          <p className="notice-admin-empty">No notices added yet.</p>
        ) : (
          <div className="notice-admin-grid">
            {notices.map((notice) => (
              <article className="notice-admin-card" key={notice._id}>
                <span className="notice-admin-category">
                  {notice.category}
                </span>

                <h4>{notice.title}</h4>

                <p className="notice-admin-description">
                  {notice.description}
                </p>

                <p>
                  <strong>Notice date:</strong>{" "}
                  {formatDate(notice.noticeDate)}
                </p>

                <p>
                  <strong>Expiry:</strong>{" "}
                  {formatDate(notice.expiryDate)}
                </p>

                <div className="notice-admin-buttons">
                  <button onClick={() => handleEdit(notice)}>
                    Edit
                  </button>

                  <button
                    className="notice-admin-delete"
                    onClick={() => handleDelete(notice._id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ManageNotices;