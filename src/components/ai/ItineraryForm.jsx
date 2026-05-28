import { useMemo, useState, useRef, useEffect } from "react";
import {
  FaCalendarAlt, FaMagic, FaSave, FaMapMarkerAlt,
  FaPlaneDeparture, FaUsers, FaWallet, FaChevronLeft,
  FaChevronRight, FaTimes,
} from "react-icons/fa";
import Loader from "../common/Loader";
 
/* ── 200 destinations ── */
const DESTINATIONS = [
  // India – Hill Stations
  "Manali, Himachal Pradesh","Shimla, Himachal Pradesh","Dharamshala, Himachal Pradesh",
  "McLeodganj, Himachal Pradesh","Kasol, Himachal Pradesh","Kufri, Himachal Pradesh",
  "Spiti Valley, Himachal Pradesh","Bir Billing, Himachal Pradesh","Auli, Uttarakhand",
  "Mussoorie, Uttarakhand","Nainital, Uttarakhand","Lansdowne, Uttarakhand",
  "Chopta, Uttarakhand","Munsiyari, Uttarakhand","Ranikhet, Uttarakhand",
  "Ooty, Tamil Nadu","Kodaikanal, Tamil Nadu","Yercaud, Tamil Nadu",
  "Coorg, Karnataka","Chikmagalur, Karnataka","Sakleshpur, Karnataka",
  "Munnar, Kerala","Wayanad, Kerala","Thekkady, Kerala",
  "Darjeeling, West Bengal","Kalimpong, West Bengal","Mirik, West Bengal",
  "Gangtok, Sikkim","Pelling, Sikkim","Lachung, Sikkim",
  "Tawang, Arunachal Pradesh","Ziro, Arunachal Pradesh","Bomdila, Arunachal Pradesh",
  "Shillong, Meghalaya","Cherrapunji, Meghalaya","Mawlynnong, Meghalaya",
  "Mount Abu, Rajasthan","Mahabaleshwar, Maharashtra","Matheran, Maharashtra",
  "Lonavala, Maharashtra","Panchgani, Maharashtra","Lavasa, Maharashtra",
  // India – Beaches
  "Goa","Varkala, Kerala","Kovalam, Kerala","Alleppey, Kerala",
  "Pondicherry","Mahabalipuram, Tamil Nadu","Rameswaram, Tamil Nadu",
  "Andaman & Nicobar Islands","Lakshadweep","Diu, Gujarat",
  "Alibaug, Maharashtra","Tarkarli, Maharashtra","Gokarna, Karnataka",
  "Murudeshwar, Karnataka","Malvan, Maharashtra",
  // India – Heritage & Culture
  "Jaipur, Rajasthan","Jodhpur, Rajasthan","Udaipur, Rajasthan",
  "Jaisalmer, Rajasthan","Pushkar, Rajasthan","Bikaner, Rajasthan",
  "Agra, Uttar Pradesh","Varanasi, Uttar Pradesh","Lucknow, Uttar Pradesh",
  "Mathura, Uttar Pradesh","Vrindavan, Uttar Pradesh","Orchha, Madhya Pradesh",
  "Khajuraho, Madhya Pradesh","Sanchi, Madhya Pradesh","Mandu, Madhya Pradesh",
  "Hampi, Karnataka","Mysore, Karnataka","Badami, Karnataka",
  "Hyderabad, Telangana","Warangal, Telangana","Golconda, Telangana",
  "Mahabalipuram, Tamil Nadu","Madurai, Tamil Nadu","Thanjavur, Tamil Nadu",
  "Kolkata, West Bengal","Bishnupur, West Bengal","Murshidabad, West Bengal",
  "Ahmedabad, Gujarat","Lothal, Gujarat","Dwarka, Gujarat","Somnath, Gujarat",
  "Amritsar, Punjab","Fatehpur Sikri, Uttar Pradesh","Bhopal, Madhya Pradesh",
  // India – Adventure & Nature
  "Leh, Ladakh","Nubra Valley, Ladakh","Pangong Lake, Ladakh",
  "Rishikesh, Uttarakhand","Haridwar, Uttarakhand","Kedarnath, Uttarakhand",
  "Badrinath, Uttarakhand","Valley of Flowers, Uttarakhand","Jim Corbett, Uttarakhand",
  "Ranthambore, Rajasthan","Kaziranga, Assam","Sundarbans, West Bengal",
  "Tadoba, Maharashtra","Pench, Madhya Pradesh","Kanha, Madhya Pradesh",
  "Bandhavgarh, Madhya Pradesh","Periyar, Kerala","Nagarhole, Karnataka",
  "Meghalaya Caves","Dzukou Valley, Nagaland","Majuli Island, Assam",
  // India – Cities
  "Delhi","Mumbai, Maharashtra","Bangalore, Karnataka","Chennai, Tamil Nadu",
  "Pune, Maharashtra","Kolkata, West Bengal","Ahmedabad, Gujarat",
  "Surat, Gujarat","Jaipur, Rajasthan","Chandigarh",
  // Southeast Asia
  "Bali, Indonesia","Ubud, Bali","Seminyak, Bali","Lombok, Indonesia",
  "Bangkok, Thailand","Chiang Mai, Thailand","Phuket, Thailand","Krabi, Thailand","Koh Samui, Thailand",
  "Singapore","Sentosa, Singapore",
  "Kuala Lumpur, Malaysia","Penang, Malaysia","Langkawi, Malaysia",
  "Hanoi, Vietnam","Ho Chi Minh City, Vietnam","Ha Long Bay, Vietnam","Da Nang, Vietnam","Hoi An, Vietnam",
  "Siem Reap, Cambodia","Phnom Penh, Cambodia",
  "Luang Prabang, Laos",
  "Yangon, Myanmar","Bagan, Myanmar",
  "Manila, Philippines","Palawan, Philippines","Boracay, Philippines","Cebu, Philippines",
  // East Asia
  "Tokyo, Japan","Kyoto, Japan","Osaka, Japan","Hiroshima, Japan","Hokkaido, Japan",
  "Seoul, South Korea","Busan, South Korea","Jeju Island, South Korea",
  "Beijing, China","Shanghai, China","Guilin, China","Chengdu, China","Xi'an, China",
  "Taipei, Taiwan","Taichung, Taiwan",
  "Hong Kong",
  // South Asia
  "Colombo, Sri Lanka","Kandy, Sri Lanka","Sigiriya, Sri Lanka","Ella, Sri Lanka",
  "Kathmandu, Nepal","Pokhara, Nepal","Chitwan, Nepal",
  "Thimphu, Bhutan","Paro, Bhutan","Punakha, Bhutan",
  "Dhaka, Bangladesh","Cox's Bazar, Bangladesh",
  // Middle East
  "Dubai, UAE","Abu Dhabi, UAE","Sharjah, UAE",
  "Istanbul, Turkey","Cappadocia, Turkey","Pamukkale, Turkey","Bodrum, Turkey",
  "Muscat, Oman","Petra, Jordan","Amman, Jordan",
  "Riyadh, Saudi Arabia","Doha, Qatar","Bahrain",
  "Tel Aviv, Israel","Jerusalem, Israel",
  // Europe
  "Paris, France","Nice, France","Lyon, France",
  "London, UK","Edinburgh, UK","Bath, UK",
  "Rome, Italy","Florence, Italy","Venice, Italy","Amalfi Coast, Italy","Sicily, Italy",
  "Barcelona, Spain","Madrid, Spain","Seville, Spain","Ibiza, Spain",
  "Amsterdam, Netherlands","Rotterdam, Netherlands",
  "Berlin, Germany","Munich, Germany","Hamburg, Germany",
  "Prague, Czech Republic","Vienna, Austria","Budapest, Hungary","Warsaw, Poland",
  "Zurich, Switzerland","Interlaken, Switzerland","Geneva, Switzerland",
  "Santorini, Greece","Athens, Greece","Mykonos, Greece","Crete, Greece",
  "Lisbon, Portugal","Porto, Portugal",
  "Dublin, Ireland","Reykjavik, Iceland","Copenhagen, Denmark",
  "Stockholm, Sweden","Oslo, Norway","Helsinki, Finland",
  "Dubrovnik, Croatia","Split, Croatia","Ljubljana, Slovenia",
  // Americas
  "New York, USA","Los Angeles, USA","San Francisco, USA","Miami, USA",
  "Las Vegas, USA","Chicago, USA","New Orleans, USA","Honolulu, Hawaii",
  "Cancun, Mexico","Mexico City, Mexico","Tulum, Mexico","Oaxaca, Mexico",
  "Toronto, Canada","Vancouver, Canada","Montreal, Canada","Banff, Canada",
  "Buenos Aires, Argentina","Rio de Janeiro, Brazil","São Paulo, Brazil","Cusco, Peru",
  "Cartagena, Colombia","Medellín, Colombia",
  // Africa & Oceania
  "Cape Town, South Africa","Johannesburg, South Africa","Kruger, South Africa",
  "Nairobi, Kenya","Maasai Mara, Kenya","Zanzibar, Tanzania","Serengeti, Tanzania",
  "Marrakech, Morocco","Casablanca, Morocco","Fez, Morocco",
  "Cairo, Egypt","Luxor, Egypt","Hurghada, Egypt",
  "Sydney, Australia","Melbourne, Australia","Cairns, Australia","Gold Coast, Australia",
  "Auckland, New Zealand","Queenstown, New Zealand","Rotorua, New Zealand",
  "Fiji","Maldives","Mauritius","Bora Bora, French Polynesia",
];
 
/* ── Mini Calendar ── */
const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];
 
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function toDateString(y, m, d) {
  return `${y}-${String(m + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}
function parseDate(str) {
  if (!str) return null;
  const [y, m, d] = str.split("-").map(Number);
  return { y, m: m - 1, d };
}
function formatDisplay(str) {
  if (!str) return "";
  const p = parseDate(str);
  return `${p.d} ${MONTHS[p.m].slice(0,3)} ${p.y}`;
}
 
function MiniCalendar({ value, minDate, onChange, onClose }) {
  const today    = new Date();
  const parsed   = parseDate(value);
  const initYear = parsed?.y ?? today.getFullYear();
  const initMonth= parsed?.m ?? today.getMonth();
 
  const [viewY, setViewY] = useState(initYear);
  const [viewM, setViewM] = useState(initMonth);
 
  const daysInMonth  = getDaysInMonth(viewY, viewM);
  const firstDay     = getFirstDayOfMonth(viewY, viewM);
  const minParsed    = parseDate(minDate);
 
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
 
  const isDisabled = (d) => {
    if (!d) return true;
    if (!minParsed) return false;
    const ds = toDateString(viewY, viewM, d);
    return ds < toDateString(minParsed.y, minParsed.m, minParsed.d);
  };
  const isSelected = (d) => {
    if (!d || !value) return false;
    return value === toDateString(viewY, viewM, d);
  };
  const isToday = (d) => {
    if (!d) return false;
    return viewY === today.getFullYear() && viewM === today.getMonth() && d === today.getDate();
  };
 
  const prevMonth = () => {
    if (viewM === 0) { setViewM(11); setViewY(y => y - 1); }
    else setViewM(m => m - 1);
  };
  const nextMonth = () => {
    if (viewM === 11) { setViewM(0); setViewY(y => y + 1); }
    else setViewM(m => m + 1);
  };
 
  return (
    <div className="ct-cal-panel" onClick={e => e.stopPropagation()}>
      <div className="ct-cal-header">
        <button type="button" className="ct-cal-nav" onClick={prevMonth}><FaChevronLeft /></button>
        <span className="ct-cal-title">{MONTHS[viewM]} {viewY}</span>
        <button type="button" className="ct-cal-nav" onClick={nextMonth}><FaChevronRight /></button>
        <button type="button" className="ct-cal-close" onClick={onClose}><FaTimes /></button>
      </div>
      <div className="ct-cal-grid">
        {DAYS.map(d => <span key={d} className="ct-cal-dayname">{d}</span>)}
        {cells.map((d, i) => (
          <button
            key={i}
            type="button"
            className={`ct-cal-day ${!d ? "ct-cal-empty" : ""} ${isSelected(d) ? "ct-cal-selected" : ""} ${isToday(d) ? "ct-cal-today" : ""} ${isDisabled(d) ? "ct-cal-disabled" : ""}`}
            onClick={() => { if (d && !isDisabled(d)) { onChange(toDateString(viewY, viewM, d)); onClose(); } }}
            disabled={isDisabled(d)}
          >
            {d || ""}
          </button>
        ))}
      </div>
    </div>
  );
}
 
/* ── DateField ── */
function DateField({ label, name, value, minDate, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
 
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
 
  return (
    <div className="ct-date-field" ref={ref}>
      <span className="ct-field-label">{label}</span>
      <button
        type="button"
        className={`ct-date-btn ${value ? "ct-date-btn--filled" : ""}`}
        onClick={() => setOpen(o => !o)}
      >
        <FaCalendarAlt className="ct-field-icon" />
        <span>{value ? formatDisplay(value) : "Select date"}</span>
        {value && (
          <FaTimes className="ct-date-clear" onClick={e => { e.stopPropagation(); onChange({ target: { name, value: "" } }); }} />
        )}
      </button>
      {open && (
        <MiniCalendar
          value={value}
          minDate={minDate}
          onChange={(dateStr) => onChange({ target: { name, value: dateStr } })}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
 
/* ── Main Form ── */
const ItineraryForm = ({ form, calculatedDays, loadingPreview, saving, onChange, onPreview, onSave }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestRef = useRef(null);
 
  useEffect(() => {
    const handler = (e) => { if (suggestRef.current && !suggestRef.current.contains(e.target)) setShowSuggestions(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
 
  const filtered = useMemo(() => {
    const q = form.destination.trim().toLowerCase();
    if (!q) return DESTINATIONS.slice(0, 15);
    return DESTINATIONS.filter(p => p.toLowerCase().includes(q)).slice(0, 15);
  }, [form.destination]);
 
  const selectDest = (place) => {
    onChange({ target: { name: "destination", value: place } });
    setShowSuggestions(false);
  };
 
  return (
    <form className="ct-form" onSubmit={onPreview}>
 
      {/* Summary Bar */}
      <div className="ct-summary">
        <div className="ct-summary-chip">
          <FaCalendarAlt />
          <strong>{calculatedDays}</strong>
          <span>{calculatedDays === 1 ? "day" : "days"}</span>
        </div>
        <div className="ct-summary-chip">
          <FaUsers />
          <strong>{form.travelers || 1}</strong>
          <span>{form.travelers === "1" || form.travelers === 1 ? "traveller" : "travellers"}</span>
        </div>
        {form.budget && (
          <div className="ct-summary-chip ct-summary-chip--budget">
            <FaWallet />
            <strong>₹{Number(form.budget).toLocaleString("en-IN")}</strong>
          </div>
        )}
      </div>
 
      {/* Row 1: Source + Destination */}
      <div className="ct-row">
        <div className="ct-field">
          <span className="ct-field-label">From</span>
          <div className="ct-input-wrap">
            <FaPlaneDeparture className="ct-field-icon" />
            <input name="source" value={form.source} onChange={onChange} placeholder="Departure city" />
          </div>
        </div>
 
        <div className="ct-field" ref={suggestRef} style={{ position: "relative" }}>
          <span className="ct-field-label">To</span>
          <div className="ct-input-wrap">
            <FaMapMarkerAlt className="ct-field-icon" />
            <input
              name="destination"
              value={form.destination}
              onChange={onChange}
              placeholder="Search 200+ destinations…"
              onFocus={() => setShowSuggestions(true)}
              autoComplete="off"
            />
            {form.destination && (
              <button type="button" className="ct-clear-btn" onClick={() => onChange({ target: { name: "destination", value: "" } })}>
                <FaTimes />
              </button>
            )}
          </div>
          {showSuggestions && filtered.length > 0 && (
            <div className="ct-dropdown">
              {filtered.map(place => (
                <div key={place} className="ct-dropdown-item" onMouseDown={() => selectDest(place)}>
                  <FaMapMarkerAlt className="ct-dropdown-icon" />
                  <span>{place}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
 
      {/* Row 2: Dates */}
      <div className="ct-row">
        <DateField
          label="Start Date"
          name="startDate"
          value={form.startDate}
          onChange={onChange}
        />
        <DateField
          label="End Date"
          name="endDate"
          value={form.endDate}
          minDate={form.startDate}
          onChange={onChange}
        />
      </div>
 
      {/* Row 3: Travellers + Budget */}
      <div className="ct-row">
        <div className="ct-field">
          <span className="ct-field-label">Travellers</span>
          <div className="ct-input-wrap">
            <FaUsers className="ct-field-icon" />
            <input type="number" min="1" max="50" name="travelers" value={form.travelers} onChange={onChange} />
          </div>
        </div>
        <div className="ct-field">
          <span className="ct-field-label">Budget (₹)</span>
          <div className="ct-input-wrap">
            <FaWallet className="ct-field-icon" />
            <input type="number" min="1" name="budget" value={form.budget} onChange={onChange} placeholder="50,000" />
          </div>
        </div>
      </div>
 
      {/* Row 4: Transport + Accommodation */}
      <div className="ct-row">
        <div className="ct-field">
          <span className="ct-field-label">Transport</span>
          <select name="transportation" value={form.transportation} onChange={onChange} className="ct-select">
            <option>Flight</option>
            <option>Train</option>
            <option>Bus</option>
            <option>Car</option>
            <option>Mixed</option>
          </select>
        </div>
        <div className="ct-field">
          <span className="ct-field-label">Stay</span>
          <select name="accommodation" value={form.accommodation} onChange={onChange} className="ct-select">
            <option>Hotel</option>
            <option>Resort</option>
            <option>Hostel</option>
            <option>Homestay</option>
            <option>Apartment</option>
          </select>
        </div>
      </div>
 
      {/* Interests */}
      <div className="ct-field ct-field--full">
        <span className="ct-field-label">Interests <span className="ct-optional">optional</span></span>
        <textarea
          name="interests"
          value={form.interests}
          onChange={onChange}
          rows="3"
          placeholder="Adventure, beaches, food, culture, trekking, nightlife…"
          className="ct-textarea"
        />
      </div>
 
      {/* Actions */}
      <div className="ct-actions">
        <button type="submit" className="ct-btn ct-btn--preview" disabled={loadingPreview}>
          {loadingPreview ? <Loader size="sm" inline /> : <><FaMagic /><span>Preview Itinerary</span></>}
        </button>
        <button type="button" className="ct-btn ct-btn--save" onClick={onSave} disabled={saving}>
          {saving ? <Loader size="sm" inline /> : <><FaSave /><span>Save Trip</span></>}
        </button>
      </div>
 
    </form>
  );
};
 
export default ItineraryForm;