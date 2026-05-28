import {
  FaSun,
  FaCloudSun,
  FaMoon,
  FaUtensils,
  FaHotel,
  FaMapMarkerAlt,
  FaLightbulb,
  FaSuitcaseRolling,
} from "react-icons/fa";

import "./ItineraryPreview.css";

const getTimeIcon = (time) => {
  switch (time?.toLowerCase()) {
    case "morning":
      return <FaSun />;

    case "afternoon":
      return <FaCloudSun />;

    case "evening":
      return <FaMoon />;

    default:
      return <FaMapMarkerAlt />;
  }
};

const ItineraryPreview = ({ itinerary }) => {
  console.log("ITINERARY DATA:", itinerary);

  // EMPTY STATE
  if (
    !itinerary ||
    !itinerary.itinerary ||
    !Array.isArray(itinerary.itinerary)
  ) {
    return (
      <div className="itinerary-empty">
        <div className="empty-icon">
          <FaSuitcaseRolling />
        </div>

        <h2>Your AI itinerary will appear here</h2>

        <p>
          Fill your trip details and generate a premium AI-powered
          travel experience ✨
        </p>
      </div>
    );
  }

  return (
    <div className="itinerary-wrapper">

      {/* HERO */}
      <div className="itinerary-hero">

        <div>
          <p className="trip-badge">
            AI Generated Journey
          </p>

          <h1>
            {itinerary.tripDetails?.from}
            <span> → </span>
            {itinerary.tripDetails?.to}
          </h1>

          <p className="trip-dates">
            {itinerary.tripDetails?.startDate}
            {" • "}
            {itinerary.tripDetails?.endDate}
          </p>
        </div>

        <div className="trip-budget">
          ₹{itinerary.tripDetails?.budget}

          <span>Total Budget</span>
        </div>

      </div>

      {/* DAYS */}
      {itinerary.itinerary.map((day) => (

        <div className="day-card" key={day.day}>

          {/* HEADER */}
          <div className="day-header">

            <div className="day-number">
              Day {day.day}
            </div>

            <div>
              <h2>{day.title}</h2>

              <p>{day.mood}</p>
            </div>

          </div>

          {/* ACTIVITIES */}
          <div className="activities-grid">

            {day.activities?.map((activity, index) => (

              <div className="activity-card" key={index}>

                <div className="activity-top">

                  <div className="activity-icon">
                    {getTimeIcon(activity.time)}
                  </div>

                  <div>

                    <span className="activity-time">
                      {activity.time}
                    </span>

                    <h3>{activity.title}</h3>

                  </div>

                </div>

                <p className="activity-description">
                  {activity.description}
                </p>

                <div className="activity-footer">

                  <span>
                    <FaMapMarkerAlt />
                    {activity.location}
                  </span>

                  <span className="activity-cost">
                    ₹{activity.estimatedCost}
                  </span>

                </div>

              </div>

            ))}

          </div>

          {/* EXTRA SECTION */}
          <div className="extras-grid">

            <div className="extra-card food-card">

              <FaUtensils />

              <div>
                <h4>Food Recommendation</h4>

                <p>{day.foodRecommendation}</p>
              </div>

            </div>

            <div className="extra-card hotel-card">

              <FaHotel />

              <div>
                <h4>Stay Suggestion</h4>

                <p>{day.hotelSuggestion}</p>
              </div>

            </div>

            <div className="extra-card tips-card">

              <FaLightbulb />

              <div>

                <h4>Travel Tips</h4>

                <ul>
                  {day.travelTips?.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
};

export default ItineraryPreview;