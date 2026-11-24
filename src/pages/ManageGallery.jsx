
import { useEffect, useState } from "react";
import "./ManageGallery.css";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/media"
  : "https://nurture-grow-backend.onrender.com/api/media";

function ManageGallery() {
  const [media, setMedia] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Events");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = sessionStorage.getItem("adminToken");

  const fetchMedia = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch gallery");
      }

      setMedia(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image.");
      return;
    }

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
        throw new Error(data.message || "Image upload failed");
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
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
        throw new Error(data.message || "Image deletion failed");
      }

      setMessage("Image deleted successfully!");
      await fetchMedia();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="manage-gallery">
      <div className="gallery-page-heading">
        <h2>Manage Gallery</h2>
        <p>Upload and manage school photographs.</p>
      </div>

      <form className="gallery-upload-form" onSubmit={handleUpload}>
        <h3>Upload New Image</h3>

        <label>Image Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter image title"
          required
        />

        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Events">Events</option>
          <option value="Activities">Activities</option>
          <option value="Classroom">Classroom</option>
          <option value="Celebrations">Celebrations</option>
        </select>

        <label>Select Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0] || null)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>

        {message && <p className="gallery-admin-message">{message}</p>}
      </form>

      <section className="gallery-admin-list">
        <h3>Uploaded Images ({media.length})</h3>

        {media.length === 0 ? (
          <p className="gallery-admin-empty">No images uploaded yet.</p>
        ) : (
          <div className="gallery-admin-grid">
            {media.map((item) => (
              <article className="gallery-admin-card" key={item._id}>
                <img src={item.imageUrl} alt={item.title} />

                <div className="gallery-admin-card-info">
                  <h4>{item.title}</h4>
                  <p>{item.category}</p>

                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete Image
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ManageGallery;
