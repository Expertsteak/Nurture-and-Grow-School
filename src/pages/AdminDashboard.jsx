
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

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
  return (
    <div className="admin-home">
      <div className="admin-home-header">
        <h1>Welcome to Admin Panel</h1>
        <p>Select a section below to manage your school website.</p>
      </div>

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

