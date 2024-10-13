import { AddProjectData } from "@/components/univercitypage/AddProject";
import { apiPost, apiPut } from "../api";

export const postAddProject=async(data:AddProjectData)=>{
    return apiPost<AddProjectData>("/project/create/",data,true)
}

export interface addProfessor{
    subOrganizations:string;
}

export const PutAddProfessor = async (professorId:string,user: addProfessor): Promise<addProfessor> => {
    // Replace `/user/update/${user.id}/` with your actual API endpoint
    return apiPut<addProfessor>(`/user/update/${professorId}/`, user, true);
  };