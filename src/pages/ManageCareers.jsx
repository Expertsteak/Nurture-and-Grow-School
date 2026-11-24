
import { useEffect, useState } from "react";
import "./ManageCareers.css";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/submissions"
  : "https://nurture-grow-backend.onrender.com/api/submissions";

function ManageCareers() {
  const [careers, setCareers] = useState([]);
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

  const fetchCareers = async () => {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      setMessage("Please login again to view applications.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `${API_URL}/career-applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await getResponseData(response);
      setCareers(data);
    } catch (error) {
      console.error("Career fetch error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleReadStatus = async (submission) => {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/career-applications/${submission._id}/read`,
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

      setCareers((previous) =>
        previous.map((entry) =>
          entry._id === submission._id
            ? { ...entry, isRead: !submission.isRead }
            : entry
        )
      );
    } catch (error) {
      console.error("Career read status error:", error);
      setMessage(error.message);
    }
  };

  const handleDelete = async (submission) => {
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }

    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/career-applications/${submission._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getResponseData(response);

      setCareers((previous) =>
        previous.filter((entry) => entry._id !== submission._id)
      );
    } catch (error) {
      console.error("Career delete error:", error);
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
    <div className="manage-careers">
      <div className="careers-page-header">
        <div>
          <h2>Career Applications</h2>
          <p>View and manage applications received from candidates.</p>
        </div>

        <button
          type="button"
          onClick={fetchCareers}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {message && <p className="careers-message">{message}</p>}

      {loading ? (
        <p>Loading career applications...</p>
      ) : careers.length === 0 ? (
        <p className="careers-empty">No career applications found.</p>
      ) : (
        <div className="careers-grid">
          {careers.map((submission) => (
            <article
              className={`career-card ${
                submission.isRead ? "is-read" : "is-unread"
              }`}
              key={submission._id}
            >
              <div className="career-card-header">
                <span>{submission.isRead ? "Read" : "Unread"}</span>
                <small>{formatDate(submission.createdAt)}</small>
              </div>

              <div className="career-details">
                <p><strong>Name:</strong> {submission.fullName}</p>
                <p><strong>Email:</strong> {submission.email}</p>
                <p><strong>Phone:</strong> {submission.phone}</p>
                <p><strong>Qualification:</strong> {submission.qualification}</p>
                <p><strong>Experience:</strong> {submission.experience}</p>
                <p><strong>Position:</strong> {submission.position}</p>
              </div>

              <div className="career-actions">
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

export default ManageCareers;
