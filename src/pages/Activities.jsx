
import { useEffect, useState } from "react";
import Hero from "../components/hero";
import "./Activities.css";

const API_URL = "https://nurture-grow-backend.onrender.com/api/events";

function Activities() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError("Unable to load events at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <Hero
        title="School Events"
        subtitle="Celebrating Learning, Creativity & Togetherness"
      />

      {/* INTRO */}

      <section className="events-intro">
        <div className="events-intro-text">
          <span>Memories & Moments</span>
          <h2>Life at Nurture & Grow</h2>

          <p>
            At Nurture & Grow Primary School, every event is an
            opportunity for children to learn, explore, express
            themselves and create wonderful memories.
          </p>

          <p>
            From cultural celebrations and competitions to educational
            activities and special occasions, our school events help
            children build confidence, creativity, teamwork and
            meaningful friendships.
          </p>
        </div>
      </section>

      {/* EVENTS */}

      <section className="school-events-section">
        <div className="school-events-heading">
          <span>What's Happening</span>
          <h2>Our School Events</h2>
          <p>
            Discover the latest events and celebrations at our school.
          </p>
        </div>

        {loading && (
          <p className="school-events-status">Loading events...</p>
        )}

        {error && (
          <p className="school-events-status school-events-error">
            {error}
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="school-events-status">
            No events available at the moment. Stay tuned!
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="school-events-grid">
            {events.map((event) => (
              <article className="school-event-card" key={event._id}>
                {event.imageUrl && (
                  <div className="school-event-image-wrapper">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="school-event-image"
                    />
                  </div>
                )}

                <div className="school-event-content">
                  <div className="school-event-date">
                    <i className="fa-regular fa-calendar"></i>
                    <span>{formatDate(event.date)}</span>
                  </div>

                  <h3>{event.title}</h3>

                  <div className="school-event-details">
                    <p>
                      <i className="fa-regular fa-clock"></i>
                      <span>{event.time}</span>
                    </p>

                    <p>
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{event.location}</span>
                    </p>
                  </div>

                  <p className="school-event-description">
                    {event.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Activities;
