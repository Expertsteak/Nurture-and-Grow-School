
import { useEffect, useState } from "react";
import ManageEvents from "../components/ManageEvents";
import ManageNotices from "../components/ManageNotices";
import "./AdminDashboard.css";

// API URLs
const MEDIA_API = import.meta.env.DEV
  ? "http://localhost:5000/api/media"
  : "https://nurture-grow-backend.onrender.com/api/media";

const SUBMISSIONS_API = import.meta.env.DEV
  ? "http://localhost:5000/api/submissions"
  : "https://nurture-grow-backend.onrender.com/api/submissions";

// Submission sections
const submissionTypes = [
  {
    key: "admissions",
    endpoint: "admission-enquiries",
    title: "Admission Enquiries",
    type: "admissions",
  },
  {
    key: "contacts",
    endpoint: "contact-messages",
    title: "Contact Messages",
    type: "contacts",
  },
  {
    key: "careers",
    endpoint: "career-applications",
    title: "Career Applications",
    type: "careers",
  },
];

function AdminDashboard() {
  // GALLERY STATES
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Events");
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // SUBMISSION STATES
  const [submissions, setSubmissions] = useState({
    admissions: [],
    contacts: [],
    careers: [],
  });

  const [submissionsLoading, setSubmissionsLoading] = useState(true);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const getToken = () => {
    return sessionStorage.getItem("adminToken");
  };

  // HANDLE API RESPONSE
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

  // FETCH GALLERY
  const fetchMedia = async () => {
    try {
      const response = await fetch(MEDIA_API);

      const data = await getResponseData(response);
      setMedia(data);
    } catch (error) {
      console.error("Gallery fetch error:", error);
      setMessage(error.message);
    }
  };

  // FETCH ALL SUBMISSIONS
  const fetchSubmissions = async () => {
    const token = getToken();

    if (!token) {
      setSubmissionMessage("Please login again to view submissions.");
      setSubmissionsLoading(false);
      return;
    }

    try {
      setSubmissionsLoading(true);
      setSubmissionMessage("");

      const results = await Promise.all(
        submissionTypes.map(async (item) => {
          const response = await fetch(
            `${SUBMISSIONS_API}/${item.endpoint}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await getResponseData(response);

          return {
            key: item.key,
            data,
          };
        })
      );

      const updatedSubmissions = {
        admissions: [],
        contacts: [],
        careers: [],
      };

      results.forEach((item) => {
        updatedSubmissions[item.key] = item.data;
      });

      setSubmissions(updatedSubmissions);

    } catch (error) {
      console.error("Submissions fetch error:", error);
      setSubmissionMessage(error.message);
    } finally {
      setSubmissionsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    fetchSubmissions();
  }, []);

  // GALLERY UPLOAD
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image.");
      return;
    }

    const token = getToken();

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(`${MEDIA_API}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await getResponseData(response);

      setMessage(data.message || "Image uploaded successfully!");
      setTitle("");
      setCategory("Events");
      setImage(null);
      e.target.reset();

      await fetchMedia();

    } catch (error) {
      console.error("Gallery upload error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // GALLERY DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;

    const token = getToken();

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      const response = await fetch(`${MEDIA_API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await getResponseData(response);

      setMessage(data.message || "Image deleted successfully!");
      await fetchMedia();

    } catch (error) {
      console.error("Gallery delete error:", error);
      setMessage(error.message);
    }
  };

  // MARK SUBMISSION AS READ / UNREAD
  const handleReadStatus = async (item, submission) => {
    const token = getToken();

    if (!token) {
      setSubmissionMessage("Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `${SUBMISSIONS_API}/${item.endpoint}/${submission._id}/read`,
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

      setSubmissions((previous) => ({
        ...previous,
        [item.key]: previous[item.key].map((entry) =>
          entry._id === submission._id
            ? { ...entry, isRead: !submission.isRead }
            : entry
        ),
      }));

    } catch (error) {
      console.error("Read status update error:", error);
      setSubmissionMessage(error.message);
    }
  };

  // DELETE SUBMISSION
  const handleDeleteSubmission = async (item, submission) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this submission?"
    );

    if (!confirmDelete) return;

    const token = getToken();

    if (!token) {
      setSubmissionMessage("Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `${SUBMISSIONS_API}/${item.endpoint}/${submission._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getResponseData(response);

      setSubmissions((previous) => ({
        ...previous,
        [item.key]: previous[item.key].filter(
          (entry) => entry._id !== submission._id
        ),
      }));

    } catch (error) {
      console.error("Submission delete error:", error);
      setSubmissionMessage(error.message);
    }
  };

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // RENDER SUBMISSION DETAILS
  const renderSubmissionDetails = (item, submission) => {
    if (item.key === "admissions") {
      return (
        <>
          <p><strong>Parent:</strong> {submission.parentName}</p>
          <p><strong>Student:</strong> {submission.studentName}</p>
          <p><strong>Email:</strong> {submission.email}</p>
          <p><strong>Phone:</strong> {submission.phone}</p>
          <p><strong>Class:</strong> {submission.class}</p>
          <p><strong>Message:</strong> {submission.message || "No message"}</p>
        </>
      );
    }

    if (item.key === "contacts") {
      return (
        <>
          <p><strong>Name:</strong> {submission.name}</p>
          <p><strong>Email:</strong> {submission.email}</p>
          <p><strong>Phone:</strong> {submission.phone || "Not provided"}</p>
          <p><strong>Message:</strong> {submission.message}</p>
        </>
      );
    }

    return (
      <>
        <p><strong>Name:</strong> {submission.fullName}</p>
        <p><strong>Email:</strong> {submission.email}</p>
        <p><strong>Phone:</strong> {submission.phone}</p>
        <p><strong>Qualification:</strong> {submission.qualification}</p>
        <p><strong>Experience:</strong> {submission.experience}</p>
        <p><strong>Position:</strong> {submission.position}</p>
      </>
    );
  };

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Manage your school gallery, events, notices and submissions</p>
      </div>

      {/* EVENTS MANAGEMENT */}
      <ManageEvents />

      {/* NOTICE BOARD MANAGEMENT */}
      <ManageNotices />

      {/* GALLERY UPLOAD */}
      <section className="admin-upload-section">
        <h3>Upload Gallery Image</h3>

        <form className="admin-upload-form" onSubmit={handleUpload}>
          <div className="admin-form-group">
            <label>Image Title</label>
            <input
              className="admin-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Category</label>
            <select
              className="admin-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Events">Events</option>
              <option value="Activities">Activities</option>
              <option value="Classrooms">Classrooms</option>
              <option value="Sports">Sports</option>
              <option value="Celebrations">Celebrations</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label>Select Image</label>
            <input
              className="admin-input admin-file-input"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <button
            className="admin-upload-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>

        {message && <p className="admin-message">{message}</p>}
      </section>

      {/* GALLERY MANAGEMENT */}
      <section className="admin-gallery-section">
        <h3>Uploaded Gallery Images ({media.length})</h3>

        {media.length === 0 ? (
          <p className="admin-empty">No images uploaded yet.</p>
        ) : (
          <div className="admin-gallery-grid">
            {media.map((item) => (
              <div className="admin-gallery-card" key={item._id}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="admin-gallery-image"
                />

                <div className="admin-gallery-details">
                  <h4>{item.title}</h4>
                  <p>{item.category}</p>

                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SUBMISSIONS MANAGEMENT */}
      <section className="admin-submissions-section">
        <div className="admin-submissions-header">
          <h3>Form Submissions</h3>

          <button
            type="button"
            onClick={fetchSubmissions}
            disabled={submissionsLoading}
          >
            {submissionsLoading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {submissionMessage && (
          <p className="admin-message">{submissionMessage}</p>
        )}

        {submissionsLoading ? (
          <p>Loading submissions...</p>
        ) : (
          submissionTypes.map((item) => (
            <div className="admin-submission-group" key={item.key}>
              <h4>
                {item.title} ({submissions[item.key].length})
              </h4>

              {submissions[item.key].length === 0 ? (
                <p className="admin-empty">
                  No {item.title.toLowerCase()} found.
                </p>
              ) : (
                <div className="admin-submissions-grid">
                  {submissions[item.key].map((submission) => (
                    <div
                      className={`admin-submission-card ${
                        submission.isRead ? "is-read" : "is-unread"
                      }`}
                      key={submission._id}
                    >
                      <div className="admin-submission-card-header">
                        <span>
                          {submission.isRead ? "Read" : "Unread"}
                        </span>

                        <small>
                          {formatDate(submission.createdAt)}
                        </small>
                      </div>

                      <div className="admin-submission-details">
                        {renderSubmissionDetails(item, submission)}
                      </div>

                      <div className="admin-submission-actions">
                        <button
                          type="button"
                          onClick={() =>
                            handleReadStatus(item, submission)
                          }
                        >
                          Mark as {submission.isRead ? "Unread" : "Read"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteSubmission(item, submission)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </section>

    </div>
  );
}

export default AdminDashboard;

