import { AddProjectData } from "@/components/univercitypage/AddProject";
import { apiDelete, apiGet, apiPost, apiPut } from "../api";
import { User } from "@/types/userType";
import { DataItem } from "./organization";

export interface Project {
  id: number;
  owner: User;
  subOrganization: DataItem;
  name: string;
  nickname: string;
  start_date: string; // ISO 8601 date string
  end_date: string; // ISO 8601 date string
  real_start_date: string; // ISO 8601 date string
  real_end_date: string; // ISO 8601 date string
  external_members: string;
  create_date: string; // ISO 8601 date string
}
export const getProject = async (projectid: string | undefined) => {
  return apiGet<Project>(`/project/show/${projectid}/`, true);
};
export const getprojectList = async () => {
  return apiGet<Project[]>(`/project/list/`, true);
};

export const putproject = async (
  data: AddProjectData,
  projectid: string | undefined
) => {
  return apiPut<AddProjectData>(`/project/update/${projectid}/`, data, true);
};
export const postAddProject = async (data: AddProjectData) => {
  return apiPost<AddProjectData>("/project/create/", data, true);
};

export interface addProfessor {
  subOrganizations: string;
}
export const deleteProject = async (projectid: string | undefined) => {
  apiDelete(`/project/delete/${projectid}/`, true);
};
export const deleteProjectFile = async (projectid: string | undefined) => {
  apiDelete(`/projectfile/delete/${projectid}/`, true);
};

export const PutAddProfessor = async (
  professorId: string,
  user: addProfessor
): Promise<addProfessor> => {
  // Replace `/user/update/${user.id}/` with your actual API endpoint
  return apiPut<addProfessor>(`/user/update/${professorId}/`, user, true);
};
