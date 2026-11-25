
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageStudents.css";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/students"
  : "https://nurture-grow-backend.onrender.com/api/students";

const initialForm = {
  name: "",
  admissionNumber: "",
  className: "",
  section: "",
  dateOfBirth: "",
  parentName: "",
  phone: "",
  address: "",
  admissionDate: "",
  academicYear: ""
};

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toISOString().split("T")[0];
}

function ManageStudents() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `${API_URL}?search=${encodeURIComponent(search)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch students.");
      }

      setStudents(data);
    } catch (error) {
      console.error("Student fetch error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (e, student) => {
    e.stopPropagation();

    setEditingId(student._id);

    setFormData({
      name: student.name || "",
      admissionNumber: student.admissionNumber || "",
      className: student.className || "",
      section: student.section || "",
      dateOfBirth: formatDate(student.dateOfBirth),
      parentName: student.parentName || "",
      phone: student.phone || "",
      address: student.address || "",
      admissionDate: formatDate(student.admissionDate),
      academicYear: student.academicYear || ""
    });

    setMessage("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (e, student) => {
  e.stopPropagation();

  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${student.name}?`
  );

  if (!confirmDelete) return;

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
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not delete student.");
    }

    setMessage("Student deleted successfully!");
    await fetchStudents();

  } catch (error) {
    console.error("Delete student error:", error);
    setMessage(error.message);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const isEditing = Boolean(editingId);

      const response = await fetch(
        isEditing ? `${API_URL}/${editingId}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          (isEditing
            ? "Could not update student."
            : "Could not add student.")
        );
      }

      setMessage(
        isEditing
          ? "Student updated successfully!"
          : "Student added successfully!"
      );

      setFormData(initialForm);
      setEditingId(null);
      setShowForm(false);

      await fetchStudents();

    } catch (error) {
      console.error("Student save error:", error);
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialForm);
    setMessage("");
  };

  return (
    <div className="manage-students">

      <div className="students-header">
        <div>
          <h2>Student Management</h2>
          <p>Manage and search school student records.</p>
        </div>

        <button
          className="students-add-btn"
          onClick={() => {
            if (showForm) {
              handleCancel();
            } else {
              setEditingId(null);
              setFormData(initialForm);
              setMessage("");
              setShowForm(true);
            }
          }}
        >
          {showForm ? "Cancel" : "+ Add Student"}
        </button>
      </div>

      {message && (
        <p className="students-message">{message}</p>
      )}

      {showForm && (
        <div className="students-form-container">

          <h3>
            {editingId ? "Edit Student Details" : "Add New Student"}
          </h3>

          <form onSubmit={handleSubmit}>

            <div className="students-form-grid">

              <div className="students-form-field">
                <label>Student Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="students-form-field">
                <label>Admission Number *</label>
                <input
                  type="text"
                  name="admissionNumber"
                  value={formData.admissionNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="students-form-field">
                <label>Class *</label>
                <input
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="students-form-field">
                <label>Section</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                />
              </div>

              <div className="students-form-field">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              <div className="students-form-field">
                <label>Admission Date</label>
                <input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                />
              </div>

              <div className="students-form-field">
                <label>Academic Year *</label>
                <input
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  placeholder="e.g. 2026-2027"
                  required
                />
              </div>

              <div className="students-form-field">
                <label>Parent Name *</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="students-form-field">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="students-form-field students-address-field">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

            </div>

            <button
              className="students-save-btn"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Student"
                  : "Save Student"}
            </button>

          </form>
        </div>
      )}

      <div className="students-search">
        <input
          type="text"
          placeholder="Search by student name or admission number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="students-list-container">

        <h3>Students</h3>

        {loading ? (
          <p className="students-status">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="students-status">No students found.</p>
        ) : (
          <div className="students-table-wrapper">

            <table className="students-table">

              <thead>
                <tr>
                  <th>Admission No.</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Academic Year</th>
                  <th>Parent Name</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student._id}
                    onClick={() =>
                      navigate(`/admin/students/${student._id}`)
                    }
                    className="student-row"
                  >
                    <td>{student.admissionNumber}</td>
                    <td>{student.name}</td>
                    <td>{student.className}</td>
                    <td>{student.section || "-"}</td>
                    <td>{student.academicYear}</td>
                    <td>{student.parentName || "-"}</td>
                    <td>{student.phone || "-"}</td>
                    
                      <td>
                      <div className="student-action-buttons">
                      <button
                       type="button"
                       className="students-edit-btn"
                       onClick={(e) => handleEdit(e, student)}
                       >
                       Edit
                    </button>

                      <button
                     type="button"
                     className="students-delete-btn"
                     onClick={(e) => handleDelete(e, student)}
                     >
                    Delete
                   </button>
                </div>
            </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default ManageStudents;
