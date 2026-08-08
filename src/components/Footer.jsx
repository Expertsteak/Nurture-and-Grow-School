import "./Footer.css";
import { Link } from "react-router-dom";
import {FaFacebookF,FaInstagram,FaWhatsapp,FaMapMarkerAlt,FaPhoneAlt,FaEnvelope,} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-container">

        <div className="footer-col">
          <h2>Nurture & Grow</h2>
          <p>
            Nurture & Grow Primary School is committed to providing
            quality education, Islamic values, and holistic
            development for every child in a safe and nurturing
            environment.
          </p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/academics">Academics</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/admissions">Admissions</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <p>
            <FaMapMarkerAlt /> Patel Enclave, Phase-4,
            Alkapoor Road, Shaikpet, Hyderabad.
          </p>
          <p>
            <FaPhoneAlt /> +91 90325 64893
          </p>
          <p>
            <FaEnvelope /> nurtureandgrow.alkapoor@gmail.com
          </p>
        </div>
        
        <div className="footer-col">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/share/1EYuHXpqXN/">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/ngp.school?igsh=MTNqb2h6bDUzbzh4eg==">
              <FaInstagram />
            </a>
            <a href="#">
              <FaWhatsapp />
            </a>
          </div>
        </div>

      </div>
      <div className="footer-bottom">

        <p>
          © 2026 Nurture & Grow Primary School. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;