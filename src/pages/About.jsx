import Hero from "../components/hero";
import { Link } from "react-router-dom";
import "./About.css";
import aboutImage from "../assets/school.webp";

function About() {
  return (
    <div className="about-page">

      {/*PAGE HERO */}
        <Hero
       tag="ABOUT OUR SCHOOL"
       title="Nurturing Young Minds, Building Bright Futures"
       subtitle="Discover our journey, vision and commitment towards providing quality education for every child."
       />
    
      {/* SCHOOL INTRODUCTION*/}

      <section className="school-introduction">

        <div className="about-school-image">
          <img
            src={aboutImage}
            alt="Nurture and Grow Primary School"
          />
        </div>
      
        <div className="introduction-content">

          <span className="section-label">
            WHO WE ARE
          </span>

          <h2>
            Welcome to
            <strong> Nurture & Grow</strong>
          </h2>

          <p>
            Nurture & Grow Primary School is committed to providing
            high-quality English medium education in a caring,
            safe and inspiring environment.
          </p>

          <p>
            We believe that every child is unique and deserves
            the right opportunities to discover their talents,
            develop confidence and build strong foundations for
            the future.
          </p>

          <p>
            From Nursery to Grade 7, we focus on academic learning,
            creativity, discipline, communication skills and
            overall personality development.
          </p>

          <Link to="/admissions" className="btn">
            Join Our School
            <i className="fa-solid fa-arrow-right"></i>
          </Link>

        </div>

      </section>


      {/*MISSION & VISION*/}

      <section className="mission-vision">

        <div className="section-heading">

          <span>OUR PURPOSE</span>

          <h2>
            Our Mission &
            <strong> Vision</strong>
          </h2>

          <p>
            Creating a strong foundation for every child's
            educational and personal growth.
          </p>

        </div>


        <div className="mission-vision-grid">

          {/* MISSION */}

          <div className="purpose-card">

            <div className="purpose-icon">
              <i className="fa-solid fa-bullseye"></i>
            </div>

            <span>OUR MISSION</span>

            <h3>
              Inspiring Every Child to Learn
            </h3>

            <p>
              Our mission is to provide quality education through
              innovative and activity-based learning while
              developing confidence, discipline, creativity and
              strong moral values in every child.
            </p>

          </div>


          {/* VISION */}

          <div className="purpose-card vision-card">

            <div className="purpose-icon">
              <i className="fa-solid fa-eye"></i>
            </div>

            <span>OUR VISION</span>

            <h3>
              Building Confident Future Leaders
            </h3>

            <p>
              Our vision is to create an environment where children
              grow into confident, responsible and compassionate
              individuals who are prepared to face the future.
            </p>

          </div>

        </div>

      </section>


      {/*CORE VALUES*/}

      <section className="core-values">

        <div className="section-heading">

          <span>WHAT WE BELIEVE IN</span>

          <h2>
            Our Core
            <strong> Values</strong>
          </h2>

          <p>
            Values that guide our students towards becoming
            responsible and confident individuals.
          </p>

        </div>


        <div className="values-grid">

          <div className="value-card">

            <div className="value-icon">
              <i className="fa-solid fa-heart"></i>
            </div>

            <h3>Kindness</h3>

            <p>
              Encouraging children to care, respect and support
              one another.
            </p>

          </div>


          <div className="value-card">

            <div className="value-icon">
              <i className="fa-solid fa-star"></i>
            </div>

            <h3>Excellence</h3>

            <p>
              Motivating every child to give their best in
              everything they do.
            </p>

          </div>


          <div className="value-card">

            <div className="value-icon">
              <i className="fa-solid fa-handshake"></i>
            </div>

            <h3>Respect</h3>

            <p>
              Building a culture of respect, honesty and
              understanding.
            </p>

          </div>


          <div className="value-card">

            <div className="value-icon">
              <i className="fa-solid fa-lightbulb"></i>
            </div>

            <h3>Creativity</h3>

            <p>
              Encouraging curiosity, imagination and new ideas
              through learning.
            </p>

          </div>


          <div className="value-card">

            <div className="value-icon">
              <i className="fa-solid fa-people-group"></i>
            </div>

            <h3>Teamwork</h3>

            <p>
              Teaching children the importance of cooperation
              and working together.
            </p>

          </div>


          <div className="value-card">

            <div className="value-icon">
              <i className="fa-solid fa-seedling"></i>
            </div>

            <h3>Growth</h3>

            <p>
              Helping every child grow academically,
              emotionally and socially.
            </p>

          </div>

        </div>

      </section>


      {/*PRINCIPAL MESSAGE*/}

      <section className="principal">

        <div className="principal-box">

          {/* PRINCIPAL IMAGE — ADD LATER */}

          {/*
          <div className="principal-image">
            <img
              src="/images/principal.jpg"
              alt="Principal"
            />
          </div>
          */}


          <div className="principal-content">

            <span className="section-label">
              PRINCIPAL'S MESSAGE
            </span>

            <h2>
              Every Child Has
              <strong> Great Potential</strong>
            </h2>

            <p>
              At Nurture & Grow Primary School, we believe that
              education is not only about books and examinations.
              It is about helping children discover who they are,
              develop confidence and learn how to contribute
              positively to the world around them.
            </p>

            <p>
              Our teachers work closely with students to create
              a supportive learning environment where every child
              feels valued and encouraged.
            </p>

            <div className="principal-signature">

              <strong>Principal</strong>

              <span>
                Nurture & Grow Primary School
              </span>

            </div>

          </div>

        </div>

      </section>


      {/*PARENTS TESTIMONIALS*/}

      <section className="about-testimonials">

        <div className="section-heading">

          <span>PARENTS' VOICES</span>

          <h2>
            What Parents
            <strong> Say About Us</strong>
          </h2>

          <p>
            The trust and support of our parents motivates us
            to continue creating a better learning environment.
          </p>

        </div>


        <div className="testimonial-grid">

          <div className="testimonial">

            <div className="quote-icon">
              <i className="fa-solid fa-quote-left"></i>
            </div>

            <p>
              "The teachers are very caring and supportive.
              We have seen a positive change in our child's
              confidence and learning."
            </p>

            <div className="parent-info">
              <div className="parent-icon">
                <i className="fa-solid fa-user"></i>
              </div>

              <div>
                <h3>Parent</h3>
                <span>Grade 3</span>
              </div>
            </div>

          </div>


          <div className="testimonial">

            <div className="quote-icon">
              <i className="fa-solid fa-quote-left"></i>
            </div>

            <p>
              "We really appreciate the activity-based learning
              and the friendly environment provided by the school."
            </p>

            <div className="parent-info">
              <div className="parent-icon">
                <i className="fa-solid fa-user"></i>
              </div>

              <div>
                <h3>Parent</h3>
                <span>Grade 4</span>
              </div>
            </div>

          </div>


          <div className="testimonial">

            <div className="quote-icon">
              <i className="fa-solid fa-quote-left"></i>
            </div>

            <p>
              "Nurture & Grow provides a safe and positive
              environment where children can learn and grow
              with confidence."
            </p>

            <div className="parent-info">
              <div className="parent-icon">
                <i className="fa-solid fa-user"></i>
              </div>

              <div>
                <h3>Parent</h3>
                <span>Grade 2</span>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/*BOTTOM CTA */}

      <section className="about-cta">

        <div className="about-cta-content">

          <span>START YOUR CHILD'S JOURNEY</span>

          <h2>
            Let's Grow
            <strong> Together</strong>
          </h2>

          <p>
            Give your child a caring environment where learning,
            creativity and confidence can grow together.
          </p>

          <Link to="/admissions" className="btn">
            Apply for Admission
            <i className="fa-solid fa-arrow-right"></i>
          </Link>

        </div>

      </section>

    </div>
  );
}

export default About;