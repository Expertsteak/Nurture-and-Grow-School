import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Nurture & Grow Primary School</p>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-dashboard-content">
        <h2>Welcome, Admin!</h2>
        <p>
          Manage school videos and gallery content from this dashboard.
        </p>

        <div className="admin-dashboard-card">
          <h3>Video Management</h3>
          <p>Upload and manage school videos here.</p>

          <button disabled>
            Video Upload (Coming in Step 4)
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;