import API from "./axios";

// ===============================
// Get Student Profile
// ===============================
export const getStudentProfile = () =>
  API.get("/student/profile");

// ===============================
// Create Student Profile
// ===============================
export const createStudentProfile = (data: any) =>
  API.post("/student/profile", data);

// ===============================
// Update Student Profile
// ===============================
export const updateStudentProfile = (data: any) =>
  API.put("/student/profile", data);

// ===============================
// Upload Resume
// ===============================
export const uploadResume = (
  formData: FormData
) =>
  API.post(
    "/student/resume",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  export const uploadProfileImage = (
  formData: FormData
) =>
  API.post(
    "/student/profile-image",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  // ===============================
// Student Dashboard
// ===============================

export const getStudentDashboard = () =>
  API.get("/student/dashboard");