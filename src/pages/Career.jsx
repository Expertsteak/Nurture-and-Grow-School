import "./Career.css";

import { useState } from "react";

import { db, storage } from "./firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

function Career() {

  const [loading, setLoading] = useState(false);

  const [resume, setResume] = useState(null);

  const [formData, setFormData] = useState({

    fullName: "",

    email: "",

    phone: "",

    qualification: "",

    experience: "",

    position: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!resume) {

      alert("Please upload your resume.");

      return;

    }

    try {

      setLoading(true);

      // Upload Resume

      const storageRef = ref(

        storage,

        `career-resumes/${Date.now()}-${resume.name}`

      );

      await uploadBytes(storageRef, resume);

      const resumeURL = await getDownloadURL(storageRef);

      // Save Data

      await addDoc(

        collection(db, "careerApplications"),

        {

          ...formData,

          resumeURL,

          createdAt: serverTimestamp(),

        }

      );

      alert("Application Submitted Successfully ✅");

      setFormData({

        fullName: "",

        email: "",

        phone: "",

        qualification: "",

        experience: "",

        position: "",

      });

      setResume(null);

      document.getElementById("resume").value = "";

    }

    catch (err) {

      console.log(err);

      alert("Something went wrong.");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <>

      {/* HERO */}

      <section className="career-hero">

        <div className="hero-content">

          <h1>Join Our Team</h1>

          <p>

            Inspire young minds and build a brighter future with

            Nurture & Grow Primary School.

          </p>

        </div>

      </section>

      {/* WHY WORK */}

      <section className="why-work">

        <h2>Why Work With Us?</h2>

        <div className="why-grid">

          <div className="why-card">

            <i className="fa-solid fa-graduation-cap"></i>

            <h3>Professional Growth</h3>

            <p>

              Continuous learning and career development.

            </p>

          </div>

          <div className="why-card">

            <i className="fa-solid fa-users"></i>

            <h3>Friendly Environment</h3>

            <p>

              Work with supportive teachers and staff.

            </p>

          </div>

          <div className="why-card">

            <i className="fa-solid fa-book-open"></i>

            <h3>Modern Teaching</h3>

            <p>

              Activity-based learning with quality education.

            </p>

          </div>

          <div className="why-card">

            <i className="fa-solid fa-heart"></i>

            <h3>Respect & Values</h3>

            <p>

              We believe in ethics, respect and teamwork.

            </p>

          </div>

        </div>

      </section>

      {/* APPLICATION FORM */}

      <section className="career-form">

        <h2>Teaching Application Form</h2>

        <form onSubmit={handleSubmit}>

          <input

            type="text"

            name="fullName"

            placeholder="Full Name"

            value={formData.fullName}

            onChange={handleChange}

            required

          />

          <input

            type="email"

            name="email"

            placeholder="Email Address"

            value={formData.email}

            onChange={handleChange}

            required

          />

          <input

            type="tel"

            name="phone"

            placeholder="Phone Number"

            value={formData.phone}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="qualification"

            placeholder="Qualification"

            value={formData.qualification}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="experience"

            placeholder="Experience"

            value={formData.experience}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="position"

            placeholder="Position Applying For"

            value={formData.position}

            onChange={handleChange}

            required

          />

          <input

            id="resume"

            type="file"

            accept=".pdf,.doc,.docx"

            onChange={(e) =>

              setResume(e.target.files[0])

            }

            required

          />

          <button

            type="submit"

            disabled={loading}

          >

            {

              loading

                ? "Submitting..."

                : "Submit Application"

            }

          </button>

        </form>

      </section>

    </>

  );

}

export default Career;