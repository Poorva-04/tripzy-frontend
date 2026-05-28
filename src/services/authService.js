import { getToken } from "../utils/tokenHelpers";

const BASE_URL = "https://tripzzyy-backend.onrender.com/api";

const getHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  return data; // AuthResponse: { message, success, token }
};

// POST /api/auth/register
// Body: { name, email, password, phoneNumber, city, country }
// Response: { message, success, token }
export const registerUser = (data) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

// POST /api/auth/login
// Body: { email, password }
// Response: { message, success, token }
export const loginUser = (data) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

// GET /api/users/me  (protected)
export const getProfile = () =>
  fetch(`${BASE_URL}/users/me`, {
    headers: getHeaders(),
  }).then(async (res) => {
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  });
