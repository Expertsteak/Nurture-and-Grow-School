import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import "./Career.css";
import Hero from "../components/hero";

function Career() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    position: "",
  });

  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // HANDLE RESUME
  const handleResume = (e) => {
    setResume(e.target.files[0]);
  };

  // SUBMIT FORM
   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await addDoc(
        collection(db, "careerApplications"),
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          qualification: formData.qualification,
          experience: formData.experience,
          position: formData.position,

          // Resume will be connected to Storage later(need to ask about it)
          resumeName: resume ? resume.name : "",
          createdAt: serverTimestamp(),
        }
      );
      setMessage(
        "Application submitted successfully! 🎉"
      );

      // Clear form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        qualification: "",
        experience: "",
        position: "",
      });
      setResume(null);

      // Reset file input
      document.getElementById("resume").value = "";

    } catch (error) {
      console.error(
        "Error submitting application:",
        error
      );
      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero
       title="Career "
       subtitle="We provide best career opportunities."
       />
      {/*WHY WORK WITH US */}

      <section className="why-work">
        <h2>Why Work With Us?</h2>
        <div className="why-grid">

          <div className="why-card">
            <i className="fa-solid fa-people-group"></i>
            <h3>Supportive Environment</h3>
            <p>
              Work with a caring and supportive team
              that values collaboration and respect.
            </p>
          </div>

          <div className="why-card">
            <i className="fa-solid fa-graduation-cap"></i>
            <h3>Professional Growth</h3>
            <p>
              Opportunities to learn, develop new skills,
              and grow professionally.
            </p>
          </div>

          <div className="why-card">
            <i className="fa-solid fa-child-reaching"></i>
            <h3>Make a Difference</h3>
            <p>
              Help children learn, grow, and build
              strong foundations for their future.
            </p>
          </div>

          <div className="why-card">
            <i className="fa-solid fa-heart"></i>
            <h3>Meaningful Work</h3>
            <p>
              Be part of an environment where education,
              care, and values come together.
            </p>
          </div>

        </div>
      </section>

      {/*APPLICATION FORM*/}

      <section className="career-form">

        <h2>Teaching Application Form</h2>
        <p className="form-intro">
          Interested in joining our team?
          Fill out the application form below.
        </p>

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required/>
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required/>
          </div>

          {/* PHONE */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required/>
          </div>

          {/* QUALIFICATION */}
          <div className="form-group">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              placeholder="e.g. B.Ed, M.Ed, M.A."
              value={formData.qualification}
              onChange={handleChange}
              required/>
          </div>

          {/* EXPERIENCE */}
          <div className="form-group">
            <label htmlFor="experience">Experience</label>
            <input
              type="text"
              id="experience"
              name="experience"
              placeholder="e.g. 2 years"
              value={formData.experience}
              onChange={handleChange}
              required/>
          </div>

          {/* POSITION */}
          <div className="form-group">
            <label htmlFor="position">Position Applying For</label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required>
              <option value="">Select a position</option>
              <option value="Primary Teacher">Primary Teacher</option>
              <option value="Pre-Primary Teacher">Pre-Primary Teacher</option>
              <option value="Subject Teacher">Subject Teacher</option>
              <option value="Art & Craft Teacher">Art & Craft Teacher</option>
              <option value="Sports Teacher">Sports Teacher</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* RESUME */}
          <div className="form-group">
            <label htmlFor="resume">Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResume}/>
           {/*We'll see to it later */}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading?
             "Submitting..." : "Submit Application"
            }
          </button>

          {/* MESSAGE */}
          {message && (
            <p className="form-message">
              {message}
            </p>
          )}
        </form>
      </section>
    </>
  );
}
export default Career;