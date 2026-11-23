
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

const API_URL = "https://nurture-grow-backend.onrender.com/api/media";

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Events");
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // FETCH IMAGES
  const fetchMedia = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not fetch gallery");
      }

      const data = await response.json();
      setMedia(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // UPLOAD IMAGE
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image.");
      return;
    }

    const token = sessionStorage.getItem("adminToken");

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

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setMessage("Image uploaded successfully!");

      setTitle("");
      setCategory("Events");
      setImage(null);

      e.target.reset();

      await fetchMedia();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE IMAGE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;

    try {
      const token = sessionStorage.getItem("adminToken");

      if (!token) {
        setMessage("Please login again.");
        return;
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setMessage("Image deleted successfully!");

      await fetchMedia();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Manage your school gallery</p>
      </div>

      {/* UPLOAD SECTION */}
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

        {message && (
          <p className="admin-message">{message}</p>
        )}

      </section>

      {/* GALLERY SECTION */}
      <section className="admin-gallery-section">

        <h3>Uploaded Gallery Images ({media.length})</h3>

        {media.length === 0 ? (
          <p className="admin-empty">
            No images uploaded yet.
          </p>
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

    </div>
  );
}

export default AdminDashboard;
