// const API_BASE_URL = 'https://dummyjson.com';
// const API_BASE_URL = "http://54.247.199.29:8090";
const API_BASE_URL = 'https://sdssn-app.onrender.com/api';

export const API_URLS = {
  login: `${API_BASE_URL}/login`,
  adminLogin: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/register`,
  reset: `${API_BASE_URL}/auth/register`,
  changePassword: `${API_BASE_URL}/userProfile/passwordReset`,
  fetchData: `${API_BASE_URL}/data`,
  fetchUserProfile: `${API_BASE_URL}/profile`,
  uploadProfileImage: `${API_BASE_URL}/userProfile/imageUpload`,
  fetchUserImage: `${API_BASE_URL}/userProfile/viewProfileImage`,
  editProfile: `${API_BASE_URL}/profile`,
  editProfileSocials: `${API_BASE_URL}/profile/socials`,
  fetchSecurityQuestions: `${API_BASE_URL}/security-questions`,
  createProject: `${API_BASE_URL}/projects`,
  fetchProjects: `${API_BASE_URL}/projects`,
};
