
import { useEffect, useState } from "react";
import "./ManageAdmissions.css";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/submissions"
  : "https://nurture-grow-backend.onrender.com/api/submissions";

function ManageAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getToken = () => sessionStorage.getItem("adminToken");

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

  const fetchAdmissions = async () => {
    const token = getToken();

    if (!token) {
      setMessage("Please login again to view admissions.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `${API_URL}/admission-enquiries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await getResponseData(response);
      setAdmissions(data);
    } catch (error) {
      console.error("Admissions fetch error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleReadStatus = async (submission) => {
    const token = getToken();

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/admission-enquiries/${submission._id}/read`,
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

      setAdmissions((previous) =>
        previous.map((entry) =>
          entry._id === submission._id
            ? { ...entry, isRead: !submission.isRead }
            : entry
        )
      );
    } catch (error) {
      console.error("Read status update error:", error);
      setMessage(error.message);
    }
  };

  const handleDelete = async (submission) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admission enquiry?"
    );

    if (!confirmDelete) return;

    const token = getToken();

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/admission-enquiries/${submission._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getResponseData(response);

      setAdmissions((previous) =>
        previous.filter((entry) => entry._id !== submission._id)
      );
    } catch (error) {
      console.error("Admission delete error:", error);
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
    <div className="manage-admissions">
      <div className="admissions-page-header">
        <div>
          <h2>Admission Enquiries</h2>
          <p>View and manage admission enquiries received from parents.</p>
        </div>

        <button
          type="button"
          onClick={fetchAdmissions}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {message && <p className="admissions-message">{message}</p>}

      {loading ? (
        <p>Loading admission enquiries...</p>
      ) : admissions.length === 0 ? (
        <p className="admissions-empty">No admission enquiries found.</p>
      ) : (
        <div className="admissions-grid">
          {admissions.map((submission) => (
            <article
              className={`admission-card ${
                submission.isRead ? "is-read" : "is-unread"
              }`}
              key={submission._id}
            >
              <div className="admission-card-header">
                <span>{submission.isRead ? "Read" : "Unread"}</span>
                <small>{formatDate(submission.createdAt)}</small>
              </div>

              <div className="admission-details">
                <p><strong>Parent:</strong> {submission.parentName}</p>
                <p><strong>Student:</strong> {submission.studentName}</p>
                <p><strong>Email:</strong> {submission.email}</p>
                <p><strong>Phone:</strong> {submission.phone}</p>
                <p><strong>Class:</strong> {submission.class}</p>
                <p>
                  <strong>Message:</strong>{" "}
                  {submission.message || "No message"}
                </p>
              </div>

              <div className="admission-actions">
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

export default ManageAdmissions;
