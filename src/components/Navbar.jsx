import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.jpg";

function Navbar() {

  const [open, setOpen] = useState(false);

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

      {/* Navigation */}

      <nav>

        <ul>

          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/about">About</NavLink>
          </li>

          <li>
            <NavLink to="/academics">Academics</NavLink>
          </li>

          <li>
            <NavLink to="/gallery">Gallery</NavLink>
          </li>

          <li>
            <NavLink to="/admissions">Admissions</NavLink>
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
                  onClick={() => setOpen(false)}
                >
                  Activities
                </NavLink>

                <NavLink
                  to="/career"
                  onClick={() => setOpen(false)}
                >
                  Career
                </NavLink>

              </div>

            )}

          </li>

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>

        </ul>

      </nav>

      {/* Button */}

      <Link
        to="/admissions"
        className="apply-btn"
      >
        Apply Now
      </Link>

    </header>

  );
}

export default Navbar;