import { apiGet } from "../api"

export interface pieScales{
    id:number;
    pending_percentage:string;
    doing_percentage:string;
    finished_percentage:string;
    date:Date;
    create_date:Date;
    project:number;
}

export const getPieScales = async(projectId:string|undefined)=>{
    return apiGet<pieScales[]>(`/piescale/showbyproject/${projectId}/`)
}