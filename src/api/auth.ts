import API from "./axios";

export const registerUser = (userData: any) =>
  API.post("/auth/register", userData);

export const loginUser = (userData: any) =>
  API.post("/auth/login", userData);

export const changePassword = (data: {
  currentPassword: string;
  newPassword: string;
}) => API.put("/auth/change-password", data);