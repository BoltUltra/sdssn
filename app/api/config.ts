// const API_BASE_URL = 'https://sdssn-app-ypwa.onrender.com/api';
const API_BASE_URL = 'https://app.sdssn.org/api';

export const API_URLS = {
  // Auth
  login: `${API_BASE_URL}/login`,
  adminLogin: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/register`,
  reset: `${API_BASE_URL}/auth/register`,
  changePassword: `${API_BASE_URL}/userProfile/passwordReset`,

  // User
  fetchUserProfile: `${API_BASE_URL}/profile`,
  uploadProfileImage: `${API_BASE_URL}/profile/picture`,
  fetchUserImage: `${API_BASE_URL}/userProfile/viewProfileImage`,
  editProfile: `${API_BASE_URL}/profile`,
  fetchSocials: `${API_BASE_URL}/profile/socials`,
  editProfileSocials: `${API_BASE_URL}/profile/socials`,
  fetchSecurityQuestions: `${API_BASE_URL}/security-questions`,

  // Project
  fetchData: `${API_BASE_URL}/data`,
  createProject: `${API_BASE_URL}/projects`,
  updateProject: (id: string) => `${API_BASE_URL}/projects/${id}/update`,
  fetchProjects: `${API_BASE_URL}/projects`,
  fetchSingleProject: (id: string) => `${API_BASE_URL}/projects/${id}`,
  fetchProjectComment: (id: string) =>
    `${API_BASE_URL}/projects/${id}/comments`,
  addComment: (id: string) => `${API_BASE_URL}/projects/${id}/comments`,
  likePost: (id: string) => `${API_BASE_URL}/projects/${id}/likes`,
  sharePost: (id: string) => `${API_BASE_URL}/projects/${id}/shares`,

  // Podcast
  likePodcast: (id: string) => `${API_BASE_URL}/podcasts/${id}/likes`,
  sharePodcast: (id: string) => `${API_BASE_URL}/podcasts/${id}/shares`,

  // Admin
  fetchAllUsers: `${API_BASE_URL}/users`,
  fetchUsers: `${API_BASE_URL}/admin/users`,
  fetchResources: `${API_BASE_URL}/admin`,
  fetchAdminProjects: `${API_BASE_URL}/admin/projects/all/`,
  approveProject: (id: string) =>
    `${API_BASE_URL}/admin/projects/${id}/approve`,
  createPodcast: `${API_BASE_URL}/podcasts`,
  fetchPodcasts: `${API_BASE_URL}/podcasts`,
  assignAdmin: (email: string, role: string) =>
    `${API_BASE_URL}/assign-role?email=${email}&role=${role}`,

  // Others
  fetchUser: (username: string) => `${API_BASE_URL}/profile/${username}`,
  fetchStats: `${API_BASE_URL}/statistics`,
};
