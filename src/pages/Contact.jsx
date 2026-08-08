import "./Contact.css";
import Hero from "../components/hero";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";


function Contact() {

  // =========================
  // FORM STATE
  // =========================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });


  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

  };


  // =========================
  // SUBMIT FORM
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setStatus("");


    try {

      // Save message to Firestore

      await addDoc(
        collection(db, "contactMessages"),
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,

          createdAt: serverTimestamp(),
        }
      );


      // Success message

      setStatus(
        "Your message has been sent successfully! 🎉"
      );


      // Clear form

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });


    } catch (error) {

      console.error(
        "Error sending message:",
        error
      );

      setStatus(
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <>

      {/* =========================
          HERO
      ========================= */}

      <Hero
        title="Contact Us"
        subtitle="We'd Love to Hear From You"
      />


      {/* =========================
          CONTACT INFORMATION
      ========================= */}

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
              7:00 AM - 2:30 PM
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          CONTACT FORM
      ========================= */}

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


        {/* =========================
            FORM
        ========================= */}

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


          {/* SUBJECT */}

          <div className="form-group">

            <label htmlFor="subject">
              Subject
            </label>

            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
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

            {loading
              ? "Sending..."
              : "Send Message"
            }

            {!loading && (
              <i className="fa-solid fa-paper-plane"></i>
            )}

          </button>


          {/* STATUS MESSAGE */}

          {status && (

            <p className="form-status">
              {status}
            </p>

          )}

        </form>

      </section>


      {/* =========================
          LOCATION
      ========================= */}

      {/* Your existing location/map section
          can continue here */}

    </>

  );

}


export default Contact;