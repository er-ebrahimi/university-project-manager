// userService.ts
import { apiGet } from './api';

// Define the structure of the user data
export interface UserPermissions {
  id: number;
  name: string;
  add_subOrganization: boolean;
  add_manager: boolean;
  add_project: boolean;
  user_access: boolean;
  // Add other permissions as needed
}

export interface UserData {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  nickname: string;
  personal_id_number: string;
  social_id_number: string;
  education_level: string;
  mobile_phone_number: string;
  phone_number: string;
  create_date: string; // ISO date string
  subOrganizations: any | null; // Adjust type as needed
  user_permissions: UserPermissions;
  // Add other fields as needed
}

// userService.ts

// Function to fetch user data
export const fetchUserData = async (): Promise<UserData> => {
    const data = await apiGet<UserData>('/user/myshow/');
    return data;
  };
  