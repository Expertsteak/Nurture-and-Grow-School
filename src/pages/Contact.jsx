import "./Contact.css";
import Hero from "../components/hero";
import { useState } from "react";

// Automatically select local or deployed backend
const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/submissions"
  : "https://nurture-grow-backend.onrender.com/api/submissions";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatus("");
      setStatusType("");

      const response = await fetch(
        `${API_URL}/contact-messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Check response type
      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        const responseText = await response.text();

        console.error(
          "Non-JSON backend response:",
          responseText.slice(0, 300)
        );

        throw new Error(
          "Backend API error. Please check the server and API route."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Message submission failed."
        );
      }

      setStatus("Message sent successfully!");
      setStatusType("success");

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (error) {
      console.error("Contact submission error:", error);

      setStatus(
        error.message || "Something went wrong. Please try again."
      );

      setStatusType("error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <Hero
        title="Contact Us"
        subtitle="We'd Love to Hear From You"
      />

      {/* CONTACT INFORMATION */}
      <section className="contact-info">
        <div className="section-heading">
          <span>GET IN TOUCH</span>

          <h2>
            Let's Stay <strong>Connected</strong>
          </h2>

          <p>
            Have a question about admissions or our school?
            Feel free to contact us. We are happy to help you.
          </p>
        </div>

        <div className="contact-cards">

          {/* Address */}
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>

            <h3>Visit Us</h3>

            <p>
              Nurture & Grow Primary School
              <br />
              Hyderabad, Telangana
            </p>
          </div>

          {/* Phone */}
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fa-solid fa-phone"></i>
            </div>

            <h3>Call Us</h3>

            <p>
              +91 90325 64893
              <br />
              Mon - Sat | 7:00 AM - 2:30 PM
            </p>
          </div>

          {/* Email */}
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fa-solid fa-envelope"></i>
            </div>

            <h3>Email Us</h3>

            <p>
              nurtureandgrow.alkapoor@gmail.com
              <br />
              We will reply as soon as possible.
            </p>
          </div>

          {/* School Hours */}
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fa-solid fa-clock"></i>
            </div>

            <h3>School Hours</h3>

            <p>
              Monday - Saturday
              <br />
              7:45 AM - 2:30 PM
            </p>
          </div>

        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-section">

        {/* LEFT CONTENT */}
        <div className="contact-content">
          <span>MESSAGE US</span>

          <h2>
            Have a <strong>Question?</strong>
          </h2>

          <p>
            Fill out the form and our school team will
            get back to you shortly.
          </p>

          <div className="contact-points">
            <p>
              <i className="fa-solid fa-circle-check"></i>
              Quick Response
            </p>

            <p>
              <i className="fa-solid fa-circle-check"></i>
              Friendly Support
            </p>

            <p>
              <i className="fa-solid fa-circle-check"></i>
              Admission Guidance
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          {/* NAME + EMAIL */}
          <div className="form-row">

            <div className="form-group">
              <label htmlFor="name">
                Your Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* PHONE */}
          <div className="form-group">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* MESSAGE */}
          <div className="form-group">
            <label htmlFor="message">
              Your Message
            </label>

            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}

            {!loading && (
              <i className="fa-solid fa-paper-plane"></i>
            )}
          </button>

          {/* STATUS MESSAGE */}
          {status && (
            <p
              className={`form-status ${statusType}`}
              role="status"
            >
              {status}
            </p>
          )}

        </form>
      </section>

      {/* LOCATION / MAP */}
      <section className="map">
        <h2>Find Us</h2>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.4015722418203!2d78.38577307591044!3d17.392505702656198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9d108f23a19f%3A0xacf7e85eb2aa896c!2sNurture%20and%20Grow%20primary%20school!5e0!3m2!1sen!2sin!4v1786333910065!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Nurture & Grow Primary School Location"
        ></iframe>
      </section>
    </>
  );
}

export default Contact;
