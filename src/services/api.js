const BASE_URL = "http://localhost:9095/api";

const getHeaders = () => {
  const token = localStorage.getItem("tripzy_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handle = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message || "Something went wrong");
  }
  return res.json();
};

// AUTH
export const register = (data) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);

export const login = (data) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);

// USER
export const getProfile = () =>
  fetch(`${BASE_URL}/users/me`, { headers: getHeaders() }).then(handle);

export const updateProfile = (data) =>
  fetch(`${BASE_URL}/users/me`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);

export const deleteAccount = () =>
  fetch(`${BASE_URL}/users/me`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then(handle);

// TRIPS
export const createTrip = (data) =>
  fetch(`${BASE_URL}/trips`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);

export const getUserTrips = () =>
  fetch(`${BASE_URL}/trips`, { headers: getHeaders() }).then(handle);

export const getTripById = (id) =>
  fetch(`${BASE_URL}/trips/${id}`, { headers: getHeaders() }).then(handle);

export const deleteTrip = (id) =>
  fetch(`${BASE_URL}/trips/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then(handle);

// AI
export const previewItinerary = (data) =>
  fetch(`${BASE_URL}/ai/preview`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);
