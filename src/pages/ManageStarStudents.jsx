
import { useEffect, useState } from "react";
import "./ManageStarStudents.css";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/star-students"
  : "https://nurture-grow-backend.onrender.com/api/star-students";

const sections = [
  {
    name: "Primary",
    categories: ["Discipline", "Smart", "Obedient"],
  },
  {
    name: "Pre-Primary",
    categories: ["Discipline", "Smart", "Obedient"],
  },
];

function ManageStarStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
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

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(API_URL);
      const data = await getResponseData(response);

      setStudents(data);
    } catch (error) {
      console.error("Star students fetch error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSave = async (e, section, category) => {
    e.preventDefault();

    const token = sessionStorage.getItem("adminToken");
    const form = e.currentTarget;

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    const name = form.elements.name.value.trim();
    const className = form.elements.className.value.trim();
    const image = form.elements.image.files[0];

    if (!name || !className) {
      setMessage("Student name and class are required.");
      return;
    }

    const formData = new FormData();
    formData.append("section", section);
    formData.append("category", category);
    formData.append("name", name);
    formData.append("className", className);

    if (image) {
      formData.append("image", image);
    }

    const slotKey = `${section}-${category}`;

    try {
      setSaving(slotKey);
      setMessage("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await getResponseData(response);

      setMessage(data.message || `${category} student saved successfully!`);

      await fetchStudents();
    } catch (error) {
      console.error("Star student save error:", error);
      setMessage(error.message);
    } finally {
      setSaving("");
    }
  };

  const handleDelete = async (student) => {
    if (!window.confirm("Are you sure you want to remove this student?")) {
      return;
    }

    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      setMessage("");

      const response = await fetch(`${API_URL}/${student._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await getResponseData(response);

      setMessage(data.message || "Student removed successfully!");

      await fetchStudents();
    } catch (error) {
      console.error("Star student delete error:", error);
      setMessage(error.message);
    }
  };

  const getStudent = (section, category) => {
    return students.find(
      (student) =>
        student.section === section &&
        student.category === category
    );
  };

  return (
    <div className="manage-star-students">
      <div className="star-students-header">
        <div>
          <h2>Star Students of the Week</h2>
          <p>Manage weekly star students for both school sections.</p>
        </div>

        <button
          type="button"
          onClick={fetchStudents}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {message && (
        <p className="star-students-message">{message}</p>
      )}

      {loading ? (
        <p>Loading star students...</p>
      ) : (
        sections.map((section) => (
          <section
            className="star-section"
            key={section.name}
          >
            <h3>{section.name}</h3>

            <div className="star-admin-grid">
              {section.categories.map((category) => {
                const student = getStudent(section.name, category);
                const slotKey = `${section.name}-${category}`;

                return (
                  <article
                    className="star-admin-card"
                    key={slotKey}
                  >
                    <h4>{category} Star</h4>

                    {student ? (
                      <div className="star-current-student">
                        {student.imageUrl ? (
                          <img
                            src={student.imageUrl}
                            alt={student.name}
                            className="star-admin-image"
                          />
                        ) : (
                          <div className="star-admin-placeholder">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div>
                          <strong>{student.name}</strong>
                          <p>Class: {student.className}</p>
                          <small>Current Star Student</small>
                        </div>
                      </div>
                    ) : (
                      <p className="star-not-added">
                        No student added yet.
                      </p>
                    )}

                    <form
                      onSubmit={(e) =>
                        handleSave(e, section.name, category)
                      }
                    >
                      <label>Student Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter student name"
                        defaultValue={student?.name || ""}
                        required
                      />

                      <label>Class</label>
                      <input
                        type="text"
                        name="className"
                        placeholder="Enter class"
                        defaultValue={student?.className || ""}
                        required
                      />

                      <label>
                        Student Photo (Optional)
                      </label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                      />

                      <button
                        type="submit"
                        disabled={saving === slotKey}
                      >
                        {saving === slotKey
                          ? "Saving..."
                          : student
                            ? "Update Student"
                            : "Add Student"}
                      </button>
                    </form>

                    {student && (
                      <button
                        type="button"
                        className="star-remove-btn"
                        onClick={() => handleDelete(student)}
                      >
                        Remove Student
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default ManageStarStudents;
