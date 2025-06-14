const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

export const API_ENDPOINTS = {
    // User related endpoints
    USER: {
        LOGIN: `${API_BASE_URL}/user/login`,
        REGISTER: `${API_BASE_URL}/user/register`,
        LOGOUT: `${API_BASE_URL}/user/logout`,
        PROFILE: `${API_BASE_URL}/user/profile`,
    },
    // Admin specific endpoints
    ADMIN: {
        DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
        USERS: `${API_BASE_URL}/admin/users`,
        SETTINGS: `${API_BASE_URL}/admin/settings`,
    },
    // Add other endpoint categories as needed
};

export default API_BASE_URL; 