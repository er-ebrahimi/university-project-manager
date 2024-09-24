import { apiGet } from './api';

interface UserData {
  id: string;
  name: string;
  email: string;
}

export const fetchUserData = async () => {
  const data = await apiGet<UserData>('/user/data/');
  // Now 'data' is of type 'UserData'
  return data;
};
