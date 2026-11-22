
import { useEffect, useState } from "react";
import "./Gallery.css";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://nurture-grow-backend.onrender.com/api/media"
        );

        if (!response.ok) {
          throw new Error("Failed to load gallery images");
        }

        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const categories = [
    "All",
    ...new Set(images.map((item) => item.category))
  ];

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter(
          (item) => item.category === selectedCategory
        );

  if (loading) {
    return <h3 className="gallery-status">Loading gallery...</h3>;
  }

  if (error) {
    return <p className="gallery-status">{error}</p>;
  }

  return (
    <div className="school-gallery">

      {/* HEADING */}
      <div className="gallery-heading">
        <h1>Our School Gallery</h1>
        <p>
          Explore the beautiful moments and activities of our school.
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="gallery-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category ? "active" : ""
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* GALLERY GRID */}
      {filteredImages.length === 0 ? (
        <p className="gallery-status">
          No images available in this category.
        </p>
      ) : (
        <div className="gallery-grid">
          {filteredImages.map((item) => (
            <div className="gallery-card" key={item._id}>

              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                onClick={() => setSelectedImage(item)}
              />

              <div className="gallery-info">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* IMAGE PREVIEW */}
      {selectedImage && (
        <div
          className="gallery-modal"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="gallery-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
          >
            &times;
          </button>

          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
            />

            <h2>{selectedImage.title}</h2>
            <p>{selectedImage.category}</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default Gallery;
