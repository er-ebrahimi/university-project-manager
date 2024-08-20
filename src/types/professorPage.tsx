export interface Project {
    id: number;
    title: string;
  }
  
export  interface Professor {
    id: number;
    name: string;
    projects: Project[];
  }
  
  