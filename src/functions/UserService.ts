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
    nickname: string;
    first_name: string;
    last_name: string;
    social_id_number: string;
    personal_id_number: string;
    mobile_phone_number: string;
    phone_number: string;
    education_level: string;
    admin: boolean;
    crud_project: boolean;
    is_superuser: boolean;
    projects: any[]; // You can replace `any` with the specific type of projects if available
    subOrganizations: any | null; // Define type of subOrganizations if known
    create_date: string;
}

// userService.ts

// Function to fetch user data
export const fetchUserData = async (): Promise<UserData> => {
    const data = await apiGet<UserData>('/user/myshow/');
    return data;
  };
  