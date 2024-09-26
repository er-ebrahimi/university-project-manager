import { apiPost } from './api';
import { setTokens } from './tokenService';

interface LoginResponse {
  access: string;
  refresh: string;
}

export const login = async (
  credentials: { username: string; password: string }, 
  onLoginSuccess: () => void // Pass a callback for successful login
): Promise<LoginResponse> => { // Ensure you return a Promise<LoginResponse>
  try {
    const response = await apiPost<LoginResponse>('/user/login/', credentials, false);
    console.log('Response from API:', response);

    // Clear local storage role when logging in
    localStorage.removeItem('userRole');

    // Store the access and refresh tokens
    setTokens(response.access, response.refresh);

    // Notify the UserProvider of a successful login
    onLoginSuccess();

    return response; // Ensure that the response is returned
  } catch (error) {
    console.error('Error in login function:', error);
    throw error;
  }
};
