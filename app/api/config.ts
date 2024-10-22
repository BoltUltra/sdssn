// const API_BASE_URL = 'https://dummyjson.com';
const API_BASE_URL = "http://54.247.199.29:8090";

export const API_URLS = {
  login: `${API_BASE_URL}/auth/login`,
  adminLogin: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/userRegistration/register`,
  reset: `${API_BASE_URL}/auth/register`,
  changePassword: `${API_BASE_URL}/userProfile/passwordReset`,
  fetchData: `${API_BASE_URL}/data`,
  fetchUserProfile: `${API_BASE_URL}/userProfile/profile`,
  editProfile: `${API_BASE_URL}/userProfile/editProfile`,
  fetchSecurityQuestions: `${API_BASE_URL}/global/fetchAllSecurityQuestions`,
};
