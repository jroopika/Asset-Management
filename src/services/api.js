import axios from "axios";

const BASE_URL = "http://192.168.0.23:5000/api"; // 🛠 Your LAN IP

// ✅ LOGIN USER
export const loginUser = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  const { token, role, user } = response.data;  // ✅ Proper destructuring
  return { token, role, user };
};

// ✅ SIGNUP USER
export const signupUser = async (name, email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, {
    name,
    email,
    password,
    role: "user",
  });
  return response.data;
};

// ✅ FETCH ALL ASSETS
export const getAssets = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/assets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ FETCH SINGLE ASSET BY ID (Updated to Public Route)
export const getAssetById = async (assetId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/assets/public/${assetId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Optional for public
    },
  });
  return response.data;
};

// ✅ FETCH ALL REQUESTS
export const getAllRequests = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/requests/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
