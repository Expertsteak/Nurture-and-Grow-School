
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: "⌂" },
    { label: "Events", path: "/admin/events", icon: "◷" },
    { label: "Notices", path: "/admin/notices", icon: "▤" },
    { label: "Gallery", path: "/admin/gallery", icon: "▧" },
    { label: "Star Students", path: "/admin/star-students", icon: "★" },
    { label: "Admissions", path: "/admin/admissions", icon: "♙" },
    { label: "Contact Messages", path: "/admin/contacts", icon: "✉" },
    { label: "Careers", path: "/admin/careers", icon: "▣" },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin", { replace: true });
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <h2>Nurture & Grow</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin/dashboard"}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-layout-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
