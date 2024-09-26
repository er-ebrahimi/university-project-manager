    // services/organization.ts
    import { apiPost} from '../api';
    export const CreateNewUser = async (data:any) => {
    // Make sure the endpoint matches the API you're calling
    return apiPost<any>('/user/create/',data,true);
    };

    