
import { useEffect, useState } from "react";
import Hero from "../components/hero";
import "./Activities.css";

const EVENTS_API =
  "https://nurture-grow-backend.onrender.com/api/events";

const NOTICES_API =
  "https://nurture-grow-backend.onrender.com/api/notices";

function Activities() {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);

  const [eventsLoading, setEventsLoading] = useState(true);
  const [noticesLoading, setNoticesLoading] = useState(true);

  const [eventsError, setEventsError] = useState("");
  const [noticesError, setNoticesError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(EVENTS_API);

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setEventsError("Unable to load events at the moment.");
      } finally {
        setEventsLoading(false);
      }
    };

    const fetchNotices = async () => {
      try {
        const response = await fetch(NOTICES_API);

        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }

        const data = await response.json();
        setNotices(data);
      } catch (error) {
        setNoticesError("Unable to load notices at the moment.");
      } finally {
        setNoticesLoading(false);
      }
    };

    fetchEvents();
    fetchNotices();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Not specified";

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

      {/* INTRO SECTION */}
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

      {/* NOTICE BOARD */}
      <section className="notice-board-section">
        <div className="notice-board-heading">
          <span>Stay Updated</span>
          <h2>Notice Board</h2>
          <p>
            Important announcements and updates for parents.
          </p>
        </div>

        {noticesLoading && (
          <p className="notice-board-status">
            Loading notices...
          </p>
        )}

        {noticesError && (
          <p className="notice-board-status notice-board-error">
            {noticesError}
          </p>
        )}

        {!noticesLoading &&
          !noticesError &&
          notices.length === 0 && (
            <p className="notice-board-status">
              No notices available at the moment.
            </p>
          )}

        {!noticesLoading &&
          !noticesError &&
          notices.length > 0 && (
            <div className="notice-board-list">
              {notices.map((notice) => (
                <article
                  className="public-notice-card"
                  key={notice._id}
                >
                  <div className="public-notice-top">
                    <span className="public-notice-category">
                      {notice.category}
                    </span>

                    <span className="public-notice-date">
                      <i className="fa-regular fa-calendar"></i>
                      {formatDate(notice.noticeDate)}
                    </span>
                  </div>

                  <h3>{notice.title}</h3>

                  <p className="public-notice-description">
                    {notice.description}
                  </p>

                  {notice.expiryDate && (
                    <p className="public-notice-expiry">
                      Valid until: {formatDate(notice.expiryDate)}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
      </section>

      {/* SCHOOL EVENTS */}
      <section className="school-events-section">
        <div className="school-events-heading">
          <span>What's Happening</span>
          <h2>Our School Events</h2>
          <p>
            Discover the latest events and celebrations at our school.
          </p>
        </div>

        {eventsLoading && (
          <p className="school-events-status">
            Loading events...
          </p>
        )}

        {eventsError && (
          <p className="school-events-status school-events-error">
            {eventsError}
          </p>
        )}

        {!eventsLoading &&
          !eventsError &&
          events.length === 0 && (
            <p className="school-events-status">
              No events available at the moment. Stay tuned!
            </p>
          )}

        {!eventsLoading &&
          !eventsError &&
          events.length > 0 && (
            <div className="school-events-grid">
              {events.map((event) => (
                <article
                  className="school-event-card"
                  key={event._id}
                >
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
