import "./Contact.css";
import Hero from "../components/hero";

function Contact() {
  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="We'd Love to Hear From You"
      />

      {/* ================= CONTACT INFORMATION ================= */}

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
              +91 XXXXX XXXXX
              <br />
              Mon - Sat | 9:00 AM - 4:00 PM
            </p>
          </div>


          {/* Email */}
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fa-solid fa-envelope"></i>
            </div>

            <h3>Email Us</h3>

            <p>
              info@nurtureandgrow.com
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
              9:00 AM - 4:00 PM
            </p>
          </div>

        </div>

      </section>


      {/* ================= CONTACT FORM ================= */}

      <section className="contact-section">

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


        <form className="contact-form">

          <div className="form-row">

            <div className="form-group">

              <label>Your Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
              />

            </div>


            <div className="form-group">

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
              />

            </div>

          </div>


          <div className="form-group">

            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
            />

          </div>


          <div className="form-group">

            <label>Subject</label>

            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
            />

          </div>


          <div className="form-group">

            <label>Your Message</label>

            <textarea
              name="message"
              rows="5"
              placeholder="Write your message..."
            ></textarea>

          </div>


          <button type="submit">
            Send Message
            <i className="fa-solid fa-paper-plane"></i>
          </button>

        </form>

      </section>


      {/* ================= LOCATION ================= */}

      <section className="location-section">

        <div className="section-heading">

          <span>OUR LOCATION</span>

          <h2>
            Find Us <strong>Easily</strong>
          </h2>

        </div>


        <div className="map-box">

          <i className="fa-solid fa-location-dot"></i>

          <h3>Nurture & Grow Primary School</h3>

          <p>
            Hyderabad, Telangana
          </p>

          <section class="map">

        <h2>Find Us</h2>

        <iframe
            src="https://www.google.com/maps/embed?pb="
            width="100%"
            height="400"
            style="border:0;"
            allowfullscreen=""
            loading="lazy">

           </iframe>

           </section>

        </div>

      </section>

    </>
  );
}

export default Contact;