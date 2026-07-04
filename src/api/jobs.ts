import API from "./axios";

// ===============================
// Public Jobs
// ===============================

export const getJobs = () =>
  API.get("/jobs");

export const getJob = (id: string) =>
  API.get(`/jobs/${id}`);

// ===============================
// Company Jobs
// ===============================

export const getCompanyJobs = () =>
  API.get("/jobs/company");

// ===============================
// Create Job
// ===============================

export const createJob = (data: any) =>
  API.post("/jobs", data);

// ===============================
// Update Job
// ===============================

export const updateJob = (
  id: string,
  data: any
) =>
  API.put(`/jobs/${id}`, data);

// ===============================
// Delete Job
// ===============================

export const deleteJob = (id: string) =>
  API.delete(`/jobs/${id}`);

export const toggleJobStatus = (
  id: string
) =>
  API.put(`/jobs/toggle/${id}`);