import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUserCircle } from "react-icons/fa";

const ProfileCard = ({ user }) => (
  <aside className="profile-card">
    <div className="profile-avatar large">
      {user?.profileImage ? <img src={user.profileImage} alt={user.name} /> : <FaUserCircle />}
    </div>
    <h2>{user?.name || "Traveller"}</h2>
    <div className="profile-card-list">
      <span><FaEnvelope /> {user?.email || "No email"}</span>
      <span><FaPhone /> {user?.phoneNumber || "No phone added"}</span>
      <span><FaMapMarkerAlt /> {[user?.city, user?.country].filter(Boolean).join(", ") || "No location added"}</span>
    </div>
  </aside>
);

export default ProfileCard;