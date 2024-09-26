    // services/organization.ts
    import { apiGet, apiPut } from '../api';
    export const getOrganizationData = async () => {
    // Make sure the endpoint matches the API you're calling
    return apiGet<any>('/organization/show/1/');
    };

    interface UniversityData {
        name: string;
        phone_number: string;
        postal_code: string;
        nickname: string;
        address: string;
        owner: string;
    }
    export const updateOrganizationData = async (id: number, updatedData: UniversityData) => {
    const endpoint = `/organization/update/${id}/`;
    return apiPut(endpoint, updatedData);
    };
