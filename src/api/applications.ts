import API from "./axios";

// ===============================
// Student
// ===============================

export const applyJob = (jobId: string) =>
  API.post(`/applications/${jobId}`);

export const getStudentApplications = () =>
  API.get("/applications/student");

// ===============================
// Company
// ===============================

export const getCompanyApplications = () =>
  API.get("/applications/company");

export const getApplicantsByJob = (
  jobId: string
) =>
  API.get(`/applications/company/job/${jobId}`);

// ===============================
// Update Application Status
// ===============================
export const updateApplicationStatus = (
  id: string,
  data: any
) =>
  API.put(`/applications/${id}/status`, data);