import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import {
  FaHome,
  FaUser,
  FaPlusCircle,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaRobot,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import "../../styles/Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!user;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const logout = () => {
    signOut();
    navigate("/login");
  };

  const navLinks = [
    { to: "/", icon: <FaHome />, label: "Home" },
    ...(isLoggedIn
      ? [
          { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
          { to: "/create-trip", icon: <FaPlusCircle />, label: "Create Trip" },
          { to: "/profile", icon: <FaUser />, label: "Profile" },
        ]
      : []),
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="navbar-logo-icon"><FaRobot /></span>
            <span className="navbar-logo-text">Tripzy</span>
          </Link>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link ${isActive(link.to) ? "navbar-link--active" : ""}`}
              >
                <span className="navbar-link-icon">{link.icon}</span>
                <span>{link.label}</span>
                {isActive(link.to) && <span className="navbar-link-dot" />}
              </Link>
            ))}
          </div>

          <div className="navbar-auth">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="navbar-btn-ghost">
                  <FaSignInAlt /><span>Login</span>
                </Link>
                <Link to="/register" className="navbar-btn-primary">
                  <FaUserPlus /><span>Sign Up</span>
                </Link>
              </>
            ) : (
              <button onClick={logout} className="navbar-btn-primary logout-btn">
                <FaSignOutAlt /><span>Logout</span>
              </button>
            )}
          </div>

          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <div className={`mobile-drawer ${menuOpen ? "mobile-drawer--open" : ""}`}>
        <div className="mobile-drawer-links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-link ${isActive(link.to) ? "mobile-link--active" : ""}`}
            >
              <span className="mobile-link-icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          <div className="mobile-drawer-divider" />

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="mobile-link">
                <span className="mobile-link-icon"><FaSignInAlt /></span>
                <span>Login</span>
              </Link>
              <Link to="/register" className="mobile-link mobile-link--cta">
                <span className="mobile-link-icon"><FaUserPlus /></span>
                <span>Sign Up</span>
              </Link>
            </>
          ) : (
            <button onClick={logout} className="mobile-link logout-mobile">
              <span className="mobile-link-icon"><FaSignOutAlt /></span>
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}

export default Navbar;
