import { useDataStore } from "@/app/stores/dataStore";
import { create } from "zustand";
import axios from "axios";
import { API_URLS } from "../api/config";
import toast from "react-hot-toast";
import { ChangePasswordData, RegistrationData } from "@/types";

interface AuthState {
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  auth: any | null;
  user: any | null;
  admin: any | null;
  isLoading: boolean;
  login: (
    credentials: { email: string; password: string },
    router
  ) => Promise<void>;
  adminLogin: (credentials: {
    username: string;
    password: string;
  }) => Promise<void>;
  resetPassword: (payload: ChangePasswordData) => Promise<void>;
  register: (userData: RegistrationData) => Promise<void>;
  logout: () => void;
  loadUserFromLocalStorage: () => void;
  loadAdminFromLocalStorage: () => void;
}

const formatToken = (token: string | null): string => {
  if (!token) return "";
  return token.replace(/^["']|["']$/g, "");
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isEmailVerified: false,
  user: null,
  admin: null,
  isLoading: true,
  auth: null,

  login: async (credentials, router) => {
    const { fetchUserProfile, fetchSecurityQuestions, fetchUserImage } =
      useDataStore.getState();
    try {
      const response = await axios.post(API_URLS.login, credentials);
      const userData = response.data;

      set({ isAuthenticated: true, auth: userData, isLoading: false });
      localStorage.setItem("auth", JSON.stringify(userData));
      localStorage.setItem("currentUser", JSON.stringify(userData.data));
      localStorage.setItem("token", JSON.stringify(userData.token));
      localStorage.setItem("isAuthenticated", "true");
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );

      // Redirect based on `email_verified` only after confirming the `currentUser` data is present
      if (currentUser && currentUser.email_verified === "1") {
        // console.log("Email verified - routing to dashboard");
        router.push("/dashboard/projects");
      } else if (currentUser && currentUser.email_verified === "0") {
        toast.error("Email not verified");
        // console.log("Email not verified - routing to email verification page");
        router.push("/auth/email-not-verified");
      } else {
        toast.error("Failed to verify email status");
      }
      // toast.success("Login successful");
      await fetchUserProfile();
      await fetchSecurityQuestions();
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.response?.data);
      set({ isLoading: false }); // Stop loading if error
    }
  },

  adminLogin: async (credentials) => {
    try {
      const response = await axios.post(API_URLS.adminLogin, credentials);
      const adminData = response.data;

      set({ isAuthenticated: true, auth: adminData, isLoading: false });
      localStorage.setItem("admin", JSON.stringify(adminData));
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successful");
    } catch (error: any) {
      console.error("Login error:", error);
      // toast.error(error.response?.data || "An error occurred");
      toast.error(error.response.data);
      set({ isLoading: false });
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(API_URLS.register, userData);
      // set({ isAuthenticated: true });
      toast.success("Registration successful proceeding to login");
      return response.data;
    } catch (error: any) {
      console.error("Registration error:", error.message);
    }
  },

  resetPassword: async (payload) => {
    try {
      const token = formatToken(localStorage.getItem("token"));
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      const response = await axios.post(API_URLS.changePassword, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Password Updated Successfully");
      // console.log("Response from update password", response);
      return response.data;
    } catch (error: any) {
      console.error("Reset error:", error.message);
    }
  },

  logout: () => {
    set({ isAuthenticated: false, auth: null, isEmailVerified: false });
    localStorage.clear();
  },

  loadUserFromLocalStorage: () => {
    const auth = localStorage.getItem("auth");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (auth) {
      set({ isAuthenticated, auth: JSON.parse(auth), isLoading: false });
    } else {
      set({ isLoading: false }); // Stop loading if no user found
    }
  },

  loadAdminFromLocalStorage: () => {
    const admin = localStorage.getItem("auth");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (admin) {
      set({ isAuthenticated, user: JSON.parse(admin), isLoading: false });
    } else {
      set({ isLoading: false }); // Stop loading if no user found
    }
  },
}));
