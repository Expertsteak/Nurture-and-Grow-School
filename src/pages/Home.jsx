import { Link } from "react-router-dom";
import "./Home.css";
import color1 from "../assets/gallery/images/color1.jpeg"
import color2 from "../assets/gallery/images/color2.jpeg"
import color3 from "../assets/gallery/images/color3.jpeg"
import color4 from "../assets/gallery/images/color4.jpeg"
import color5 from "../assets/gallery/images/color5.jpeg"
import color6 from "../assets/gallery/images/color6.jpeg"
// import aboutImage from "../assets/school.jpg";

function Home() {
  return (
    <>
      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-small-title">
            WELCOME TO OUR SCHOOL
          </span>

          <h1>
            Nurture & Grow
            <span>Primary School</span>
          </h1>

          <p>
            Empowering young minds through quality English medium
            education from Nursery to Grade 5 in Hyderabad.
          </p>

          <div className="hero-buttons">

            <Link to="/admissions" className="btn">
              Apply Now
            </Link>

            <Link to="/about" className="btn btn-outline">
              Learn More
            </Link>

          </div>

         
        </div>

      </section>


      {/* WHY CHOOSE US */}

      <section className="why-us">

        <div className="section-heading">

          <span>WHY CHOOSE US</span>

          <h2>
            Growing Minds,
            <strong> Building Futures</strong>
          </h2>

          <p>
            We provide a caring and inspiring environment where
            every child gets the opportunity to learn and grow.
          </p>

        </div>

        <div className="cards">

          <div className="card">
            <div className="card-icon">
              <i className="fa-solid fa-user-graduate"></i>
            </div>

            <h3>Qualified Teachers</h3>

            <p>
              Dedicated educators focused on every child's
              success and development.
            </p>
          </div>


          <div className="card">
            <div className="card-icon">
              <i className="fa-solid fa-book-open"></i>
            </div>

            <h3>English Medium</h3>

            <p>
              Building strong communication skills and
              academic excellence.
            </p>
          </div>


          <div className="card">
            <div className="card-icon">
              <i className="fa-solid fa-school"></i>
            </div>

            <h3>Modern Learning</h3>

            <p>
              Interactive classrooms with activity-based
              learning experiences.
            </p>
          </div>


          <div className="card">
            <div className="card-icon">
              <i className="fa-solid fa-shield-heart"></i>
            </div>

            <h3>Safe Campus</h3>

            <p>
              A secure, friendly and child-centered environment
              for every student.
            </p>
          </div>

        </div>

      </section>


      {/* ABOUT SCHOOL */}

      <section className="about-preview">

        <div className="about-image">

          <div className="image-decoration"></div>

          {/* <img
            src={aboutImage}
            alt="Nurture and Grow Primary School"
          /> */}

          <div className="experience-badge">
            <strong>Quality</strong>
            <span>Education</span>
          </div>

        </div>


        <div className="about-content">

          <span className="section-label">
            ABOUT OUR SCHOOL
          </span>

          <h2>
            A Place Where
            <strong> Children Grow</strong>
          </h2>

          <p>
            Nurture & Grow Primary School is committed to providing
            high-quality education that nurtures creativity,
            confidence, discipline and lifelong learning.
          </p>

          <p>
            Our goal is to create a positive learning environment
            where every child feels valued, supported and inspired.
          </p>

          <Link to="/about" className="btn">
            Discover More
            <i className="fa-solid fa-arrow-right"></i>
          </Link>

        </div>

      </section>

      {/* ================= GALLERY ================= */}

<section className="home-gallery">

  <div className="section-heading">

    <span>OUR GALLERY</span>

    <h2>
      Moments of
      <strong> Learning & Joy</strong>
    </h2>

    <p>
      Take a glimpse at our school activities, classrooms,
      celebrations and memorable moments.
    </p>

  </div>


  <div className="gallery-grid">

    <div className="gallery-item">
      <img src={color1} alt="School Activity" />
      <div className="gallery-placeholder">
        <i className="fa-solid fa-image"></i>
        <span>School Activity</span>
      </div>
    </div>


    <div className="gallery-item">
      <img src={color2} alt="Classroom" />
      <div className="gallery-placeholder">
        <i className="fa-solid fa-image"></i>
        <span>Classroom</span>
      </div>
    </div>


    <div className="gallery-item">
      <img src={color3} alt="Sports Activity" />
      <div className="gallery-placeholder">
        <i className="fa-solid fa-image"></i>
        <span>Sports Activity</span>
      </div>
    </div>


    <div className="gallery-item">
      <img src={color4} alt="Art and Craft" />
      <div className="gallery-placeholder">
        <i className="fa-solid fa-image"></i>
        <span>Art & Craft</span>
      </div>
    </div>


    <div className="gallery-item">
      <img src={color5} alt="Celebration" />
      <div className="gallery-placeholder">
        <i className="fa-solid fa-image"></i>
        <span>Celebration</span>
      </div>
    </div>


    <div className="gallery-item">
      <img src={color6} alt="School Event" />
      <div className="gallery-placeholder">
        <i className="fa-solid fa-image"></i>
        <span>School Event</span>
      </div>
    </div>

  </div>


  <Link to="/gallery" className="btn gallery-btn">
    View Full Gallery
    <i className="fa-solid fa-arrow-right"></i>
  </Link>

</section>


      {/* FACTS */}

      <section className="facts">

        <div className="fact">
          <i className="fa-solid fa-child"></i>
          <h2>Nursery</h2>
          <p>Starting Point</p>
        </div>

        <div className="fact">
          <i className="fa-solid fa-graduation-cap"></i>
          <h2>Grade 5</h2>
          <p>Highest Class</p>
        </div>

        <div className="fact">
          <i className="fa-solid fa-language"></i>
          <h2>English</h2>
          <p>Medium of Instruction</p>
        </div>

        <div className="fact">
          <i className="fa-solid fa-location-dot"></i>
          <h2>Hyderabad</h2>
          <p>Our Location</p>
        </div>

      </section>


      {/* CTA */}

      <section className="cta">

        <div className="cta-content">

          <span>ADMISSIONS ARE OPEN</span>

          <h2>
            Give Your Child a
            Bright Beginning
          </h2>

          <p>
            Give your child the best start to a successful
            and confident future.
          </p>

          <Link to="/admissions" className="btn">
            Enroll Today
            <i className="fa-solid fa-arrow-right"></i>
          </Link>

        </div>

      </section>

    </>
  );
}

export default Home;