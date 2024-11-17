import { create } from 'zustand';
import axios from 'axios';
import { API_URLS } from '../api/config';
import toast from 'react-hot-toast';

interface DataState {
  data: any[];
  userProfile: any | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  fetchUserSocials: () => Promise<void>;
  fetchAllPosts: () => Promise<void>;
  fetchSingleArticle: (id: string) => Promise<any>;
  fetchProjectComments: (id: string) => Promise<any>;
  fetchUserImage: () => Promise<void>;
  fetchSecurityQuestions: () => Promise<any>;
  editUserProfile: (userData: any) => Promise<void>;
  editUserSocials: (userData: any) => Promise<void>;
  updateUserImage: (payload: any) => Promise<void>;
  createPost: (postData: any) => Promise<void>;
  updatePost: (id: string, postData: any) => Promise<void>;
  addComment: (id: string, payload: any) => Promise<void>;
  likePost: (id: string) => Promise<void>;
  sharePost: (id: string) => Promise<void>;
}

const formatToken = (token: string | null): string => {
  if (!token) return '';
  return token.replace(/^["']|["']$/g, '');
};

export const useDataStore = create<DataState>((set) => ({
  data: [],
  userProfile: null,
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      const response = await axios.get(API_URLS.fetchData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      set({ data: response.data, loading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, loading: false });
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
      localStorage.setItem('security_questions', JSON.stringify(response.data));
      return response.data; // return the fetched data
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error('Error fetching security questions:', error);
    }
  },

  /**
   * Fetch User Profile
   */
  fetchUserProfile: async () => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.get(API_URLS.fetchUserProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      set({ data: response.data, loading: false, error: null });
      localStorage.setItem('currentUser', JSON.stringify(response.data.data));
      return response.data; // return the fetched data
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error('Error fetching user profile:', error);
    }
  },

  /**
   * Fetch User Socials
   */
  fetchUserSocials: async () => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      const currentUserSocials = JSON.parse(
        localStorage.getItem('currentUserSocials') || '{}'
      );
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.get(API_URLS.fetchSocials, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      set({ data: response.data, loading: false, error: null });
      localStorage.setItem(
        'currentUserSocials',
        JSON.stringify(response.data.data)
      );
      return response.data; // return the fetched data
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error('Error fetching user socials:', error);
    }
  },

  /**
   * Edit User Profile
   */

  editUserProfile: async (userData: any) => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.put(API_URLS.editProfile, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('User Profile Updated successfully');
      // console.log("Response from editUserProfile:", response);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error('Error fetching user profile:', error);
    }
  },

  /**
   * Edit User Profile
   */

  editUserSocials: async (userData: any) => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.put(API_URLS.editProfileSocials, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('User Socials Updated successfully');
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error('Error fetching user profile:', error);
    }
  },

  /**
   * upload User image
   */

  updateUserImage: async (payload: { file: File }) => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      if (!token) {
        toast.error('No token found. Please log in again.');
        throw new Error('No token found');
      }

      // Create FormData and append file
      const formData = new FormData();
      formData.append('file', payload.file);

      // console.log("Uploading file:", payload.file);
      // console.log("FormData entries:", [...formData.entries()]);

      const response = await axios.post(API_URLS.uploadProfileImage, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ loading: false });
      // console.log("Upload response:", response);
      toast.success('Profile image uploaded successfully');
    } catch (error: any) {
      console.error('Upload error details:', error.response || error);
      set({
        error: error.response?.data || error.message,
        loading: false,
      });
      toast.error('Error uploading profile image');
    }
  },

  /**
   * Fetch User Profile
   */
  fetchUserImage: async () => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      // console.log("Token found:", token);
      const response = await axios.get(API_URLS.fetchUserImage, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      set({ userProfile: response.data, loading: false, error: null });
      localStorage.setItem('userImage', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error('Error fetching user profile:', error);
    }
  },
  /**
   * Create Post
   */

  createPost: async (postData: any) => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.post(API_URLS.createProject, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Project created successfully');
      console.log('Response from editUserProfile:', response);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error('Error fetching user profile:', error);
    }
  },

  /**
   * Update Post
   */

  updatePost: async (id: string, postData: any) => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.put(API_URLS.updateProject(id), postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.loading('Project update in progress');
      console.log('Response from update post:', response);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error('Error while updating post', error);
    } finally {
      toast.success('Project updated successfully');
    }
  },

  /**
   * Fetch all post
   */
  fetchAllPosts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(API_URLS.fetchProjects);
      set({ data: response.data, loading: false, error: null });
      return response.data; // return the fetched data
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error('Error fetching projects:', error);
    }
  },

  /**
   * Fetch single project
   */

  fetchSingleArticle: async (id: string) => {
    set({ loading: true });
    try {
      const response = await axios.get(API_URLS.fetchSingleProject(id));
      set({ loading: false, error: null });
      return response.data; // Return the fetched article
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error('Error fetching single article:', error);
      throw error;
    }
  },

  /**
   * Fetch project comment
   */

  fetchProjectComments: async (id: string) => {
    set({ loading: true });
    try {
      const response = await axios.get(API_URLS.fetchProjectComment(id));
      set({ loading: false, error: null });
      return response.data; // Return the fetched comment
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error('Error fetching single article:', error);
      throw error;
    }
  },

  /**
   * Add comment
   */

  addComment: async (id: string, payload: any) => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.post(API_URLS.addComment(id), payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Comment Added Successfully');
      console.log('Response from comment:', response);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      toast.error('Error adding comment');
      console.error('Error Adding comment', error);
    }
  },

  /**
   * Like a post
   */

  likePost: async (id: string) => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.put(API_URLS.likePost(id), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Response from comment:', response);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      toast.error('Error adding comment');
      console.error('Error Adding comment', error);
    } finally {
      set({ loading: false });
      toast.success('Post liked');
    }
  },

  /**
   * Share a post
   */

  sharePost: async (id: string) => {
    set({ loading: true });
    try {
      const token = formatToken(localStorage.getItem('token'));
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.put(API_URLS.sharePost(id), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Response from share:', response);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      toast.error('Error sharing');
      console.error('Error sharing', error);
    } finally {
      set({ loading: false });
      toast.success('Post shared');
    }
  },
}));
