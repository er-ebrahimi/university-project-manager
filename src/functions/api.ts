// src/api.ts
import axios, { AxiosResponse } from 'axios';

// Set up the base URL for your API
const api = axios.create({
  baseURL: 'http://194.60.230.47:8000', // Replace with your actual API base URL
});

// Define the request and response types
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Function to handle login
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await api.post('/user/login/', credentials);
  return response.data;
};
