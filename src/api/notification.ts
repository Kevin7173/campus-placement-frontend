import API from "./axios";

export const getNotifications = () =>
  API.get("/api/notifications");

export const markAsRead = (id: string) =>
  API.put(`/api/notifications/${id}/read`);