import { useEffect, useState } from "react";
import "./ManageEvents.css";

const API_URL = "https://nurture-grow-backend.onrender.com/api/events";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    imageUrl: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = sessionStorage.getItem("adminToken");

  const fetchEvents = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save event");
      }

      setMessage(
        editingId
          ? "Event updated successfully!"
          : "Event added successfully!"
      );

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        imageUrl: "",
      });

      setEditingId(null);
      await fetchEvents();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);

    setFormData({
      title: event.title,
      description: event.description,
      date: event.date ? event.date.slice(0, 10) : "",
      time: event.time,
      location: event.location,
      imageUrl: event.imageUrl || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
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
        throw new Error(data.message || "Failed to delete event");
      }

      setMessage("Event deleted successfully!");
      await fetchEvents();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      imageUrl: "",
    });
    setMessage("");
  };

  return (
    <div className="manage-events">

      <h2>Manage School Events</h2>

      {/* EVENT FORM */}
      <form className="event-form" onSubmit={handleSubmit}>

        <h3>{editingId ? "Edit Event" : "Add New Event"}</h3>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Event Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Event Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="imageUrl"
          placeholder="Event Image URL (optional)"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editingId
            ? "Update Event"
            : "Add Event"}
        </button>

        {editingId && (
          <button
            type="button"
            className="event-cancel-btn"
            onClick={cancelEdit}
          >
            Cancel Edit
          </button>
        )}

        {message && <p className="event-message">{message}</p>}

      </form>

      {/* EVENTS LIST */}
      <div className="admin-events-list">

        <h3>All Events ({events.length})</h3>

        {events.length === 0 ? (
          <p>No events added yet.</p>
        ) : (
          events.map((event) => (
            <div className="admin-event-card" key={event._id}>

              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                />
              )}

              <div className="admin-event-info">
                <h4>{event.title}</h4>

                <p>{event.description}</p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString("en-IN")}
                </p>

                <p>
                  <strong>Time:</strong> {event.time}
                </p>

                <p>
                  <strong>Location:</strong> {event.location}
                </p>

                <div className="admin-event-actions">
                  <button
                    onClick={() => handleEdit(event)}
                    className="event-edit-btn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(event._id)}
                    className="event-delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default ManageEvents;