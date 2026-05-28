import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../services/authService";
import { saveToken, getToken, removeToken } from "../utils/tokenHelpers";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  // On mount: if a token exists, fetch the current user profile
  useEffect(() => {
    const token = getToken();
    if (token) {
      getProfile()
        .then((profile) => setUser(profile))
        .catch(() => {
          removeToken();   // token expired / invalid
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  /**
   * Called after a successful login or register.
   * Saves the JWT and stores the profile in state.
   */
  const signIn = (token, profile) => {
    saveToken(token);
    setUser(profile);
    setError(null);
  };

  const signOut = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, error, setError, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
