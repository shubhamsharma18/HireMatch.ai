import axios from "axios";
import { baseUrl } from "../../../baseUrl";  

export const register = async ({ username, email, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, {
      username, email, password
    }, {
      withCredentials: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log("Register error:", error.response?.data);
    return { 
      success: false, 
      error: error.response?.data || { message: "Registration failed" },
      status: error.response?.status 
    };
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email, password
    }, {
      withCredentials: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log("Login error:", error.response?.data);
    return { 
      success: false, 
      error: error.response?.data || { message: "Login failed" },
      status: error.response?.status 
    };
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${baseUrl}/auth/logout`, {
      withCredentials: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log("Logout error:", error.response?.data);
    return { 
      success: false, 
      error: error.response?.data || { message: "Logout failed" }
    };
  }
};

export const getme = async () => {
  try {
    const response = await axios.get(`${baseUrl}/auth/getme`, {
      withCredentials: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log("Getme error:", error.response?.data);
    return { 
      success: false, 
      error: error.response?.data || { message: "Not authenticated" },
      status: error.response?.status 
    };
  }
};