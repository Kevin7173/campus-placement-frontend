import API from "./axios";

// ===============================
// Get Student Profile
// ===============================
export const getStudentProfile = () =>
  API.get("/api/student/profile");

// ===============================
// Create Student Profile
// ===============================
export const createStudentProfile = (data: any) =>
  API.post("/api/student/profile", data);

// ===============================
// Update Student Profile
// ===============================
export const updateStudentProfile = (data: any) =>
  API.put("/api/student/profile", data);

// ===============================
// Upload Resume
// ===============================
export const uploadResume = (formData: FormData) =>
  API.post("/api/student/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ===============================
// Upload Profile Image
// ===============================
export const uploadProfileImage = (formData: FormData) =>
  API.post("/api/student/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ===============================
// Student Dashboard
// ===============================
export const getStudentDashboard = () =>
  API.get("/api/student/dashboard");