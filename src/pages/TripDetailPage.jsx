import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { deleteTrip, getTripById } from "../services/api";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import TripDetail from "../components/trips/TripDetail";
import "../styles/TripDetail.css";

const TripDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrip = async () => {
      setError("");
      setLoading(true);
      try {
        const data = await getTripById(id);
        setTrip(data);
      } catch (err) {
        setError(err.message || "Unable to load trip.");
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this trip permanently?");
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteTrip(id);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Unable to delete trip.");
      setDeleting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="app-page trip-detail-page">
      <Link to="/dashboard" className="back-link">
        <FaArrowLeft /> Back to trips
      </Link>

      {error && <ErrorMessage message={error} />}

      {!trip ? (
        <div className="empty-state">
          <h2>Trip not found</h2>
          <p>This itinerary may have been deleted.</p>
        </div>
      ) : (
        <TripDetail trip={trip} deleting={deleting} onDelete={handleDelete} />
      )}
    </main>
  );
};

export default TripDetailPage;