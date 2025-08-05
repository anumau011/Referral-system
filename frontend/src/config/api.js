// API Configuration
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000',
  ENDPOINTS: {
    USER: process.env.REACT_APP_API_ENDPOINTS_USER || '/api/user',
    LEADERBOARD: process.env.REACT_APP_API_ENDPOINTS_LEADERBOARD || '/api/leaderboard',
    USERS: process.env.REACT_APP_API_ENDPOINTS_USERS || '/api/users'
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint, path = '') => {
  return `${API_CONFIG.BASE_URL}${endpoint}${path}`;
};

// Pre-built API URLs for convenience
export const API_URLS = {
  USER: buildApiUrl(API_CONFIG.ENDPOINTS.USER),
  LEADERBOARD: buildApiUrl(API_CONFIG.ENDPOINTS.LEADERBOARD),
  USERS: buildApiUrl(API_CONFIG.ENDPOINTS.USERS),
  USER_DONATE: (referralCode) => buildApiUrl(API_CONFIG.ENDPOINTS.USER, `/${referralCode}/donate`),
  USER_BY_CODE: (code) => buildApiUrl(API_CONFIG.ENDPOINTS.USER, `/${code}`),
  USERS_PAGINATED: (page, limit) => buildApiUrl(API_CONFIG.ENDPOINTS.USERS, `?page=${page}&limit=${limit}`)
};

export default API_CONFIG;
