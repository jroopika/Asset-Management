import axios from "axios";

const BASE_URL = `${window.location.origin.replace(":3000", ":5000")}/api`;

// ✅ Create Axios Instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Optional: Prevent hanging requests
});

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token missing');
  return { headers: { Authorization: `Bearer ${token}` } };
};

// ✅ LOGIN USER
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, role, user } = response.data;
    return { token, role, user };
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};

// ✅ SIGNUP USER
export const signupUser = async (name, email, password) => {
  try {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
      role: "user", // Default role
    });
    return response.data;
  } catch (err) {
    console.error("Signup failed:", err);
    throw err;
  }
};

// ✅ FETCH ALL ASSETS
export const getAssets = async () => {
  try {
    const response = await api.get("/assets", {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (err) {
    console.error("Fetching assets failed:", err);
    throw err;
  }
};

// ✅ FETCH SINGLE ASSET BY ID (Public)
export const getAssetById = async (assetId) => {
  try {
    const response = await api.get(`/assets/public/${assetId}`); // 🚫 No auth header needed
    return response.data;
  } catch (err) {
    console.error("Fetching asset by ID failed:", err);
    throw err;
  }
};

// ✅ FETCH ALL REQUESTS
export const getAllRequests = async () => {
  try {
    const response = await api.get("/requests/all", {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (err) {
    console.error("Fetching requests failed:", err);
    throw err;
  }
};

// ✅ REPORT ISSUE
export const reportIssue = async (assetId, userId, issue) => {
  try {
    const response = await api.post(
      "/issues",
      { assetId, userId, issue },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (err) {
    console.error("Reporting issue failed:", err);
    throw err;
  }
};

// ✅ FETCH ACTIVITY LOGS
export const fetchLogs = async () => {
  try {
    const response = await api.get("/logs", {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (err) {
    console.error("Fetching logs failed:", err);
    throw err;
  }
};

// ✅ FETCH ALL USERS
export const getAllUsers = async () => {
  const response = await api.get("/auth/users", getAuthHeader());
  return response.data;
};

// Correct endpoint
export const createUser = async (userData) => {
  const response = await api.post("/auth/signup", userData); // No token needed for signup
  return response.data;
};

// ✅ UPDATE USER
export const updateUser = async (id, userData) => {
  const response = await api.put(`/auth/users/${id}`, userData, getAuthHeader());
  return response.data;
};

// ✅ DELETE USER
export const deleteUser = async (id) => {
  const response = await api.delete(`/auth/users/${id}`, getAuthHeader());
  return response.data;
};
