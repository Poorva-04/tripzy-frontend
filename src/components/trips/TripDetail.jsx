import {
  FaCalendarAlt,
  FaTrash,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import Loader from "../common/Loader";
import ItineraryPreview from "../ai/ItineraryPreview";

const TripDetail = ({ trip, deleting, onDelete }) => (
  <>
    <section className="trip-detail-hero">
      <div>
        <p className="eyebrow">{trip.status || "PLANNED"}</p>
        <h1>{trip.source} to {trip.destination}</h1>
        <p>{trip.interests || "Personalized travel plan"}</p>
      </div>
      <button className="danger-action" type="button" onClick={onDelete} disabled={deleting}>
        {deleting ? <Loader size="sm" inline /> : <><FaTrash /> Delete</>}
      </button>
    </section>

    <section className="trip-facts">
      <div>
        <FaCalendarAlt />
        <span>{trip.startDate} - {trip.endDate}</span>
      </div>
      <div>
        <FaUsers />
        <span>{trip.travelers} traveller{trip.travelers === 1 ? "" : "s"}</span>
      </div>
      <div>
        <FaWallet />
        <span>Rs. {Number(trip.budget || 0).toLocaleString("en-IN")}</span>
      </div>
    </section>

    <section className="trip-preferences">
      <div>
        <span>Transportation</span>
        <strong>{trip.transportation || "Flexible"}</strong>
      </div>
      <div>
        <span>Accommodation</span>
        <strong>{trip.accommodation || "Flexible"}</strong>
      </div>
      <div>
        <span>Duration</span>
        <strong>{trip.days || 1} day{trip.days === 1 ? "" : "s"}</strong>
      </div>
    </section>

   <ItineraryPreview
  itinerary={
    typeof trip.itinerary === "string"
      ? JSON.parse(trip.itinerary)
      : trip.itinerary
  }
/>
  </>
);

export default TripDetail;