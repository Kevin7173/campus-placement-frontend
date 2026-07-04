import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Main Pages
const LandingPage = lazy(() => import("../pages/LandingPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));

import RegisterRolePage from "../pages/RegisterRolePage";
import StudentRegisterPage from "../pages/StudentRegisterPage";
import CompanyRegisterPage from "../pages/CompanyRegisterPage";
import AdminRegisterPage from "../pages/AdminRegisterPage";

// Protected Route
import ProtectedRoute from "../components/ProtectedRoute";

// Dashboards
const StudentDashboard = lazy(() => import("../pages/StudentDashboard"));
const CompanyDashboard = lazy(() => import("../pages/CompanyDashboard"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

// Student Pages
import StudentProfile from "../pages/student/StudentProfile";
import StudentJobs from "../pages/student/StudentJobs";
import StudentApplications from "../pages/student/StudentApplications";
import StudentPlacements from "../pages/student/StudentPlacements";
import UploadResume from "../pages/student/UploadResume";
import UploadProfileImage from "../pages/student/UploadProfileImage";
import StudentSettings from "../pages/student/StudentSettings";

// Company Pages
// Company Pages
import PostJobs from "../pages/company/PostJobs";
import ManageJobs from "../pages/company/ManageJobs";
import Applicants from "../pages/company/Applicants";
import Interviews from "../pages/company/Interviews";
import CompanySettings from "../pages/company/CompanySettings";
import JobApplicants from "../pages/company/JobApplicants";

// Admin Pages
import ManageStudents from "../pages/admin/ManageStudents";
import ManageCompanies from "../pages/admin/ManageCompanies";
import Placements from "../pages/admin/Placements";
import AdminSettings from "../pages/admin/AdminSettings";

import UploadLogo from "../pages/company/UploadLogo";

const AppRoutes = () => {
  return (
  <Suspense
    fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    }
  >
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterRolePage />} />

      <Route
        path="/register/student"
        element={<StudentRegisterPage />}
      />

      <Route
        path="/register/company"
        element={<CompanyRegisterPage />}
      />

      <Route
        path="/register/admin"
        element={<AdminRegisterPage />}
      />

      

      {/* Student Routes */}

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/jobs"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentJobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/applications"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentApplications />
          </ProtectedRoute>
        }
      />

     <Route
  path="/student/placements"
  element={
    <ProtectedRoute allowedRole="student">
      <StudentPlacements />
    </ProtectedRoute>
  }
/>

      <Route
        path="/student/upload-resume"
        element={
         <ProtectedRoute allowedRole="student">
          <UploadResume />
         </ProtectedRoute>
       }
      />
      <Route
  path="/student/upload-profile-image"
  element={
    <ProtectedRoute allowedRole="student">
      <UploadProfileImage />
    </ProtectedRoute>
  }
/>

      <Route
        path="/student/settings"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentSettings />
          </ProtectedRoute>
        }
      />

      {/* Company Routes */}

      <Route
        path="/company"
        element={
          <ProtectedRoute allowedRole="company">
            <CompanyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/company/post-jobs"
        element={
          <ProtectedRoute allowedRole="company">
            <PostJobs />
          </ProtectedRoute>
        }
      />
      
      <Route
  path="/company/manage-jobs"
  element={
    <ProtectedRoute allowedRole="company">
      <ManageJobs />
    </ProtectedRoute>
  }
/>

       <Route
  path="/company/job/:jobId/applicants"
  element={
    <ProtectedRoute allowedRole="company">
      <JobApplicants />
    </ProtectedRoute>
  }
/>
      <Route
  path="/company/upload-logo"
  element={
    <ProtectedRoute allowedRole="company">
      <UploadLogo />
    </ProtectedRoute>
  }
/>

      <Route
        path="/company/applicants"
        element={
          <ProtectedRoute allowedRole="company">
            <Applicants />
          </ProtectedRoute>
        }
      />

      <Route
        path="/company/interviews"
        element={
          <ProtectedRoute allowedRole="company">
            <Interviews />
          </ProtectedRoute>
        }
      />

      <Route
        path="/company/settings"
        element={
          <ProtectedRoute allowedRole="company">
            <CompanySettings />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/students"
        element={
          <ProtectedRoute allowedRole="admin">
            <ManageStudents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/companies"
        element={
          <ProtectedRoute allowedRole="admin">
            <ManageCompanies />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/placements"
        element={
          <ProtectedRoute allowedRole="admin">
            <Placements />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminSettings />
          </ProtectedRoute>
        }
      />

     
   </Routes>
</Suspense>
);
};

export default AppRoutes;