import "./../../src/styles/HomePage.css";
import { useState, useEffect } from "react";

import hero from "../assets/hero.jpg";
import bali from "../assets/bali.jpg";
import banaras from "../assets/banaras.jpg";
import dubai from "../assets/dubai.jpg";
import goa from "../assets/goa.jpg";
import kasauli from "../assets/kasauli.jpg";
import lakshadweep from "../assets/lakshadweep.jpg";
import mahabaleshwar from "../assets/mahabaleshwar.jpg";
import munnar from "../assets/munnar.jpg";
import ooty from "../assets/ooty.jpg";
import paris from "../assets/paris.jpg";
import rameshwaram from "../assets/rameshwaram.jpg";

import { Link } from "react-router-dom";
import {
  FaRobot,
  FaPlaneDeparture,
  FaMapMarkedAlt,
  FaWallet,
  FaTimes,
  FaCalendarAlt,
  FaRupeeSign,
  FaSun,
  FaCheckCircle,
} from "react-icons/fa";

function HomePage() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (selectedDestination) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [selectedDestination]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setSelectedDestination(null), 300);
  };

  const filters = ["All", "India", "International", "Beach", "Hills", "Spiritual"];

  const destinations = [
    {
      name: "Bali",
      image: bali,
      tagline: "Tropical Paradise & Luxury Escape",
      days: "5 Days",
      price: "₹65,000",
      season: "April – October",
      category: ["International", "Beach"],
      badge: "Trending",
      description:
        "Bali is Indonesia's legendary island of the gods — a breathtaking mix of terraced rice paddies, Hindu temples, roaring surf, and a vibrant arts scene. From the spiritual heart of Ubud to the electric nightlife of Seminyak, every corner holds a new experience.",
      highlights: ["Tanah Lot Temple", "Tegallalang Rice Terraces", "Seminyak Beach", "Mount Batur Sunrise"],
      plan: [
        { day: "Day 1", activity: "Arrive at Ngurah Rai Airport · Resort Check-in · Sunset at Kuta Beach" },
        { day: "Day 2", activity: "Ubud Monkey Forest · Tegallalang Rice Terraces · Traditional Cooking Class" },
        { day: "Day 3", activity: "Water Sports at Tanjung Benoa · Seminyak Nightlife & Beach Clubs" },
        { day: "Day 4", activity: "Island Hopping – Nusa Penida · Snorkelling · Kelingking Beach Views" },
        { day: "Day 5", activity: "Morning Spa · Souvenir Shopping at Ubud Market · Departure" },
      ],
    },
    {
      name: "Goa",
      image: goa,
      tagline: "Beach Vibes & Nightlife",
      days: "4 Days",
      price: "₹25,000",
      season: "November – February",
      category: ["India", "Beach"],
      badge: "Popular",
      description:
        "India's beach capital blends Portuguese colonial charm with sun-soaked shores. Golden beaches, spice-laden seafood, colonial forts, and a party scene that never sleeps make Goa the ultimate escape for every kind of traveller.",
      highlights: ["Baga Beach", "Fort Aguada", "Dudhsagar Falls", "Anjuna Flea Market"],
      plan: [
        { day: "Day 1", activity: "Arrive · Check-in · Evening at Baga Beach · Seafood dinner at Britto's" },
        { day: "Day 2", activity: "Parasailing & Jet Ski · Water Sports at Calangute · Night Cruise on Mandovi" },
        { day: "Day 3", activity: "Club Hopping at Tito's Lane · Casino Night (optional)" },
        { day: "Day 4", activity: "Fort Aguada · Old Goa Churches · Shopping · Departure" },
      ],
    },
    {
      name: "Dubai",
      image: dubai,
      tagline: "Luxury, Desert & Skyline",
      days: "6 Days",
      price: "₹1,20,000",
      season: "November – March",
      category: ["International"],
      badge: "Luxury",
      description:
        "A city born from the desert sand, Dubai is the world's most audacious skyline. Home to the world's tallest tower, artificial islands, and gold souks sitting beside hyper-modern malls — it's an experience unlike anywhere else on Earth.",
      highlights: ["Burj Khalifa At the Top", "Desert Safari & BBQ", "Palm Jumeirah", "Dubai Creek Gold Souk"],
      plan: [
        { day: "Day 1", activity: "Arrive · Burj Khalifa Level 124 & 148 · Dubai Fountain Show" },
        { day: "Day 2", activity: "Desert Safari · Camel Ride · Dune Bashing · BBQ Dinner under the stars" },
        { day: "Day 3", activity: "Dubai Mall · Aquarium · Virtual Reality Park · Dubai Frame" },
        { day: "Day 4", activity: "Marina Dhow Cruise · JBR Walk · Ain Dubai (World's Largest Ferris Wheel)" },
        { day: "Day 5", activity: "Palm Jumeirah · Atlantis Aquaventure Waterpark · Luxury Shopping" },
        { day: "Day 6", activity: "Gold & Spice Souk · Heritage Village Al Fahidi · Departure" },
      ],
    },
    {
      name: "Paris",
      image: paris,
      tagline: "City of Love & Culture",
      days: "7 Days",
      price: "₹1,80,000",
      season: "April – June",
      category: ["International"],
      badge: "Romantic",
      description:
        "The city that has inspired poets, painters, and lovers for centuries. From the iron lattice of the Eiffel Tower reflected in the Seine to the world-class art of the Louvre, Paris is a living museum of human creativity and elegance.",
      highlights: ["Eiffel Tower Night View", "Louvre Museum", "Versailles Palace", "Seine River Cruise"],
      plan: [
        { day: "Day 1", activity: "Arrive at CDG · Eiffel Tower at Sunset · Champs-Élysées evening stroll" },
        { day: "Day 2", activity: "Louvre Museum (4 hrs) · Tuileries Garden · Palais-Royal" },
        { day: "Day 3", activity: "Day Trip to Palace of Versailles · Hall of Mirrors · Formal Gardens" },
        { day: "Day 4", activity: "Seine River Cruise · Notre-Dame (exterior) · Île de la Cité" },
        { day: "Day 5", activity: "Disneyland Paris full day · Character Meet & Greets" },
        { day: "Day 6", activity: "Montmartre · Sacré-Cœur · Local Café Culture · Luxury Shopping at Le Marais" },
        { day: "Day 7", activity: "Morning at Musée d'Orsay · Airport Transfer · Departure" },
      ],
    },
    {
      name: "Banaras",
      image: banaras,
      tagline: "Spiritual & Cultural Journey",
      days: "3 Days",
      price: "₹18,000",
      season: "October – March",
      category: ["India", "Spiritual"],
      badge: "Cultural",
      description:
        "One of the world's oldest continuously inhabited cities, Varanasi (Banaras) sits on the banks of the sacred Ganga. Its labyrinthine lanes, ancient ghats, and centuries-old rituals create a profound, otherworldly experience that stays with you forever.",
      highlights: ["Dashashwamedh Ghat Aarti", "Kashi Vishwanath Temple", "Sarnath (Buddha's first sermon)", "Morning Boat Ride"],
      plan: [
        { day: "Day 1", activity: "Arrive · Evening Dashashwamedh Ghat Aarti · Lantern on the Ganga" },
        { day: "Day 2", activity: "Pre-dawn Boat Ride · Kashi Vishwanath Temple · Manikarnika Ghat Walk" },
        { day: "Day 3", activity: "Sarnath Buddhist Ruins · Local Sweets Tasting · Departure" },
      ],
    },
    {
      name: "Kasauli",
      image: kasauli,
      tagline: "Peaceful Himalayan Escape",
      days: "4 Days",
      price: "₹22,000",
      season: "March – June",
      category: ["India", "Hills"],
      badge: "Serene",
      description:
        "Nestled among pine-covered Himalayan foothills, Kasauli is a quiet British-era hill station that has preserved its colonial charm. Cobblestone lanes, deodar forests, and panoramic mountain views make it perfect for digital detox and soul-restoring walks.",
      highlights: ["Monkey Point (Highest Point)", "Christ Church (1853)", "Mall Road Colonial Stroll", "Gilbert Trail Sunrise Trek"],
      plan: [
        { day: "Day 1", activity: "Arrive from Chandigarh · Mall Road evening walk · Colonial architecture exploration" },
        { day: "Day 2", activity: "Monkey Point sunrise · Tibetan Market · Pine forest nature walk" },
        { day: "Day 3", activity: "Gilbert Trail Trek · Local Himachali cuisine · Sunset at Sunset Point" },
        { day: "Day 4", activity: "Christ Church visit · Café hopping · Departure" },
      ],
    },
    {
      name: "Lakshadweep",
      image: lakshadweep,
      tagline: "Crystal Clear Island Paradise",
      days: "5 Days",
      price: "₹75,000",
      season: "October – May",
      category: ["India", "Beach"],
      badge: "Exclusive",
      description:
        "India's best-kept secret — 36 coral atolls rising from the Arabian Sea, fringed by the most pristine white-sand beaches and electric-blue lagoons in Asia. Only a handful of islands are open to tourists, which keeps it blissfully uncrowded.",
      highlights: ["Agatti Island Lagoon", "Scuba Diving at Bangaram", "Glass-bottom Boat Ride", "Coral Reef Snorkelling"],
      plan: [
        { day: "Day 1", activity: "Fly Kochi–Agatti · Island Resort Check-in · Lagoon walk at sunset" },
        { day: "Day 2", activity: "Scuba Diving (PADI certified instructors) · Coral garden tour" },
        { day: "Day 3", activity: "Snorkelling at Bangaram Atoll · Glass-bottom Kayaking" },
        { day: "Day 4", activity: "Sailing · Dolphin Spotting · Beach bonfire night" },
        { day: "Day 5", activity: "Early morning swim · Coconut crab spotting · Fly back to Kochi" },
      ],
    },
    {
      name: "Mahabaleshwar",
      image: mahabaleshwar,
      tagline: "Strawberry Hills & Nature",
      days: "3 Days",
      price: "₹15,000",
      season: "November – February",
      category: ["India", "Hills"],
      badge: "Family",
      description:
        "Maharashtra's highest hill station crowns the Sahyadri range at 1,372 m, wrapped in dense forests and mist-drenched valleys. Known for its strawberry farms, multiple viewpoints and the three-river confluence, Mahabaleshwar is a weekend escape for the soul.",
      highlights: ["Arthur's Seat Viewpoint", "Venna Lake Boating", "Mapro Garden Strawberry Farm", "Pratapgad Fort"],
      plan: [
        { day: "Day 1", activity: "Arrive · Venna Lake boating & horse riding · Sunset at Wilson Point" },
        { day: "Day 2", activity: "Arthur's Seat (India's Queen of Points) · Elephant's Head Point · Mapro Garden" },
        { day: "Day 3", activity: "Strawberry farm tour & picking · Krishnabai Temple · Departure" },
      ],
    },
    {
      name: "Munnar",
      image: munnar,
      tagline: "Tea Gardens & Misty Mountains",
      days: "4 Days",
      price: "₹28,000",
      season: "September – March",
      category: ["India", "Hills"],
      badge: "Nature",
      description:
        "Munnar is Kerala's crown jewel — endless carpets of emerald tea gardens rolling over the Western Ghats at 1,600 m. Waterfalls tumble through shola forests, rare Nilgiri tahr graze on mountain meadows, and the air smells perpetually of fresh tea leaves.",
      highlights: ["Eravikulam National Park (Nilgiri Tahr)", "Tea Museum Nallathanni Estate", "Attukad Waterfalls", "Top Station Panorama"],
      plan: [
        { day: "Day 1", activity: "Arrive Kochi · Drive to Munnar (4 hrs scenic) · Tea Tasting session" },
        { day: "Day 2", activity: "Tea Museum · Mattupetty Dam · Echo Point · Kundala Lake Boating" },
        { day: "Day 3", activity: "Eravikulam NP Nilgiri Tahr Safari · Attukad & Lakkam Waterfalls" },
        { day: "Day 4", activity: "Top Station sunrise · Spice Garden tour · Departure" },
      ],
    },
    {
      name: "Ooty",
      image: ooty,
      tagline: "Queen of Hill Stations",
      days: "4 Days",
      price: "₹24,000",
      season: "October – June",
      category: ["India", "Hills"],
      badge: "Heritage",
      description:
        "Ooty (Udhagamandalam), nestled in Tamil Nadu's Nilgiri Hills, has been a hill station since 1821. Its UNESCO-listed toy train chugging through blue-gum forests, sprawling botanical garden, and colonial-era clubs still feel delightfully nostalgic.",
      highlights: ["Nilgiri Mountain Railway (UNESCO)", "Government Botanical Garden (1848)", "Doddabetta Peak (2,637 m)", "Ooty Lake Boating"],
      plan: [
        { day: "Day 1", activity: "Arrive · Ooty Lake paddle boating · Thread Garden · Rose Garden" },
        { day: "Day 2", activity: "Government Botanical Garden · Tribal Research Centre · Local market" },
        { day: "Day 3", activity: "UNESCO Nilgiri Toy Train ride Ooty–Coonoor · Lamb's Rock · Law's Falls" },
        { day: "Day 4", activity: "Doddabetta Peak (highest in Nilgiris) · Tea Factory visit · Departure" },
      ],
    },
    {
      name: "Rameshwaram",
      image: rameshwaram,
      tagline: "Sacred Island Destination",
      days: "3 Days",
      price: "₹20,000",
      season: "October – April",
      category: ["India", "Spiritual"],
      badge: "Pilgrimage",
      description:
        "Rameswaram island is one of Hinduism's Char Dham pilgrimage sites, linked to the mainland by the iconic Pamban Bridge — India's first sea bridge. The Ramanathaswamy Temple's legendary corridor of 1,212 sculpted pillars is an architectural marvel.",
      highlights: ["Ramanathaswamy Temple (1,212 pillars)", "Pamban Bridge Sunrise", "Dhanushkodi Ghost Town", "Adam's Bridge View"],
      plan: [
        { day: "Day 1", activity: "Arrive · Ramanathaswamy Temple darshan · Evening aarti at 22 Holy Theerthams" },
        { day: "Day 2", activity: "Dhanushkodi (India's last point) · Ruins tour · Adam's Bridge viewpoint" },
        { day: "Day 3", activity: "Pamban Bridge sunrise photography · APJ Abdul Kalam Memorial · Departure" },
      ],
    },
  ];

  const filtered =
    activeFilter === "All"
      ? destinations
      : destinations.filter((d) => d.category.includes(activeFilter));

  const badgeColor = {
    Trending: "#f97316",
    Popular: "#10b981",
    Luxury: "#8b5cf6",
    Romantic: "#ec4899",
    Cultural: "#f59e0b",
    Serene: "#06b6d4",
    Exclusive: "#6366f1",
    Family: "#84cc16",
    Nature: "#22c55e",
    Heritage: "#a16207",
    Pilgrimage: "#dc2626",
  };

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg">
          <img src={hero} alt="Travel hero" className="hero-img" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <span className="hero-eyebrow">✦ AI-Powered Travel Planning</span>
          <h1 className="hero-title">
            Your Dream Vacation,<br />
            <span className="hero-accent">Planned Perfectly</span>
          </h1>
          <p className="hero-subtitle">
            Discover destinations, get smart itineraries, and travel smarter —
            all powered by AI, all in one place.
          </p>
          <div className="hero-actions">
            <Link to="/create-trip" className="btn-primary">
              Plan My Trip <span className="btn-arrow">→</span>
            </Link>
            <Link to="/register" className="btn-ghost">
              Create Free Account
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">50K+</span>
              <span className="stat-label">Trips Planned</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">11</span>
              <span className="stat-label">Destinations</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">4.9★</span>
              <span className="stat-label">User Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="features-inner">
          <div className="feature-card">
            <div className="feature-icon-wrap" style={{ background: "#fef3c7" }}>
              <FaRobot style={{ color: "#d97706" }} />
            </div>
            <h3>AI Itinerary Generator</h3>
            <p>Smart, personalized travel plans built by AI in seconds.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap" style={{ background: "#dcfce7" }}>
              <FaWallet style={{ color: "#16a34a" }} />
            </div>
            <h3>Budget Optimization</h3>
            <p>Travel more, spend less — AI finds the best value for you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap" style={{ background: "#ede9fe" }}>
              <FaMapMarkedAlt style={{ color: "#7c3aed" }} />
            </div>
            <h3>Explore Destinations</h3>
            <p>Discover handpicked trending and hidden-gem destinations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap" style={{ background: "#fee2e2" }}>
              <FaPlaneDeparture style={{ color: "#dc2626" }} />
            </div>
            <h3>All-in-One Platform</h3>
            <p>Booking, packing lists, weather — everything organized here.</p>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="destinations-section">
        <div className="section-heading">
          <span className="section-eyebrow">Where to Next?</span>
          <h2>Popular Destinations</h2>
          <p>Handpicked packages with AI-powered travel plans included.</p>
        </div>

        <div className="filter-bar">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="destination-grid">
          {filtered.map((destination, index) => (
            <div className="destination-card" key={index}>
              <div className="card-img-wrap">
                <img src={destination.image} alt={destination.name} />
                <span
                  className="card-badge"
                  style={{ background: badgeColor[destination.badge] }}
                >
                  {destination.badge}
                </span>
              </div>
              <div className="card-body">
                <h3>{destination.name}</h3>
                <p className="card-tagline">{destination.tagline}</p>
                <div className="card-meta">
                  <span className="meta-item">
                    <FaCalendarAlt /> {destination.days}
                  </span>
                  <span className="meta-item">
                    <FaRupeeSign />
                    {destination.price.replace("₹", "")}
                  </span>
                </div>
                <button
                  className="explore-btn"
                  onClick={() => setSelectedDestination(destination)}
                >
                  View Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── POPUP ── */}
      {selectedDestination && (
        <div
          className={`popup-overlay ${visible ? "show" : ""}`}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className={`popup-card ${visible ? "show" : ""}`}>
            <button className="popup-close" onClick={handleClose} aria-label="Close">
              <FaTimes />
            </button>

            <div className="popup-hero">
              <img src={selectedDestination.image} alt={selectedDestination.name} />
              <div className="popup-hero-overlay">
                <span
                  className="card-badge"
                  style={{ background: badgeColor[selectedDestination.badge] }}
                >
                  {selectedDestination.badge}
                </span>
                <h2>{selectedDestination.name}</h2>
                <p>{selectedDestination.tagline}</p>
              </div>
            </div>

            <div className="popup-body">
              <div className="popup-meta-row">
                <div className="popup-meta-item">
                  <FaCalendarAlt className="popup-meta-icon" />
                  <div>
                    <span className="popup-meta-label">Duration</span>
                    <span className="popup-meta-value">{selectedDestination.days}</span>
                  </div>
                </div>
                <div className="popup-meta-item">
                  <FaRupeeSign className="popup-meta-icon" />
                  <div>
                    <span className="popup-meta-label">Starting from</span>
                    <span className="popup-meta-value">{selectedDestination.price}</span>
                  </div>
                </div>
                <div className="popup-meta-item">
                  <FaSun className="popup-meta-icon" />
                  <div>
                    <span className="popup-meta-label">Best Season</span>
                    <span className="popup-meta-value">{selectedDestination.season}</span>
                  </div>
                </div>
              </div>

              <div className="popup-section">
                <h3>About This Destination</h3>
                <p className="popup-description">{selectedDestination.description}</p>
              </div>

              <div className="popup-section">
                <h3>Highlights</h3>
                <div className="highlights-grid">
                  {selectedDestination.highlights.map((h, i) => (
                    <div className="highlight-item" key={i}>
                      <FaCheckCircle className="highlight-icon" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="popup-section">
                <div className="plan-header">
                  <FaRobot className="plan-ai-icon" />
                  <h3>AI Generated Day-by-Day Plan</h3>
                </div>
                <div className="plan-timeline">
                  {selectedDestination.plan.map((item, i) => (
                    <div className="plan-item" key={i}>
                      <div className="plan-day-badge">{item.day}</div>
                      <div className="plan-activity">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="popup-cta">
                <Link to="/create-trip" className="btn-primary full-width" onClick={handleClose}>
                  Book This Trip <span className="btn-arrow">→</span>
                </Link>
                <button className="btn-ghost-dark" onClick={handleClose}>
                  Explore More Destinations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
