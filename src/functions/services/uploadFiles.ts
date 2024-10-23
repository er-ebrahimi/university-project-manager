import { apiGet, apiPost } from "../api";

export interface File {
  name: string;
  file: any;
  description: string;
  create_date: Date;
  project: string | undefined;
}

export const getFilesByproj = async (projectId: string | undefined) => {
  return apiGet<File[]>(`/projectfile/showbyproject/${projectId}/`, true);
};

export const postFile = async (data: FormData) => {
  return apiPost<File>("/projectfile/create/", data, false, true);
};
