import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.jpg";

function Navbar() {

 const [open, setOpen] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);

  return (

    <header className="header">

      {/* Logo */}

      <div className="logo">

        <img src={logo} alt="School Logo" />

        <div className="logo-text">

          <h2>Nurture & Grow</h2>

          <p>Primary School</p>

        </div>

      </div>
       <div
       className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
       >
        <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
       </div>

      {/* Navigation */}

      <nav className={menuOpen ? "nav active" : "nav"}>

        <ul>

          <li>
            <NavLink
             to="/"
             onClick={() => setMenuOpen(false)}
             >
             Home
             </NavLink>
          </li>

          <li>
            <NavLink
             to="/about"
             onClick={() => setMenuOpen(false)}
             >
             About
             </NavLink>
          </li>

          <li>
            <NavLink
             to="/academics"
             onClick={() => setMenuOpen(false)}
             >
             Academics
             </NavLink>
          </li>

          <li>
            <NavLink 
            to="/gallery"
            onClick={() => setMenuOpen(false)}
            >
              Gallery
            </NavLink>
          </li>

          <li>
            <NavLink 
            to="/admissions"
            onClick={() => setMenuOpen(false)}
            >
              Admissions
              </NavLink>
          </li>

          {/* Dropdown */}

          <li className="dropdown">

            <button
              className="drop-btn"
              onClick={() => setOpen(!open)}
            >
              More <i className="fa-solid fa-angle-down"></i>
            </button>

            {open && (

              <div className="dropdown-content">

                <NavLink
                  to="/activities"
                 onClick={()=>{
                 setOpen(false);
                 setMenuOpen(false);
                 }}
                >
                  Activities
                </NavLink>

                <NavLink
                  to="/career"
                  onClick={()=>{
                 setOpen(false);
                 setMenuOpen(false);
                 }}
                >
                  Career
                </NavLink>

              </div>

            )}

          </li>

          <li>
            <NavLink
             to="/contact"
             onClick={() => setMenuOpen(false)}
             >
             Contact
           </NavLink>
          </li>

        </ul>

      </nav>

      {/* Button */}

      <Link
        to="/admissions"
        className="apply-btn"
        onClick={()=>setMenuOpen(false)}
        >
        Apply Now
      </Link>

    </header>

  );
}

export default Navbar;