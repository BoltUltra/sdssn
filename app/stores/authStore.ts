import { useDataStore } from '@/app/stores/dataStore';
import { create } from 'zustand';
import axios from 'axios';
import { API_URLS } from '../api/config';
import toast from 'react-hot-toast';
import { ChangePasswordData, RegistrationData } from '@/types';

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
  register: (userData: RegistrationData, login) => Promise<void>;
  logout: () => void;
  loadUserFromLocalStorage: () => void;
  loadAdminFromLocalStorage: () => void;
}

const formatToken = (token: string | null): string =>
  token?.replace(/^["']|["']$/g, '') || '';

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isEmailVerified: false,
  user: null,
  admin: null,
  isLoading: true,
  auth: null,

  login: async (credentials, router) => {
    const { fetchUserProfile, fetchSecurityQuestions } =
      useDataStore.getState();
    try {
      const response = await axios.post(API_URLS.login, credentials);

      if (response.status === 201) {
        const userData = response.data;
        set({ isAuthenticated: true, auth: userData, isLoading: false });
        localStorage.setItem('auth', JSON.stringify(userData));
        localStorage.setItem('currentUser', JSON.stringify(userData.data));
        localStorage.setItem('token', JSON.stringify(userData.token));
        localStorage.setItem('isAuthenticated', 'true');

        const currentUser = JSON.parse(
          localStorage.getItem('currentUser') || '{}'
        );
        if (currentUser.email_verified === '1') {
          toast.success('Login successful');
          router.push('/dashboard/projects');
        } else {
          toast.error('Email not verified');
          router.push('/auth/email-not-verified');
        }
        await fetchUserProfile();
        await fetchSecurityQuestions();
      } else {
        set({ isAuthenticated: false, isLoading: false });
        toast.error('Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage =
        error.response?.data?.error || 'An error occurred during login';
      toast.error(errorMessage);
      set({ isLoading: false });
    }
  },

  adminLogin: async (credentials) => {
    try {
      const response = await axios.post(API_URLS.adminLogin, credentials);
      const adminData = response.data;

      set({ isAuthenticated: true, auth: adminData, isLoading: false });
      localStorage.setItem('admin', JSON.stringify(adminData));
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Login successful');
    } catch (error: any) {
      console.error('Admin login error:', error);
      const errorMessage =
        error.response?.data?.message || 'An error occurred during admin login';
      toast.error(errorMessage);
      set({ isLoading: false });
    }
  },

  register: async (userData, router) => {
    try {
      const response = await axios.post(API_URLS.register, userData);
      toast.success('Registration successful');
      router.push('/auth/verify-email');
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  },

  resetPassword: async (payload) => {
    try {
      const token = formatToken(localStorage.getItem('token'));
      if (!token) throw new Error('No token found. Please log in again.');

      const response = await axios.post(API_URLS.changePassword, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Password Updated Successfully');
      return response.data;
    } catch (error: any) {
      console.error('Reset error:', error.message);
      toast.error(error.response?.data?.error || 'An error occurred');
    }
  },

  logout: () => {
    set({ isAuthenticated: false, auth: null, isEmailVerified: false });
    localStorage.clear();
  },

  loadUserFromLocalStorage: () => {
    const auth = localStorage.getItem('auth');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (auth) {
      set({ isAuthenticated, auth: JSON.parse(auth), isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  loadAdminFromLocalStorage: () => {
    const admin = localStorage.getItem('admin');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (admin) {
      set({ isAuthenticated, admin: JSON.parse(admin), isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },
}));
