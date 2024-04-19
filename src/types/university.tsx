export interface University {
  professors: Professor[];
}

export interface Professor {
  id: number;
  ProfessorFN: string;
  ProfessorLN: string;
  major: string;
  BirthDate: Date;
  TeacherAssistant: Date;
  AssociateProfessor: Date;
  EmploymentDate: Date;
  fields: string[];
  publishedAsseyDate: number[];
}
