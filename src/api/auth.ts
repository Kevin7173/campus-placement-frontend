import API from "./axios";

export const registerUser = (userData: any) =>
  API.post("/api/auth/register", userData);

export const loginUser = (userData: any) =>
  API.post("/api/auth/login", userData);

export const changePassword = (data: {
  currentPassword: string;
  newPassword: string;
}) =>
  API.put("/api/auth/change-password", data);