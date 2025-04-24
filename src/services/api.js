import axios from "axios";

const BASE_URL = "http://192.168.0.10:5000/api"; // 🛠 Your LAN IP

// ✅ Create Axios Instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Optional: Prevent hanging requests
});

// ✅ Helper to Get Auth Header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication token missing");
  return { Authorization: `Bearer ${token}` };
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
      role: "user",
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
    const response = await api.get(`/assets/public/${assetId}`, {
      headers: getAuthHeader(),
    });
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
