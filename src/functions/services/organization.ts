// services/organization.ts
import { apiDelete, apiGet, apiPost, apiPut } from "../api";
export const getOrganizationData = async () => {
  // Make sure the endpoint matches the API you're calling
  return apiGet<any>("/organization/show/1/");
};
interface UserPermissions {
  id: number;
  name: string;
  add_subOrganization: boolean;
  add_manager: boolean;
  add_project: boolean;
  user_access: boolean;
}

interface Owner {
  id: number;
  username: string;
  user_permissions: UserPermissions;
}

export interface Organization {
  id: number;
  owner: Owner;
  name: string;
  nickname: string;
  phone_number: string;
  postal_code: string;
  address: string;
  create_date: string;
}

export interface DataItem {
  id: number;
  owner: Owner;
  organization: Organization;
  name: string;
  nickname: string;
  phone_number: string;
  postal_code: string;
  address: string;
  create_date: string;
  people: any[]; // You can define a more specific type for 'people' if required
}

interface ResponseAddmajor {
  success: boolean;
  data: any;
  message?: string;
}

interface UniversityData {
  name: string;
  phone_number: string;
  postal_code: string;
  nickname: string;
  address: string;
  owner: string;
}
export interface createUniversityData {
  name: string;
  nickname: string;
  address: string;
  owner: number;
  organization: number;
}
export const updateOrganizationData = async (
  id: number,
  updatedData: UniversityData
) => {
  const endpoint = `/organization/update/${id}/`;
  return apiPut(endpoint, updatedData);
};
export const updatesuborhanization = async (
  id: string | undefined,
  updatedData: DataItem
) => {
  const endpoint = `/suborganization/update/${id}/`;
  return apiPut(endpoint, updatedData,true);
};
export const deleteSubOrganization = async (id: string | undefined) => {
  return apiDelete(`/suborganization/delete/${id}/`,true)
};

export const CreateOrganization = async (
  data: createUniversityData
): Promise<ResponseAddmajor> => {
  return await apiPost<ResponseAddmajor>(
    "/suborganization/create/",
    data,
    true
  );
};

export const getSuborganizationData = async () => {
  return apiGet<DataItem[]>("/suborganization/list/", true);
};
export const getSubOrganization = async (id: string | undefined) => {
  return apiGet<DataItem>(`/suborganization/show/${id}/`, true);
};
