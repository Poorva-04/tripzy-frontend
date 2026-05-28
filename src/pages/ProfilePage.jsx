import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount, updateProfile } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import {
  FaUserCircle, FaCamera, FaTimes, FaSave, FaTrash,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser,
} from "react-icons/fa";
import "../styles/Profile.css";
 
const ProfilePage = () => {
  const { user, setUser, signOut } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);
 
  const [form, setForm] = useState({
    name:         user?.name         || "",
    email:        user?.email        || "",
    phoneNumber:  user?.phoneNumber  || "",
    city:         user?.city         || "",
    country:      user?.country      || "",
    profileImage: user?.profileImage || "",
  });
  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error,    setError]    = useState("");
  const [message,  setMessage]  = useState("");
 
  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      setForm((prev) => ({ ...prev, profileImage: reader.result }));
    reader.readAsDataURL(file);
  };
 
  const removeImage = () => {
    setForm((prev) => ({ ...prev, profileImage: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);
    try {
      const updated = await updateProfile({
        ...user,
        ...form,
        phoneNumber:  form.phoneNumber  || null,
        city:         form.city         || null,
        country:      form.country      || null,
        profileImage: form.profileImage || null,
      });
      setUser(updated);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };
 
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete your account and all saved trips? This cannot be undone."
    );
    if (!confirmed) return;
    setDeleting(true);
    try {
      await deleteAccount();
      signOut();
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to delete account.");
      setDeleting(false);
    }
  };
 
  const initials = form.name
    ? form.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";
 
  return (
    <main className="profile-page">
 
      {/* ── HERO ── */}
      <div className="profile-hero">
        <div className="profile-hero-text">
          <span className="profile-eyebrow">Account</span>
          <h1>Your Profile</h1>
          <p>Keep your traveller details fresh for faster planning.</p>
        </div>
 
        {/* Avatar */}
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">
            {form.profileImage
              ? <img src={form.profileImage} alt={form.name} />
              : <span className="profile-initials">{initials}</span>
            }
          </div>
          <div className="profile-avatar-actions">
            <button
              type="button"
              className="avatar-btn avatar-btn--upload"
              onClick={() => fileRef.current?.click()}
              title="Upload photo"
            >
              <FaCamera /> Change photo
            </button>
            {form.profileImage && (
              <button
                type="button"
                className="avatar-btn avatar-btn--remove"
                onClick={removeImage}
                title="Remove photo"
              >
                <FaTimes /> Remove
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageFile}
          />
        </div>
      </div>
 
      {/* ── MESSAGES ── */}
      {error   && <ErrorMessage message={error} />}
      {message && <div className="profile-success">{message}</div>}
 
      {/* ── FORM ── */}
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-form-grid">
 
          <div className="pf-field">
            <label><FaUser /> Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" />
          </div>
 
          <div className="pf-field">
            <label><FaEnvelope /> Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          </div>
 
          <div className="pf-field">
            <label><FaPhone /> Phone</label>
            <input type="tel" name="phoneNumber" value={form.phoneNumber || ""} onChange={handleChange} placeholder="+91 9876543210" />
          </div>
 
          <div className="pf-field">
            <label><FaMapMarkerAlt /> City</label>
            <input name="city" value={form.city || ""} onChange={handleChange} placeholder="Mumbai" />
          </div>
 
          <div className="pf-field pf-field--full">
            <label><FaMapMarkerAlt /> Country</label>
            <input name="country" value={form.country || ""} onChange={handleChange} placeholder="India" />
          </div>
 
        </div>
 
        {/* ── ACTIONS ── */}
        <div className="profile-actions">
          <button type="submit" className="profile-btn profile-btn--save" disabled={saving}>
            {saving ? <Loader size="sm" inline /> : <><FaSave /> Save Profile</>}
          </button>
 
          <button
            type="button"
            className="profile-btn profile-btn--delete"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? <Loader size="sm" inline /> : <><FaTrash /> Delete Account</>}
          </button>
        </div>
      </form>
 
    </main>
  );
};
 
export default ProfilePage;