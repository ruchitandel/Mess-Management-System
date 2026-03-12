// src/services/authService.js

import api from "./api";

// ================= LOGIN =================
export const loginUser = async (email, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", email); // FastAPI expects "username"
    formData.append("password", password);

    const response = await api.post("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;

  } catch (error) {
    throw (
      error?.response?.data?.detail ||
      "Invalid email or password"
    );
  }
};


// ================= REGISTER =================
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/", {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      role_id: Number(userData.role_id),
    });

    return response.data;

  } catch (error) {
    throw (
      error?.response?.data?.detail ||
      "Registration failed"
    );
  }
};