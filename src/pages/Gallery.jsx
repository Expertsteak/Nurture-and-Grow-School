
import { useEffect, useState } from "react";

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

  // Get unique categories dynamically
  const categories = [
    "All",
    ...new Set(images.map((item) => item.category))
  ];

  // Filter images
  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter(
          (item) => item.category === selectedCategory
        );

  if (loading) {
    return <h3 style={{ textAlign: "center", padding: "50px" }}>
      Loading gallery...
    </h3>;
  }

  if (error) {
    return <p style={{ textAlign: "center" }}>{error}</p>;
  }

  return (
    <div
      style={{
        padding: "50px 5%",
        backgroundColor: "#f8fafc",
        minHeight: "80vh"
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <h1
          style={{
            color: "#174873",
            fontSize: "36px",
            marginBottom: "10px"
          }}
        >
          Our School Gallery
        </h1>

        <p style={{ color: "#666", fontSize: "16px" }}>
          Explore the beautiful moments and activities of our school.
        </p>
      </div>

      {/* Category Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "40px"
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "10px 22px",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              backgroundColor:
                selectedCategory === category
                  ? "#174873"
                  : "#e2e8f0",
              color:
                selectedCategory === category
                  ? "white"
                  : "#333",
              transition: "0.3s"
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Images */}
      {filteredImages.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No images available in this category.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px"
          }}
        >
          {filteredImages.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: "white",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                transition: "transform 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img
  src={item.imageUrl}
  alt={item.title}
  loading="lazy"
  onClick={() => setSelectedImage(item)}
  style={{
    width: "100%",
    height: "230px",
    objectFit: "cover",
    display: "block",
    cursor: "pointer"
  }}
/>

              <div style={{ padding: "18px" }}>
                <h3
                  style={{
                    color: "#174873",
                    margin: "0 0 8px"
                  }}
                >
                  {item.title}
                </h3>

                <span
                  style={{
                    backgroundColor: "#e0f2fe",
                    color: "#075985",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "13px"
                  }}
                >
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

{selectedImage && (
  <div
    onClick={() => setSelectedImage(null)}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      padding: "20px",
      boxSizing: "border-box"
    }}
  >
    <button
      onClick={() => setSelectedImage(null)}
      aria-label="Close image preview"
      style={{
        position: "absolute",
        top: "20px",
        right: "30px",
        color: "white",
        background: "transparent",
        border: "none",
        fontSize: "35px",
        cursor: "pointer"
      }}
    >
      &times;
    </button>

    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        textAlign: "center",
        maxWidth: "900px",
        width: "100%"
      }}
    >
      <img
        src={selectedImage.imageUrl}
        alt={selectedImage.title}
        style={{
          maxWidth: "100%",
          maxHeight: "75vh",
          objectFit: "contain",
          borderRadius: "10px"
        }}
      />

      <h2 style={{ color: "white" }}>
        {selectedImage.title}
      </h2>

      <p style={{ color: "#ddd" }}>
        {selectedImage.category}
      </p>
    </div>
  </div>
)}

    </div>
  );
}

export default Gallery;
