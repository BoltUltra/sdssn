// src/stores/dataStore.ts
import { create } from 'zustand';
import axios from 'axios';
import { API_URLS } from '../api/config';

interface DataState {
  data: any[];          // Fetched data
  userProfile: any | null; // Fetched user profile data
  loading: boolean;     // Loading state
  error: string | null; // Error state
  fetchData: () => Promise<void>; // Function to fetch general data
  fetchUserProfile: () => Promise<void>; // Function to fetch user profile
}

export const useDataStore = create<DataState>((set) => ({
  data: [],
  userProfile: null,  // Initialize user profile state
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(API_URLS.fetchData);
      set({ data: response.data, loading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchUserProfile: async () => {
    set({ loading: true }); // Set loading state to true
    try {
      const response = await axios.get(API_URLS.fetchUserProfile);
      set({ userProfile: response.data, loading: false, error: null }); // Update state with fetched profile data
    } catch (error: any) {
      set({ error: error.message, loading: false }); // Set error state
    }
  },
}));
