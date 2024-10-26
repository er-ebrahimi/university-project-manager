// api.ts
import { httpRequest } from "./httpsrequest";
// Helper functions for different HTTP methods

export const apiGet = <T>(
  endpoint: string,
  includeHeaders: boolean = true
): Promise<T> => {
  return httpRequest<T>(endpoint, { method: "GET", includeHeaders });
};

export const apiPost = <T>(
  endpoint: string,
  data: any,
  includeHeaders: boolean = true,
  includeFormDataHeaders: boolean = false
): Promise<T> => {
  return httpRequest<T>(endpoint, {
    method: "POST",
    data,
    includeHeaders,
    includeFormDataHeaders,
  });
};

export const apiPut = <T>(
  endpoint: string,
  data: any,
  includeHeaders: boolean = true
): Promise<T> => {
  return httpRequest<T>(endpoint, { method: "PUT", data, includeHeaders });
};

export const apiDelete = <T>(
  endpoint: string,
  includeHeaders: boolean = true
): Promise<T> => {
  return httpRequest<T>(endpoint, { method: "DELETE", includeHeaders });
};
