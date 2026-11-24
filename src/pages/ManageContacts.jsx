
import { useEffect, useState } from "react";
import "./ManageContacts.css";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/submissions"
  : "https://nurture-grow-backend.onrender.com/api/submissions";

function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getResponseData = async (response) => {
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      throw new Error("Invalid server response. Please check backend.");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    return data;
  };

  const fetchContacts = async () => {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      setMessage("Please login again to view messages.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `${API_URL}/contact-messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await getResponseData(response);
      setContacts(data);
    } catch (error) {
      console.error("Contact fetch error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleReadStatus = async (submission) => {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/contact-messages/${submission._id}/read`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isRead: !submission.isRead,
          }),
        }
      );

      await getResponseData(response);

      setContacts((previous) =>
        previous.map((entry) =>
          entry._id === submission._id
            ? { ...entry, isRead: !submission.isRead }
            : entry
        )
      );
    } catch (error) {
      console.error("Contact read status error:", error);
      setMessage(error.message);
    }
  };

  const handleDelete = async (submission) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/contact-messages/${submission._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getResponseData(response);

      setContacts((previous) =>
        previous.filter((entry) => entry._id !== submission._id)
      );
    } catch (error) {
      console.error("Contact delete error:", error);
      setMessage(error.message);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="manage-contacts">
      <div className="contacts-page-header">
        <div>
          <h2>Contact Messages</h2>
          <p>View and manage messages received from the website.</p>
        </div>

        <button
          type="button"
          onClick={fetchContacts}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {message && <p className="contacts-message">{message}</p>}

      {loading ? (
        <p>Loading contact messages...</p>
      ) : contacts.length === 0 ? (
        <p className="contacts-empty">No contact messages found.</p>
      ) : (
        <div className="contacts-grid">
          {contacts.map((submission) => (
            <article
              className={`contact-card ${
                submission.isRead ? "is-read" : "is-unread"
              }`}
              key={submission._id}
            >
              <div className="contact-card-header">
                <span>{submission.isRead ? "Read" : "Unread"}</span>
                <small>{formatDate(submission.createdAt)}</small>
              </div>

              <div className="contact-details">
                <p><strong>Name:</strong> {submission.name}</p>
                <p><strong>Email:</strong> {submission.email}</p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {submission.phone || "Not provided"}
                </p>
                <p><strong>Message:</strong> {submission.message}</p>
              </div>

              <div className="contact-actions">
                <button
                  type="button"
                  onClick={() => handleReadStatus(submission)}
                >
                  Mark as {submission.isRead ? "Unread" : "Read"}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(submission)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageContacts;
