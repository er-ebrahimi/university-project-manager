import { AddProjectData } from "@/components/univercitypage/AddProject";
import { apiPost } from "../api";

export const postAddProject=async(data:AddProjectData)=>{
    return apiPost<AddProjectData>("/project/create/",data,true)
}