import "./Admissions.css";

function Admissions() {
  return (
    <>
      {/* ================= ADMISSION HERO ================= */}

<section className="admission-hero">

  <div className="admission-hero-content">

    <span className="hero-small-title">
      ADMISSIONS ARE OPEN
    </span>

    <h1>
      Start Your Child's
      <span>Learning Journey</span>
    </h1>

    <p>
      Give your child a caring and inspiring environment
      where they can learn, explore, grow and become
      confident individuals.
    </p>

    <div className="hero-buttons">

      <a href="#enquiry" className="btn">
        Enquire Now
        <i className="fa-solid fa-arrow-right"></i>
      </a>

      <a href="#process" className="btn btn-outline">
        Admission Process
      </a>

    </div>

     
  </div>

</section>

      {/* ================= ELIGIBILITY ================= */}

      <section className="eligibility">

        <div className="section-heading">

          <span>ELIGIBILITY</span>

          <h2>
            Who Can
            <strong> Apply?</strong>
          </h2>

          <p>
            Admissions are available for children from Nursery
            to Grade 5 according to the applicable age and class
            requirements.
          </p>

        </div>


        <div className="eligibility-cards">

          <div className="eligibility-card">
            <i className="fa-solid fa-child"></i>
            <h3>Nursery</h3>
            <p>
              Early learning with a fun and child-friendly
              environment.
            </p>
          </div>

          <div className="eligibility-card">
            <i className="fa-solid fa-book-open"></i>
            <h3>Primary Classes</h3>
            <p>
              Admissions available from Grade 1 to Grade 5.
            </p>
          </div>

          <div className="eligibility-card">
            <i className="fa-solid fa-user-check"></i>
            <h3>Age Requirement</h3>
            <p>
              Age eligibility will be considered according to
              the class applied for.
            </p>
          </div>

        </div>

      </section>


      {/* ================= DOCUMENTS ================= */}

      <section className="documents">

        <div className="section-heading">

          <span>REQUIRED DOCUMENTS</span>

          <h2>
            Documents You
            <strong> Need</strong>
          </h2>

        </div>


        <div className="document-list">

          <div className="document-item">
            <i className="fa-solid fa-id-card"></i>
            <span>Birth Certificate</span>
          </div>

          <div className="document-item">
            <i className="fa-solid fa-file-lines"></i>
            <span>Previous School Records</span>
          </div>

          <div className="document-item">
            <i className="fa-solid fa-address-card"></i>
            <span>Parent / Guardian ID Proof</span>
          </div>

          <div className="document-item">
            <i className="fa-solid fa-camera"></i>
            <span>Recent Passport Size Photograph</span>
          </div>

        </div>

      </section>


      {/* ================= ADMISSION PROCESS ================= */}

      <section className="admission-process" id="process">

        <div className="section-heading">

          <span>ADMISSION PROCESS</span>

          <h2>
            Simple Steps to
            <strong> Join Us</strong>
          </h2>

        </div>


        <div className="process-container">

          <div className="process-card">

            <div className="process-number">01</div>

            <i className="fa-solid fa-file-pen"></i>

            <h3>Enquiry</h3>

            <p>
              Submit your admission enquiry with the required
              details.
            </p>

          </div>


          <div className="process-card">

            <div className="process-number">02</div>

            <i className="fa-solid fa-comments"></i>

            <h3>Interaction</h3>

            <p>
              Our school team will contact you and guide you
              through the process.
            </p>

          </div>


          <div className="process-card">

            <div className="process-number">03</div>

            <i className="fa-solid fa-folder-open"></i>

            <h3>Documents</h3>

            <p>
              Submit the required documents for verification.
            </p>

          </div>


          <div className="process-card">

            <div className="process-number">04</div>

            <i className="fa-solid fa-circle-check"></i>

            <h3>Confirmation</h3>

            <p>
              Complete the admission formalities and confirm
              your child's admission.
            </p>

          </div>

        </div>

      </section>


      {/* ================= ENQUIRY FORM ================= */}

      <section className="enquiry" id="enquiry">

        <div className="enquiry-content">

          <span className="section-label">
            ADMISSION ENQUIRY
          </span>

          <h2>
            Interested in
            <strong> Joining Us?</strong>
          </h2>

          <p>
            Fill in your details and our school team will get
            in touch with you.
          </p>

        </div>


        <form className="admission-form">

          <input
            type="text"
            name="parentName"
            placeholder="Parent / Guardian Name"
          />

          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
          />

          <select name="class">
            <option value="">Select Class</option>
            <option value="nursery">Nursery</option>
            <option value="lkg">LKG</option>
            <option value="ukg">UKG</option>
            <option value="grade1">Grade 1</option>
            <option value="grade2">Grade 2</option>
            <option value="grade3">Grade 3</option>
            <option value="grade4">Grade 4</option>
            <option value="grade5">Grade 5</option>
          </select>

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
          ></textarea>

          <button type="submit">
            Submit Enquiry
            <i className="fa-solid fa-paper-plane"></i>
          </button>

        </form>

      </section>

    </>
  );
}

export default Admissions;