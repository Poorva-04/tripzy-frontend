
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, getProfile } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../common/Loader";
import "../../styles/Auth.css";

const INITIAL = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  city: "",
  country: "",
};

const RegisterForm = () => {
  const { signIn }   = useAuth();
  const navigate     = useNavigate();

  const [form, setForm]     = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim())            return "Full name is required.";
    if (!form.email.trim())           return "Email is required.";
    if (form.password.length < 6)     return "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword)
                                      return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);

    // Build the payload matching RegisterRequest exactly
    const payload = {
      name:        form.name.trim(),
      email:       form.email.trim(),
      password:    form.password,
      phoneNumber: form.phoneNumber.trim() || null,
      city:        form.city.trim()        || null,
      country:     form.country.trim()     || null,
    };

    try {
      // POST /api/auth/register → { message, success, token }
      const res = await registerUser(payload);

      if (!res.success) {
        setError(res.message || "Registration failed. Please try again.");
        return;
      }

      // Store token temporarily so getProfile header is set
      localStorage.setItem("tripzy_token", res.token);
      const profileData = await getProfile();

      signIn(res.token, profileData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form-wrapper">
      <div className="auth-card auth-card--wide">
        {/* Logo / Brand */}
        <div className="auth-brand">
          <span className="auth-logo">✈️</span>
          <h1 className="auth-title">Tripzy</h1>
          <p className="auth-subtitle">Create your account</p>
        </div>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Row 1 */}
          <div className="form-group">
            <label htmlFor="name">Full name <span className="required">*</span></label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">Email address <span className="required">*</span></label>
            <input
              id="reg-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          {/* Row 2 — passwords */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reg-password">Password <span className="required">*</span></label>
              <input
                id="reg-password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                required
                autoComplete="new-password"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password <span className="required">*</span></label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                disabled={loading}
              />
            </div>
          </div>

          {/* Row 3 — optional info */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+91 9876543210"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Mumbai"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="India"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="auth-btn auth-btn--primary"
            disabled={loading || !form.name || !form.email || !form.password}
          >
            {loading ? <Loader size="sm" inline /> : "Create account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
