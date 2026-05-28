import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { createTrip, previewItinerary } from "../services/api";
import ErrorMessage from "../components/common/ErrorMessage";
import ItineraryPreview from "../components/ai/ItineraryPreview";
import TripForm from "../components/trips/TripForm";
import "../styles/CreateTrip.css";
 
const CreateTripPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    source: "",
    destination: "",
    startDate: "",
    endDate: "",
    days: 1,
    travelers: 1,
    budget: "",
    interests: "",
    transportation: "Flight",
    accommodation: "Hotel",
  });
  const [itinerary, setItinerary] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
 
  const calculatedDays = useMemo(() => {
    if (!form.startDate || !form.endDate) return Number(form.days) || 1;
    const diff =
      Math.round(
        (new Date(form.endDate) - new Date(form.startDate)) / 86400000,
      ) + 1;
    return diff > 0 ? diff : 1;
  }, [form.startDate, form.endDate, form.days]);
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
 
  const payload = () => ({
    ...form,
    days: calculatedDays,
    travelers: Number(form.travelers) || 1,
    budget: Number(form.budget) || 0,
  });
 
  const validate = () => {
    if (!form.source.trim()) return "Starting city is required.";
    if (!form.destination.trim()) return "Destination is required.";
    if (!form.startDate || !form.endDate)
      return "Start and end dates are required.";
    if (new Date(form.endDate) < new Date(form.startDate))
      return "End date must be after start date.";
    if (!Number(form.budget)) return "Budget is required.";
    return "";
  };
 
  const handlePreview = async (event) => {
    event.preventDefault();
    const validation = validate();
    if (validation) return setError(validation);
 
    setError("");
    setLoadingPreview(true);
    try {
      const data = await previewItinerary(payload());

console.log("AI RESPONSE:", data);

setItinerary(data);
      setItinerary(data);
    } catch (err) {
      setError(err.message || "Unable to generate itinerary.");
    } finally {
      setLoadingPreview(false);
    }
  };
 
  const handleSave = async () => {
    const validation = validate();
    if (validation) return setError(validation);
 
    setError("");
    setSaving(true);
    try {
      const trip = await createTrip(payload());
      navigate(`/trip/${trip.id}`);
    } catch (err) {
      setError(err.message || "Unable to save trip.");
    } finally {
      setSaving(false);
    }
  };
 
  return (
    <main className="app-page create-trip-page">
      <section className="page-hero compact-hero">
        <div>
          <p className="eyebrow">✈ AI Trip Planner</p>
          <h1>Create a Trip</h1>
          <p>
            Tell Tripzy where you want to go. Preview an AI-generated itinerary,
            then save it to your dashboard.
          </p>
        </div>
        <div className="hero-pill">
          <FaCalendarAlt />
          {calculatedDays} {calculatedDays === 1 ? "day" : "days"}
        </div>
      </section>
 
      {error && <ErrorMessage message={error} />}
 
      <div className="planner-layout">
        <TripForm
          form={form}
          calculatedDays={calculatedDays}
          loadingPreview={loadingPreview}
          saving={saving}
          onChange={handleChange}
          onPreview={handlePreview}
          onSave={handleSave}
        />
 
        <ItineraryPreview itinerary={itinerary} />
      </div>
    </main>
  );
};
 
export default CreateTripPage;