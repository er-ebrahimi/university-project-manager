import { Organization } from "@/functions/services/organization";

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
  AssociateProfessor: string;
  EmploymentDate: Date;
  fields: string[];
  publishedAsseyDate: number[];
}

export interface Major {
  name: string;
  id: number;
  nickname: string;
  address:string;
  phone_number: number;
  postal_code: number;
  create_date: Date;
  people: any[];
  organization: Organization;

  // Add other properties as needed
}
