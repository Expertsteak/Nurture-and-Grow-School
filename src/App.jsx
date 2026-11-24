
import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/scrolltotop";

import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Gallery from "./pages/Gallery";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import Activities from "./pages/Activities";
import Events from "./pages/Events";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

import ManageEvents from "./components/ManageEvents";
import ManageNotices from "./components/ManageNotices";
import ManageGallery from "./pages/ManageGallery";
import ManageAdmissions from "./pages/ManageAdmissions";
import ManageContacts from "./pages/ManageContacts";
import ManageCareers from "./pages/ManageCareers";
import ManageStarStudents from "./pages/ManageStarStudents";

// Public website layout
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

// Temporary page for admin sections not created yet
function ComingSoon({ title }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>{title}</h2>
      <p>This management page will be added soon.</p>
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* PUBLIC WEBSITE */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/career" element={<Career />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ADMIN LOGIN */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* PROTECTED ADMIN AREA */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="events" element={<ManageEvents />} />

          <Route path="notices" element={<ManageNotices />} />

          <Route path="gallery" element={<ManageGallery />} />

          <Route path="star-students" element={<ManageStarStudents />} />

          <Route path="admissions" element={<ManageAdmissions />} />

          <Route path="contacts" element={<ManageContacts />} />

          <Route path="careers" element={<ManageCareers />} />

        </Route>

      </Routes>
    </>
  );
}

export default App;
