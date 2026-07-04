import API from "./axios";

export const getAdminDashboard = () =>
  API.get("/admin/dashboard");

export const getPlacementAnalytics = () =>
  API.get("/admin/analytics");

export const getChartAnalytics = () =>
  API.get("/admin/chart-analytics");

export const getActivityTimeline = () =>
  API.get("/admin/activity");

export const getDashboardHighlights = () =>
  API.get("/admin/dashboard-highlights");