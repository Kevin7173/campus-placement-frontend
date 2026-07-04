import API from "./axios";

export const getNotifications = () =>
  API.get("/notifications");

export const markAsRead = (
  id: string
) =>
  API.put(
    `/notifications/${id}/read`
  );