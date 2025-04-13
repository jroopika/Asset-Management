import axios from "axios";
const BASE_URL = "http://localhost:5000/api"; 

export const loginUser = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });

  const { token, user } = response.data;

  // Save to localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

export const signupUser = async (name, email, password) => {
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      name, 
      email,
      password,
      role: "user", 
    });
    return response.data; 
  };
  