import "./Academics.css";
import Hero from "../components/hero";
import academicHero from "../assets/academic-hero.png";
import { Link } from "react-router-dom";


function Academics() {
  return (
    <>
     <Hero
       tag="ACADEMICS"
       title="Excellence Through Quality Education"
       subtitle="Cambridge curriculum with activity-based learning and experienced teachers."
       />
       
       {/* Cambridge Section */}

<section className="cambridge">

        <div className="cambridge-image">

          <img
            src={"https://peoplechoicebd.com/wp-content/uploads/2025/05/61O82pS3kEL._SX445_.jpg"}
            alt="Cambridge Books"
            className="books"
          />

        </div>

        <div className="cambridge-content">

          <h2>Cambridge Learning Resources</h2>

          <p>
            At <strong>Nurture & Grow Primary School</strong>,
            we proudly use <strong>Cambridge publications</strong>
            to provide our students with a high-quality,
            internationally recognized learning experience.
          </p>

          <p>
            Cambridge books encourage creativity, critical thinking,
            communication skills, and conceptual understanding through
            engaging lessons and activity-based learning.
          </p>

          <p>
            By following Cambridge learning resources, we ensure that
            our students build a strong academic foundation while
            developing confidence and a lifelong love for learning.
          </p>

        </div>

</section>

      {/* Curriculum */}

<section className="curriculum">

        <h2>Our Curriculum</h2>

        <p>
          Our English Medium curriculum is carefully designed to
          nurture every child's academic, social, emotional and
          creative development through interactive learning,
          classroom activities and practical experiences.
        </p>

</section>

      {/* Subjects */}

<section className="subjects">

  <h2>Subjects We Teach</h2>

  <div className="subject-grid">

    <div className="subject-card">
      <i className="fa-solid fa-language"></i>
      <h3>English</h3>
    </div>

    <div className="subject-card">
      <i className="fa-solid fa-square-root-variable"></i>
      <h3>Mathematics</h3>
    </div>

    <div className="subject-card">
      <i className="fa-solid fa-earth-asia"></i>
      <h3>EVS</h3>
    </div>

    <div className="subject-card">
      <i className="fa-solid fa-book-quran"></i>
      <h3>Islamic Studies</h3>
    </div>

    <div className="subject-card">
      <i className="fa-solid fa-graduation-cap"></i>
      <h3>Telugu</h3>
    </div>

    <div className="subject-card">
      <i className="fa-solid fa-book-open"></i>
      <h3>Urdu</h3>
    </div>

    <div className="subject-card">
      <i className="fa-solid fa-book"></i>
      <h3>Hindi</h3>
    </div>

    <div className="subject-card">
      <i className="fa-solid fa-palette"></i>
      <h3>Art & Craft</h3>
    </div>

  </div>

</section>

      {/* Teaching */}

<section className="teaching">

  <h2>Our Teaching Approach</h2>

  <div className="teaching-grid">

    <div className="teach-card">
      <i className="fa-solid fa-chalkboard-user"></i>
      <h3>Interactive Learning</h3>
      <p>
        Every lesson is designed to keep children actively engaged,
        curious and excited about learning.
      </p>
    </div>

    <div className="teach-card">
      <i className="fa-solid fa-puzzle-piece"></i>
      <h3>Activity-Based Learning</h3>
      <p>
        Hands-on activities and practical experiences make learning
        enjoyable and meaningful.
      </p>
    </div>

    <div className="teach-card">
      <i className="fa-solid fa-user-group"></i>
      <h3>Individual Attention</h3>
      <p>
        Every child receives personal guidance to help them learn,
        grow and achieve their full potential.
      </p>
    </div>

    <div className="teach-card">
      <i className="fa-solid fa-lightbulb"></i>
      <h3>Creative Thinking</h3>
      <p>
        We encourage imagination, problem-solving, confidence and
        independent thinking in every learner.
      </p>
    </div>

  </div>

</section>

      {/* CTA */}

      <section className="cta">
        <h2>Give Your Child the Best Start</h2>
        <p>
          Admissions are open from Nursery to Grade 5.
          Join Nurture & Grow Primary School today.
        </p>
        <Link to="/admissions" className="apply-btn">
         Apply Now
         </Link>
      </section>
    </>
  );
}

export default Academics;