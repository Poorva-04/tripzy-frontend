import "../../styles/footer.css";
import { Link } from "react-router-dom";
import {
  FaPaperPlane,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaHeart,
  FaRobot,
} from "react-icons/fa";
import { useState } from "react";
 
function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
 
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };
 
  const destinations = [
    { name: "Bali", path: "/" },
    { name: "Dubai", path: "/" },
    { name: "Paris", path: "/" },
    { name: "Goa", path: "/" },
    { name: "Munnar", path: "/" },
    { name: "Lakshadweep", path: "/" },
    { name: "Ooty", path: "/" },
    { name: "Banaras", path: "/" },
  ];
 
  const company = [
    { name: "About Us", path: "/about" },
    { name: "How It Works", path: "/" },
    { name: "Blog & Travel Tips", path: "/" },
    { name: "Careers", path: "/" },
    { name: "Press", path: "/" },
    { name: "Partners", path: "/" },
  ];
 
  const support = [
    { name: "Help Center", path: "/" },
    { name: "Contact Support", path: "/" },
    { name: "Privacy Policy", path: "/" },
    { name: "Terms of Service", path: "/" },
    { name: "Refund Policy", path: "/" },
    { name: "Cookie Settings", path: "/" },
  ];
 
  const socials = [
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
    { icon: <FaYoutube />, href: "#", label: "YouTube" },
    { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
  ];
 
  return (
    <footer className="footer">
 
      {/* ── Decorative top border ── */}
      <div className="footer-border-top" />
 
      {/* ── Newsletter Banner ── */}
      <div className="footer-newsletter">
        <div className="newsletter-inner">
          <div className="newsletter-text">
            <span className="newsletter-eyebrow">✦ Stay Inspired</span>
            <h3>Get Exclusive Travel Deals & AI Itineraries</h3>
            <p>
              Join 50,000+ travellers getting curated destination ideas,
              early-bird deals and AI travel tips every week.
            </p>
          </div>
          <div className="newsletter-form-wrap">
            {subscribed ? (
              <div className="subscribed-msg">
                <FaHeart className="subscribed-icon" />
                <span>You're in! Watch your inbox for travel magic ✈</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <div className="input-wrap">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="subscribe-btn">
                  Subscribe <FaPaperPlane />
                </button>
              </form>
            )}
            <p className="newsletter-note">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
 
      {/* ── Main Footer Grid ── */}
      <div className="footer-main">
        <div className="footer-inner">
 
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon"><FaRobot /></span>
              <span className="logo-text">Tripzy</span>
            </Link>
            <p className="brand-tagline">
              AI-powered travel planning for every kind of explorer.
              Dream it. Plan it. Live it.
            </p>
            <div className="contact-list">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Pune, Maharashtra, India 411001</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>hello@tripzy.in</span>
              </div>
            </div>
            <div className="social-row">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="social-btn"
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
 
          {/* Destinations Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="col-title-line" />
              Destinations
            </h4>
            <ul className="footer-links">
              {destinations.map((d, i) => (
                <li key={i}>
                  <Link to={d.path}>
                    <span className="link-dot" />
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Company Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="col-title-line" />
              Company
            </h4>
            <ul className="footer-links">
              {company.map((c, i) => (
                <li key={i}>
                  <Link to={c.path}>
                    <span className="link-dot" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Support Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="col-title-line" />
              Support
            </h4>
            <ul className="footer-links">
              {support.map((s, i) => (
                <li key={i}>
                  <Link to={s.path}>
                    <span className="link-dot" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
        </div>
      </div>
 
      {/* ── Trust Badges ── */}
      <div className="footer-trust">
        <div className="trust-inner">
          <div className="trust-item">
            <span className="trust-num">50K+</span>
            <span className="trust-label">Trips Planned</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-num">4.9★</span>
            <span className="trust-label">Avg. Rating</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-num">11</span>
            <span className="trust-label">Destinations</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-num">AI</span>
            <span className="trust-label">Powered Plans</span>
          </div>
        </div>
      </div>
 
      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="copyright">
            © {new Date().getFullYear()} Tripzy. Made with{" "}
            <FaHeart className="heart-icon" /> in India.
          </p>
          <div className="bottom-links">
            <Link to="/">Privacy</Link>
            <span className="bottom-sep">·</span>
            <Link to="/">Terms</Link>
            <span className="bottom-sep">·</span>
            <Link to="/">Sitemap</Link>
          </div>
        </div>
      </div>
 
    </footer>
  );
}
 
export default Footer;