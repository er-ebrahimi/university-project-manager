// services/organization.ts
import { apiGet, apiPost, apiPut } from "../api";
export const getOrganizationData = async () => {
  // Make sure the endpoint matches the API you're calling
  return apiGet<any>("/organization/show/1/");
};
interface ResponseAddmajor{
    success:boolean;
    data:any;
    message?:string;
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
}
export const updateOrganizationData = async (
  id: number,
  updatedData: UniversityData
) => {
  const endpoint = `/organization/update/${id}/`;
  return apiPut(endpoint, updatedData);
};

export const CreateOrganization = async (
    data: createUniversityData
  ): Promise<ResponseAddmajor> => {
    return await apiPost<ResponseAddmajor>('/organization/create/', data, true);
  };