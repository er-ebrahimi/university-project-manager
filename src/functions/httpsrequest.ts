import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './tokenService';
import toast from 'react-hot-toast';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  includeHeaders?: boolean;
  retry?: boolean; // To prevent infinite loops
}

const API_BASE_URL = 'http://194.60.230.47:8000'; // Replace with your actual API base URL

export const httpRequest = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const {
    method = 'GET',
    data,
    includeHeaders = true,
    retry = true,
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Include access token if available
  if (includeHeaders) {
    const token = getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    data,
  };

  try {
    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401 && retry && includeHeaders) {
      // Attempt to refresh the token
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        // If no refresh token, clear tokens and redirect to login
        clearTokens();
        toast.error("ابتدا وارد شوید");
        
        // Redirect to login page
        window.location.href = '/login';
        return Promise.reject(new Error('Unauthorized'));
      }

      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post(`${API_BASE_URL}/user/refresh/`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;

        setTokens(newAccessToken, newRefreshToken);

        // Update the Authorization header
        headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        const retryConfig: AxiosRequestConfig = {
          ...config,
          headers,
        };

        const retryResponse: AxiosResponse<T> = await axios(retryConfig);
        return retryResponse.data;
      } catch (refreshError) {
        // Clear tokens and redirect to login if refresh fails
        clearTokens();
        toast.error('مشکلی در ورود مجدد رخ داده است.');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    throw error;
  }
};
