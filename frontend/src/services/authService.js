import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/auth`,
});

export const register = async (userData) => {
  const response = await api.post("/register", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
