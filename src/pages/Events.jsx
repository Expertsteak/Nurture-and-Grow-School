
import { useEffect, useState } from "react";
import "./Events.css";

const API_URL = "https://nurture-grow-backend.onrender.com/api/events";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load events.");
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError("Unable to load events. Please try again later.");
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
    <div className="events-page">
      <section className="events-header">
        <h1>School Events</h1>
        <p>
          Explore the exciting events, celebrations and activities
          happening at Nurture and Grow Primary School.
        </p>
      </section>

      <section className="events-container">
        {loading && <p className="events-status">Loading events...</p>}

        {error && <p className="events-status events-error">{error}</p>}

        {!loading && !error && events.length === 0 && (
          <p className="events-status">No events available at the moment.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="events-grid">
            {events.map((event) => (
              <article className="event-card" key={event._id}>
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="event-image"
                  />
                )}

                <div className="event-content">
                  <h2>{event.title}</h2>

                  <div className="event-meta">
                    <p>
                      <strong>Date:</strong> {formatDate(event.date)}
                    </p>
                    <p>
                      <strong>Time:</strong> {event.time}
                    </p>
                    <p>
                      <strong>Location:</strong> {event.location}
                    </p>
                  </div>

                  <p className="event-description">{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Events;
