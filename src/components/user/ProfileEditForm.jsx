import { FaSave } from "react-icons/fa";
import Loader from "../common/Loader";

const ProfileEditForm = ({ form, saving, onChange, onSubmit, children }) => (
  <form className="profile-form" onSubmit={onSubmit}>
    <div className="form-grid">
      <label>
        Name
        <input name="name" value={form.name} onChange={onChange} />
      </label>
      <label>
        Email
        <input type="email" name="email" value={form.email} onChange={onChange} />
      </label>
      <label>
        Phone
        <input name="phoneNumber" value={form.phoneNumber || ""} onChange={onChange} />
      </label>
      <label>
        City
        <input name="city" value={form.city || ""} onChange={onChange} />
      </label>
      <label>
        Country
        <input name="country" value={form.country || ""} onChange={onChange} />
      </label>
      <label>
        Profile image URL
        <input name="profileImage" value={form.profileImage || ""} onChange={onChange} />
      </label>
    </div>

    <div className="profile-actions">
      <button className="primary-action" type="submit" disabled={saving}>
        {saving ? <Loader size="sm" inline /> : <><FaSave /> Save profile</>}
      </button>
      {children}
    </div>
  </form>
);

export default ProfileEditForm;