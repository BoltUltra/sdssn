import { create } from "zustand";
import axios from "axios";
import { API_URLS } from "../api/config";
import toast from "react-hot-toast";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  admin: any | null;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  adminLogin: (credentials: { username: string; password: string }) => Promise<void>;
  reset: (credentials: { email: string }) => Promise<void>;
  register: (userData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  loadUserFromLocalStorage: () => void;
  loadAdminFromLocalStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  admin: null,
  isLoading: true,

  login: async (credentials) => {
    try {
      const response = await axios.post(API_URLS.login, credentials);
      const userData = response.data;

      set({ isAuthenticated: true, user: userData, isLoading: false });
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      toast.success("Login successful");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
      set({ isLoading: false }); // Stop loading if error
    }
  },

  adminLogin: async (credentials) => {
    try {
      const response = await axios.post(API_URLS.adminLogin, credentials);
      const adminData = response.data;

      set({ isAuthenticated: true, user: adminData, isLoading: false });
      localStorage.setItem("admin", JSON.stringify(adminData));
      localStorage.setItem("isAuthenticated", "true");

      toast.success("Login successful");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
      set({ isLoading: false });
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(API_URLS.register, userData);
      set({ isAuthenticated: true, user: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("isAuthenticated", "true");
    } catch (error: any) {
      console.error("Registration error:", error.message);
    }
  },

  reset: async (userData) => {
    try {
      const response = await axios.post(API_URLS.reset, userData);
      set({ isAuthenticated: true, user: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("isAuthenticated", "true");
    } catch (error: any) {
      console.error("Reset error:", error.message);
    }
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  },

  loadUserFromLocalStorage: () => {
    const user = localStorage.getItem("user");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (user) {
      set({ isAuthenticated, user: JSON.parse(user), isLoading: false });
    } else {
      set({ isLoading: false }); // Stop loading if no user found
    }
  },
  loadAdminFromLocalStorage: () => {
    const admin = localStorage.getItem("admin");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (admin) {
      set({ isAuthenticated, user: JSON.parse(admin), isLoading: false });
    } else {
      set({ isLoading: false }); // Stop loading if no user found
    }
  },
}));
