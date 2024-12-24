// const API_BASE_URL = 'https://sdssn-app-ypwa.onrender.com/api';
const API_BASE_URL = 'https://app.sdssn.org/api';

export const API_URLS = {
  login: `${API_BASE_URL}/login`,
  adminLogin: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/register`,
  reset: `${API_BASE_URL}/auth/register`,
  changePassword: `${API_BASE_URL}/userProfile/passwordReset`,
  fetchData: `${API_BASE_URL}/data`,
  fetchUserProfile: `${API_BASE_URL}/profile`,
  uploadProfileImage: `${API_BASE_URL}/profile/picture`,
  fetchUserImage: `${API_BASE_URL}/userProfile/viewProfileImage`,
  editProfile: `${API_BASE_URL}/profile`,
  fetchSocials: `${API_BASE_URL}/profile/socials`,
  editProfileSocials: `${API_BASE_URL}/profile/socials`,
  fetchSecurityQuestions: `${API_BASE_URL}/security-questions`,
  createProject: `${API_BASE_URL}/projects`,
  updateProject: (id: string) => `${API_BASE_URL}/projects/${id}/update`,
  fetchProjects: `${API_BASE_URL}/projects`,
  fetchSingleProject: (id: string) => `${API_BASE_URL}/projects/${id}`,
  fetchProjectComment: (id: string) =>
    `${API_BASE_URL}/projects/${id}/comments`,
  addComment: (id: string) => `${API_BASE_URL}/projects/${id}/comments`,
  likePost: (id: string) => `${API_BASE_URL}/projects/${id}/likes`,
  sharePost: (id: string) => `${API_BASE_URL}/projects/${id}/shares`,
  fetchAllUsers: `${API_BASE_URL}/users`,
  fetchUser: (username: string) => `${API_BASE_URL}/profile/${username}`,

  // Admin
  fetchUsers: `${API_BASE_URL}/admin/users`,
  fetchResources: `${API_BASE_URL}/admin`,
  fetchAdminProjects: `${API_BASE_URL}/admin/projects/all/`,
  approveProject: (id: string) =>
    `${API_BASE_URL}/admin/projects/${id}/approve`,
  createPodcast: `${API_BASE_URL}/podcasts`,
  fetchPodcasts: `${API_BASE_URL}/podcasts`,
  assignAdmin: (email: string, role: string) =>
    `${API_BASE_URL}/assign-role?email=${email}&role=${role}`,
};
