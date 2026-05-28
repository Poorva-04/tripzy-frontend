import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, getProfile } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../common/Loader";
import "../../styles/Auth.css";

const LoginForm = () => {
  const { signIn } = useAuth();
  const navigate   = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email: form.email, password: form.password });

      if (!res.success) {
        setError(res.message || "Login failed. Please try again.");
        return;
      }

      // Save token first so getProfile header is set
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
    <div className="login-form-wrapper">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">✈️</span>
          <h1 className="auth-title">Tripzy</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
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

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="auth-btn auth-btn--primary"
            disabled={loading || !form.email || !form.password}
          >
            {loading ? <Loader size="sm" inline /> : "Sign in"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
