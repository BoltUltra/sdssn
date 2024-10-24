import { create } from "zustand";
import axios from "axios";
import { API_URLS } from "../api/config";
import toast from "react-hot-toast";

interface DataState {
  data: any[];
  userProfile: any | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  fetchUserImage: () => Promise<void>;
  fetchSecurityQuestions: () => Promise<any>;
  editUserProfile: (userData: any) => Promise<void>;
  updateUserImage: (payload: any) => Promise<void>;
}

const formatToken = (token: string | null): string => {
  if (!token) return "";
  return token.replace(/^["']|["']$/g, "");
};

export const useDataStore = create<DataState>((set) => ({
  data: [],
  userProfile: null,
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem("token"));
      const response = await axios.get(API_URLS.fetchData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      set({ data: response.data, loading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  /**
   * Fetch User Profile
   */
  fetchUserProfile: async () => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem("token"));
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      console.log("Token found:", token);
      const response = await axios.get(API_URLS.fetchUserProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      set({ userProfile: response.data, loading: false, error: null });
      localStorage.setItem("currentUser", JSON.stringify(response.data));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error("Error fetching user profile:", error);
    }
  },

  /**
   * Fetch Security Questions
   */
  fetchSecurityQuestions: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(API_URLS.fetchSecurityQuestions);
      set({ data: response.data, loading: false, error: null });
      localStorage.setItem("security_questions", JSON.stringify(response.data));
      return response.data; // return the fetched data
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error("Error fetching security questions:", error);
    }
  },

  /**
   * Edit User Profile
   */

  editUserProfile: async (userData: any) => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem("token"));
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      const response = await axios.post(API_URLS.editProfile, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("User Profile Updated successfully");
      console.log("Response from editUserProfile:", response);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error("Error fetching user profile:", error);
    }
  },

  /**
   * upload User image
   */

  updateUserImage: async (payload: { file: File }) => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem("token"));
      if (!token) {
        toast.error("No token found. Please log in again.");
        throw new Error("No token found");
      }

      // Create FormData and append file
      const formData = new FormData();
      formData.append("file", payload.file);

      console.log("Uploading file:", payload.file);
      console.log("FormData entries:", [...formData.entries()]);

      const response = await axios.post(API_URLS.uploadProfileImage, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ loading: false });
      console.log("Upload response:", response);
      toast.success("Profile image uploaded successfully");
    } catch (error: any) {
      console.error("Upload error details:", error.response || error);
      set({
        error: error.response?.data || error.message,
        loading: false,
      });
      toast.error("Error uploading profile image");
    }
  },

  /**
   * Fetch User Profile
   */
  fetchUserImage: async () => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem("token"));
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      console.log("Token found:", token);
      const response = await axios.get(API_URLS.fetchUserImage, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      set({ userProfile: response.data, loading: false, error: null });
      localStorage.setItem("userImage", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error("Error fetching user profile:", error);
    }
  },
}));
