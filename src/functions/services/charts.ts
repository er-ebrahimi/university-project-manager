import { apiGet, apiPost } from "../api";

export interface pieScales {
  id: number;
  pending_percentage: string;
  doing_percentage: string;
  finished_percentage: string;
  date: Date;
  create_date: Date;
  project: number;
}

export interface CulChart {
  id: string | undefined;
  program_progress_percentage: string;
  real_program_progress_percentage: string;
  date: Date;
  create_date?: Date;
}

export const getPieScales = async (projectId: string | undefined) => {
  return apiGet<pieScales[]>(`/piescale/showbyproject/${projectId}/`);
};

export const getTimeScalesByProj = async (projectId: string | undefined) => {
  return apiGet<CulChart[]|[]>(`/timescale/showbyproject/${projectId}/`, true);
};

export const createTimeScalesByProj = async ( data:any) => {
  return apiPost<CulChart[]|[]>(`/timescale/showbyproject/${data.projectId}/`,data, true);
};

export const getRealScalesByProj = async (projectId: string | undefined) => {
  return apiGet<CulChart[]>(`/realscale/showbyproject/${projectId}/`, true);
};
