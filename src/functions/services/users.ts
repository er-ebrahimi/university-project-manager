import { User } from "@/types/userType";
import { apiGet, apiPost, apiPut, apiDelete } from "../api";
import { UserPermissions } from "@/types/userType";
export interface userSelect {
  id: number;
  nickname: string;
  user_permissions: UserPermissions;
}
export const CreateNewUser = async (data: any) => {
  // Ensure the endpoint matches your API
  return apiPost<any>("/user/create/", data, true);
};

// Fetch all users
export const getUsers = async (): Promise<User[]> => {
  return apiGet<User[]>("/user/adminlist/", true);
};
export const getUsersSelect = async (): Promise<userSelect[]> => {
  return apiGet<userSelect[]>("/user/list/", true);
};

// Update a user by ID
export const updateUser = async (user: User): Promise<User> => {
  // Replace `/user/update/${user.id}/` with your actual API endpoint
  return apiPut<User>(`/user/update/${user.id}/`, user, true);
};

// Delete a user by ID
export const deleteUser = async (userId: number): Promise<void> => {
  // Replace `/user/delete/${userId}/` with your actual API endpoint
  return apiDelete<void>(`/user/delete/${userId}/`, true);
};
