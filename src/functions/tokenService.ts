// import { access } from "fs";

// tokenService.ts
export const setTokens = (accessToken: string, refreshToken: string) => {
//   console.log("🚀 ~ setTokens ~ refreshToken:", refreshToken)
//   console.log("🚀 ~ setTokens ~ accessToken:", accessToken)
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
