// types/user.ts

export interface UserPermissions {
  id: number;
  name: string;
  add_subOrganization: boolean;
  add_manager: boolean;
  add_project: boolean;
  user_access: boolean;
}

export interface User {
  id: number;
  username: string;
  nickname: string;
  first_name: string;
  last_name: string;
  social_id_number: string;
  personal_id_number: string;
  mobile_phone_number: string;
  phone_number: string;
  education_level: Degree|undefined;
  subOrganizations: any; // You can define this more precisely if needed
  create_date: string; // Consider using Date if appropriate
  // user_permissions: UserPermissions;
  admin:boolean;
  crud_project:boolean;
  projects?:any[];
  password?:string;
}
//function render the education level to persian
export type Degree = 'BSc' | 'Ms' | 'PhD' | 'Prof';

export const degreeToPersian = (degree: Degree|undefined): string => {
  switch (degree) {
    case 'BSc':
      return 'کارشناسی';
    case 'Ms':
      return 'کارشناسی ارشد';
    case 'PhD':
      return 'دکتری';
    case 'Prof':
      return 'استاد';
    default:
      return 'نامشخص'; // Default in case of an invalid input
  }
};
