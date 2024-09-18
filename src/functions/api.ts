import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

// Interface for the login response
interface LoginResponse {
  token: string; // This is the access token
  refreshToken: string; // Assuming the API returns a refresh token
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Set up the base URL for your API
const api = axios.create({
  baseURL: 'http://194.60.230.47:8000', // Replace with your actual API base URL
});

// Helper functions to manage tokens in localStorage
const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error('Request Error');
    return Promise.reject(error);
  }
);

// Refresh token logic
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  try {
    const response = await axios.post('http://194.60.230.47:8000/user/refresh/', {
      refreshToken,
    });
    const newAccessToken = response.data.token;
    const newRefreshToken = response.data.refreshToken;

    // Update tokens in localStorage
    setTokens(newAccessToken, newRefreshToken);

    return newAccessToken;
  } catch (error) {
    clearTokens();
    toast.error('Session expired. Please log in again.');
    return Promise.reject(error);
  }
};

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config;
      if (!originalRequest._retry && error?.response?.data?.detail === "Token is invalid or expired") {
        originalRequest._retry = true;
        try {
          // Try refreshing the token
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest); // Retry the original request with the new token
          }
        } catch (refreshError) {
          toast.error('Session expired. Please log in again.');
          return Promise.reject(refreshError);
        }
      }

      if (error?.response?.data?.detail === "No active account found with the given credentials") {
        toast.error("اکانتی با این مشخصات یافت نشد");
      } else {
        toast.error('ورود مجاز نمیباشد');
      }
    } else {
      toast.error('An error occurred.');
    }
    return Promise.reject(error);
  }
);

// Function to handle login and save tokens
export const login = async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await api.post('/user/login/', credentials);

  // Save the access and refresh tokens
  setTokens(response.data.token, response.data.refreshToken);

  return response.data;
};

// Function to log out and clear tokens
export const logout = () => {
  clearTokens();
};
