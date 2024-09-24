import { apiPost } from './api';
import { setTokens } from './tokenService';

interface LoginResponse {
  access: string;
  refresh: string;
}

export const login = async (credentials: { username: string; password: string }) => {
  try {
    const response = await apiPost<LoginResponse>('/user/login/', credentials, false);
    console.log('Response from API:', response);

    setTokens(response.access, response.refresh);

    return response;
  } catch (error) {
    console.error('Error in login function:', error);
    throw error;
  }
};
