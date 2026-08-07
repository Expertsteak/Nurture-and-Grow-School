import Hero from "../components/hero";
import "./Activities.css";
import plantation from "../assets/plantation.jpeg"
import art from "../assets/art&craft.jpeg"
import sports from "../assets/sports.jpeg"


import { Link } from "react-router-dom";

function Activities() {
  return (
    <>

      <Hero
        title="School Activities"
        subtitle="Learning Beyond the Classroom"
      />

      {/* ================= INTRO ================= */}

      <section className="activity-intro">

        <div className="intro-text">

          <span>Co-Curricular Activities</span>

          <h2>Learning Beyond Books</h2>

          <p>
            At Nurture & Grow Primary School, we believe that education is
            more than textbooks. Every child deserves opportunities to
            discover their talents, develop confidence, build friendships,
            and learn valuable life skills.
          </p>

          <p>
            Through sports, celebrations, cultural events, creative
            activities and personality development programs, we nurture
            every child's physical, emotional and intellectual growth.
          </p>

        </div>

      </section>

      {/* ================= ACTIVITIES ================= */}

      <section className="activities">

        <h2>Our Activities</h2>

        <div className="activity-grid">

          <div className="activity-card">

            <i className="fa-solid fa-seedling"></i>

            <h3>Plantation Activities</h3>

            <p>
              Teaching students to care for nature through plantation
              drives and environmental awareness.
            </p>

          </div>

          <div className="activity-card">

            <i className="fa-solid fa-futbol"></i>

            <h3>Sports</h3>

            <p>
              Indoor and outdoor sports that improve teamwork,
              confidence and physical fitness.
            </p>

          </div>

          <div className="activity-card">

            <i className="fa-solid fa-person-praying"></i>

            <h3>Yoga</h3>

            <p>
              Daily yoga sessions that improve focus,
              flexibility and healthy living.
            </p>

          </div>

          <div className="activity-card">

            <i className="fa-solid fa-flag"></i>

            <h3>Independence Day</h3>

            <p>
              Patriotic celebrations with speeches,
              cultural performances and flag hoisting.
            </p>

          </div>

          <div className="activity-card">

            <i className="fa-solid fa-landmark"></i>

            <h3>Republic Day</h3>

            <p>
              Celebrating our Constitution through
              student performances and awareness programs.
            </p>

          </div>

          <div className="activity-card">

            <i className="fa-solid fa-palette"></i>

            <h3>Art & Craft</h3>

            <p>
              Encouraging imagination through drawing,
              painting and creative crafts.
            </p>

          </div>

          <div className="activity-card">

            <i className="fa-solid fa-user-graduate"></i>

            <h3>Personality Development</h3>

            <p>
              Building communication skills,
              leadership and self-confidence.
            </p>

          </div>

          <div className="activity-card">

            <i className="fa-solid fa-bus"></i>

            <h3>Educational Trips</h3>

            <p>
              Practical learning experiences through
              educational visits and excursions.
            </p>

          </div>

          <div className="activity-card">

            <i className="fa-solid fa-award"></i>

            <h3>Annual Day</h3>

            <p>
              A grand celebration showcasing every
              child's talent and creativity.
            </p>

          </div>

        </div>

      </section>

      {/* ================= FEATURED ACTIVITIES ================= */}

<section className="featured-activities">

    <h2>Featured Activities</h2>

    {/* Plantation */}

    <div className="feature">

        <div className="feature-image">

            <img src={plantation} alt="Plantation Activity"/>

        </div>

        <div className="feature-content">

            <span>Environmental Awareness</span>

            <h3>Plantation Drive</h3>

            <p>
                Our students actively participate in plantation drives to
                understand the importance of protecting nature and creating
                a greener future.
            </p>

            <ul>

                <li>🌱 Tree Plantation</li>

                <li>🌿 Eco Awareness</li>

                <li>♻ Clean Campus Campaign</li>

            </ul>

            <Link
            to="/gallery"
            className="feature-btn"
            >
                View Gallery
            </Link>

        </div>

    </div>

    {/* Sports */}

    <div className="feature reverse">

        <div className="feature-image">

            <img src={sports} alt="Sports"/>

        </div>

        <div className="feature-content">

            <span>Physical Development</span>

            <h3>Sports Activities</h3>

            <p>
                Sports help children develop teamwork, confidence,
                discipline and healthy competition.
            </p>

            <ul>

                <li>⚽ Football</li>

                <li>🏃 Running</li>

                <li>🏅 Sports Day Events</li>

            </ul>

            <Link
            to="/gallery"
            className="feature-btn"
            >
                View Gallery
            </Link>

        </div>

    </div>

    {/* Art */}

    <div className="feature">

        <div className="feature-image">

            <img src={art} alt="Art"/>

        </div>

        <div className="feature-content">

            <span>Creative Learning</span>

            <h3>Art & Craft</h3>

            <p>
                Creative activities encourage imagination,
                innovation and artistic expression.
            </p>

            <ul>

                <li>🎨 Drawing</li>

                <li>🖌 Painting</li>

                <li>✂ Craft Making</li>

            </ul>

            <Link
            to="/gallery"
            className="feature-btn"
            >
                View Gallery
            </Link>

        </div>

    </div>

    {/* Yoga */}

    <div className="feature reverse">

        <div className="feature-image">

            {/* <img src={yoga} alt="Yoga"/> */}

        </div>

        <div className="feature-content">

            <span>Healthy Lifestyle</span>

            <h3>Yoga Sessions</h3>

            <p>
                Yoga improves flexibility, concentration,
                emotional well-being and discipline among children.
            </p>

            <ul>

                <li>🧘 Daily Yoga</li>

                <li>💚 Healthy Living</li>

                <li>🧠 Better Focus</li>

            </ul>

            <Link
            to="/gallery"
            className="feature-btn"
            >
                View Gallery
            </Link>

        </div>

    </div>

</section>

{/* ================= UPCOMING EVENTS ================= */}

<section className="upcoming-events">

    <h2>Upcoming Events</h2>

    <div className="event-grid">

        <div className="event-card">
            <span>15 Aug</span>
            <h3>Independence Day</h3>
            <p>Flag Hoisting, Cultural Programs & Speeches</p>
        </div>

        <div className="event-card">
            <span>05 Sep</span>
            <h3>Teacher's Day</h3>
            <p>Celebrating our respected teachers.</p>
        </div>

        <div className="event-card">
            <span>14 Nov</span>
            <h3>Children's Day</h3>
            <p>Games, Fun Activities & Performances.</p>
        </div>

        <div className="event-card">
            <span>20 Dec</span>
            <h3>Annual Day</h3>
            <p>Dance, Drama, Awards & Cultural Events.</p>
        </div>

    </div>

</section>

    </>
  );
}

export default Activities;