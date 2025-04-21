import axios from "axios";

const BASE_URL ="http://192.168.0.20:5000/api"; // change ip to lappy's 

// ✅ LOGIN USER
export const loginUser = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });

  const { token, user } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
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
      Authorization: `Bearer ${token}`, // Remove this if the route is public
    },
  });
  return response.data;
};
