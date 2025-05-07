import axios from "axios";

const BASE_URL = `${window.location.origin.replace(":3000", ":5000")}/api`;

// Create Axios Instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Get auth header with token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication token missing");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// LOGIN USER
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, role, user } = response.data;
    return { token, role, user };
  } catch (err) {
    console.error("Login failed:", err);
    throw err.response?.data?.message || "Login failed";
  }
};

// SIGNUP USER
export const signupUser = async (name, email, password) => {
  try {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
      role: "user",
    });
    return response.data;
  } catch (err) {
    console.error("Signup failed:", err);
    throw err.response?.data?.message || "Signup failed";
  }
};

// FETCH ALL ASSETS
export const getAssets = async () => {
  try {
    const response = await api.get("/assets", getAuthHeader());
    return response.data;
  } catch (err) {
    console.error("Fetching assets failed:", err);
    throw err.response?.data?.message || "Failed to fetch assets";
  }
};

// FETCH SINGLE ASSET BY ID (Public)
export const getAssetById = async (assetId) => {
  try {
    const response = await api.get(`/assets/public/${assetId}`);
    return response.data;
  } catch (err) {
    console.error("Fetching asset by ID failed:", err);
    throw err.response?.data?.message || "Failed to fetch asset";
  }
};

// FETCH ALL REQUESTS
export const getAllRequests = async () => {
  try {
    const response = await api.get("/requests/all", getAuthHeader());
    return response.data;
  } catch (err) {
    console.error("Fetching requests failed:", err);
    throw err.response?.data?.message || "Failed to fetch requests";
  }
};

// REPORT ISSUE
export const reportIssue = async (assetId, userId, issue) => {
  try {
    const response = await api.post(
      "/issues",
      { assetId, userId, issue },
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    console.error("Reporting issue failed:", err);
    throw err.response?.data?.message || "Failed to report issue";
  }
};

// FETCH ACTIVITY LOGS
export const fetchLogs = async () => {
  try {
    const response = await api.get("/logs", getAuthHeader());
    return response.data;
  } catch (err) {
    console.error("Fetching logs failed:", err);
    throw err.response?.data?.message || "Failed to fetch activity logs";
  }
};

// FETCH ALL USERS
export const getAllUsers = async () => {
  try {
    const response = await api.get("/auth/users", getAuthHeader());
    return response.data;
  } catch (err) {
    console.error("Fetching users failed:", err);
    throw err.response?.data?.message || "Failed to fetch users";
  }
};

// CREATE USER
export const createUser = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (err) {
    console.error("Creating user failed:", err);
    throw err.response?.data?.message || "Failed to create user";
  }
};

// UPDATE USER
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/auth/users/${id}`, userData, getAuthHeader());
    return response.data;
  } catch (err) {
    console.error("Updating user failed:", err);
    throw err.response?.data?.message || "Failed to update user";
  }
};

// DELETE USER
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/auth/users/${id}`, getAuthHeader());
    return response.data;
  } catch (err) {
    console.error("Deleting user failed:", err);
    throw err.response?.data?.message || "Failed to delete user";
  }
};