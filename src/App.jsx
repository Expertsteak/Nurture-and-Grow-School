import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Gallery from "./pages/Gallery";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import Activities from "./pages/Activities";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Academics" element={<Academics />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/career" element={<Career />} />
        <Route path="/activities" element={<Activities/>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;