import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaPlaneDeparture,
  FaPlus,
  FaMapMarkerAlt,
  FaWallet,
  FaCheckCircle,
} from "react-icons/fa";

import { getUserTrips } from "../services/api";

import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

import "../styles/Dashboard.css";

const DashboardPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getUserTrips();
      setTrips(data);
    } catch (err) {
      setError(err.message || "Failed to load trips.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const totalBudget = trips.reduce(
    (acc, trip) => acc + Number(trip.budget || 0),
    0
  );

  return (
    <div className="dashboard-page">
      {/* HEADER */}

      <div className="dashboard-header">
        <div>
          <h1>My Trips ✈️</h1>
          <p>Manage and track all your planned journeys.</p>
        </div>

        <Link to="/create-trip" className="dashboard-create-btn">
          <FaPlus />
          <span>Create Trip</span>
        </Link>
      </div>

      {/* STATS */}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-label">Total Trips</div>
          <div className="stat-card-value">
            {trips.length}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">Total Budget</div>
          <div className="stat-card-value accent">
            ₹{totalBudget}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">Completed</div>
          <div className="stat-card-value">
            {
              trips.filter(
                (trip) =>
                  trip.status?.toLowerCase() === "completed"
              ).length
            }
          </div>
        </div>
      </div>

      {/* ERROR */}

      {error && <ErrorMessage message={error} />}

      {/* TRIPS */}

      <div className="trips-section-head">
        <h2>Your Recent Trips</h2>
      </div>

      {trips.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FaPlaneDeparture />
          </div>

          <h3>No trips planned yet</h3>

          <p>
            Start planning your dream destination with AI-powered travel
            itineraries.
          </p>

          <Link to="/create-trip" className="dashboard-create-btn">
            <FaPlus />
            <span>Create Your First Trip</span>
          </Link>
        </div>
      ) : (
        <div className="trips-grid">
          {trips.map((trip) => (
            <Link
              to={`/trip/${trip.id}`}
              key={trip.id}
              className="trip-card"
            >
              <div className="trip-card-top">
                <div className="trip-icon">
                  <FaMapMarkerAlt />
                </div>

                <div
                  className={`trip-status ${
                    trip.status?.toLowerCase() === "completed"
                      ? "completed"
                      : "pending"
                  }`}
                >
                  <FaCheckCircle />
                  <span>{trip.status}</span>
                </div>
              </div>

              <h3>
                {trip.source} → {trip.destination}
              </h3>

              <div className="trip-budget">
                <FaWallet />
                <span>₹{trip.budget}</span>
              </div>

              <div className="trip-card-footer">
                View Details →
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;