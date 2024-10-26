import { apiDelete, apiGet, apiPost } from "../api";

export interface pieScales {
  id: number;
  pending_percentage: string;
  doing_percentage: string;
  finished_percentage: string;
  date: Date;
  create_date: Date;
  project: number;
}
export interface addtimeCulchart {
  project: string | undefined;
  program_progress_percentage: number;
  time_program_progress_percentage: number;
  date: string;
  // create_date?: Date;
}
export interface addRealCulchart {
  project: string | undefined;
  program_progress_percentage: number;
  real_program_progress_percentage: number;
  date: string;
  // create_date?: Date;
}

export interface CulChart {
  id: string | undefined;
  program_progress_percentage: string;
  real_program_progress_percentage: string;
  date: Date;
  create_date?: Date;
}
export interface AddPieChart {
  project: string | undefined;
  pending_percentage: number;
  doing_percentage: number;
  finished_percentage: number;
  date: string | undefined;
}

export const getPieScales = async (projectId: string | undefined) => {
  return apiGet<pieScales[]>(`/piescale/showbyproject/${projectId}/`);
};

export const getTimeScalesByProj = async (projectId: string | undefined) => {
  return apiGet<CulChart[] | []>(
    `/timescale/showbyproject/${projectId}/`,
    true
  );
};

export const createTimeScalesByProj = async (data: any) => {
  return apiPost<CulChart[] | []>(
    `/timescale/showbyproject/${data.projectId}/`,
    data,
    true
  );
};

export const getRealScalesByProj = async (projectId: string | undefined) => {
  return apiGet<CulChart[]>(`/realscale/showbyproject/${projectId}/`, true);
};

export const postPieScales = async (data: AddPieChart) => {
  return apiPost<AddPieChart>(`/piescale/create/`, data, true);
};

export const postTimeScales = async (data: addtimeCulchart) => {
  return apiPost<addtimeCulchart>("/timescale/create/", data, true);
};
export const postRealScales = async (data: addRealCulchart) => {
  return apiPost<addRealCulchart>("/realscale/create/", data, true);
};

export const deletetimescaleData = async (id: number) => {
  return apiDelete(`/timescale/delete/${id}/`);
};
export const deleterealscaleData = async (id: number) => {
  return apiDelete(`/realscale/delete/${id}/`);
};
