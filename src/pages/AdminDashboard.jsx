
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/media";

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Events");
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchMedia = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Could not fetch gallery");

      const data = await response.json();
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
          Authorization: `Bearer ${token}`
        },
        body: formData
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


const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this image?"
  );

  if (!confirmDelete) return;

  try {
    const token = sessionStorage.getItem("adminToken");

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
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
    <div style={{ padding: "30px" }}>
      <h2>Admin Dashboard</h2>

      <h3>Upload Gallery Image</h3>

      <form onSubmit={handleUpload}>
        <div>
          <label>Image Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
            required
          />
        </div>

        <br />

        <div>
          <label>Category</label>
          <br />
          <select
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

        <br />

        <div>
          <label>Select Image</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <hr />

      <h3>Uploaded Gallery Images</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >
        {media.map((item) => (
          <div key={item._id}>
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover"
              }}
            />

            <h4>{item.title}</h4>
            <p>{item.category}</p>
            <button
  onClick={() => handleDelete(item._id)}
  style={{
    backgroundColor: "red",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Delete
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
