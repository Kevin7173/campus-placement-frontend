import API from "./axios";

// ===============================
// Company Profile
// ===============================

export const getCompanyProfile = () =>
  API.get("/company/profile");

export const createCompanyProfile = (data: any) =>
  API.post("/company/profile", data);

export const updateCompanyProfile = (data: any) =>
  API.put("/company/profile", data);

// ===============================
// Company Dashboard
// ===============================

export const getCompanyDashboard = () =>
  API.get("/company/dashboard");

// ===============================
// Upload Company Logo
// ===============================

export const uploadCompanyLogo = (
  formData: FormData
) =>
  API.post(
    "/company/logo",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  export const getCompanyInterviews = () =>
  API.get("/company/interviews");