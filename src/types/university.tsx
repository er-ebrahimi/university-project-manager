export interface University {
  professors: Professor[];
}

export interface Professor {
  id: number;
  ProfessorFN: string;
  ProfessorLN: string;
  major: string;
  BirthDate: string;
  TeacherAssistant: string;
  AssociateProfessor: string;
  EmploymentDate: string;
  fields: string[];
  publishedAsseyDate: number[];
}
