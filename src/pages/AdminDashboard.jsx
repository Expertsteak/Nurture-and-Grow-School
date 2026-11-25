
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/student-fees/dashboard/summary"
  : "https://nurture-grow-backend.onrender.com/api/student-fees/dashboard/summary";

const adminSections = [
  {
    title: "Manage Events",
    description: "Add, edit or delete school events.",
    path: "/admin/events",
    icon: "📅",
  },
  {
    title: "Manage Notices",
    description: "Publish and update school notices.",
    path: "/admin/notices",
    icon: "📢",
  },
  {
    title: "Manage Gallery",
    description: "Upload and manage school photographs.",
    path: "/admin/gallery",
    icon: "🖼️",
  },
  {
    title: "Star Students",
    description: "Update weekly star students.",
    path: "/admin/star-students",
    icon: "⭐",
  },
  {
    title: "Student Management",
    description: "Add, search, update students and manage their fees.",
    path: "/admin/students",
    icon: "👨‍🎓",
  },
  {
    title: "Admissions",
    description: "View and manage admission enquiries.",
    path: "/admin/admissions",
    icon: "🎓",
  },
  {
    title: "Contact Messages",
    description: "View messages received from the website.",
    path: "/admin/contacts",
    icon: "✉️",
  },
  {
    title: "Career Applications",
    description: "Review career application submissions.",
    path: "/admin/careers",
    icon: "💼",
  },
];

function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      const token = sessionStorage.getItem("adminToken");

      if (!token) {
        setError("Please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load dashboard summary.");
        }

        setSummary(data);
      } catch (err) {
        console.error("Dashboard summary error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const statistics = summary
    ? [
        {
          title: "Total Students",
          value: summary.totalStudents,
          icon: "👨‍🎓",
        },
        {
          title: "Active Students",
          value: summary.activeStudents,
          icon: "✅",
        },
        {
          title: "Inactive Students",
          value: summary.inactiveStudents,
          icon: "📋",
        },
        {
          title: "Total Fees",
          value: formatCurrency(summary.totalFees),
          icon: "💰",
        },
        {
          title: "Fees Collected",
          value: formatCurrency(summary.totalCollected),
          icon: "💵",
        },
        {
          title: "Pending Fees",
          value: formatCurrency(summary.pendingFees),
          icon: "⏳",
        },
      ]
    : [];

  return (
    <div className="admin-home">
      <div className="admin-home-header">
        <h1>Welcome to Admin Panel</h1>
        <p>Select a section below to manage your school website.</p>
      </div>

      <div className="admin-stats-section">
        <h2>Student & Fee Overview</h2>

        {loading ? (
          <p>Loading statistics...</p>
        ) : error ? (
          <p className="admin-stats-error">{error}</p>
        ) : (
          <div className="admin-stats-grid">
            {statistics.map((stat) => (
              <div className="admin-stat-card" key={stat.title}>
                <span className="admin-stat-icon">{stat.icon}</span>
                <p>{stat.title}</p>
                <h3>{stat.value}</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      <h2 className="admin-sections-title">Manage School</h2>

      <div className="admin-home-grid">
        {adminSections.map((section) => (
          <Link
            to={section.path}
            className="admin-home-card"
            key={section.path}
          >
            <span className="admin-home-icon">{section.icon}</span>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
            <span className="admin-home-arrow">Manage →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
