import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getCompanyDashboard } from "../api/company";
import { UPLOAD_URL } from "../config/api";
import { useNavigate } from "react-router-dom";

import {
  Briefcase,
  Users,
  Calendar,
  Building2,
} from "lucide-react";

import StatCard from "../components/cards/StatCard";
import AnalyticsCard from "../components/cards/AnalyticsCard";

const CompanyDashboard = () => {

  const [dashboard, setDashboard] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
  loadDashboard();

  window.addEventListener(
    "focus",
    loadDashboard
  );

  return () =>
    window.removeEventListener(
      "focus",
      loadDashboard
    );
}, []);

  const loadDashboard = async () => {
    try {

      const res = await getCompanyDashboard();

      setDashboard(res.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <DashboardLayout role="company">

        <div className="flex justify-center items-center h-[70vh]">

          <h1 className="text-3xl font-bold">
            Loading Dashboard...
          </h1>

        </div>

      </DashboardLayout>
    );

  }

  return (
    <DashboardLayout role="company">

      <div className="space-y-8">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Company Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Welcome back,
              {" "}
              {dashboard.company.companyName}
            </p>

          </div>

          <img
          loading="lazy"
            
              src={
  dashboard.company.logo
    ? `${UPLOAD_URL}/logos/${dashboard.company.logo}`
    : "/company-placeholder.png"
}
            
            alt="Company Logo"
            className="w-24 h-24 rounded-xl bg-white object-cover p-2"
          />

        </div>

        {/* Stats */}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Job Posts"
            value={dashboard.totalJobs}
            icon={<Briefcase size={32} />}
            color="text-indigo-400"
          />

          <StatCard
            title="Applicants"
            value={dashboard.totalApplicants}
            icon={<Users size={32} />}
            color="text-green-400"
          />

          <StatCard
            title="Interviews"
            value={dashboard.interviews}
            icon={<Calendar size={32} />}
            color="text-yellow-400"
          />

          <StatCard
            title="Selected"
            value={dashboard.selected}
            icon={<Building2 size={32} />}
            color="text-pink-400"
          />

        </div>

        {/* Quick Actions */}

       <div className="grid md:grid-cols-3 gap-6">

  <button
    onClick={() => navigate("/company/post-jobs")}
    className="bg-indigo-600 hover:bg-indigo-500 rounded-2xl p-8 transition text-left"
  >

    <Briefcase
      size={34}
      className="mb-4"
    />

    <h3 className="font-bold text-xl">
      Post Job
    </h3>

    <p className="text-sm mt-2 text-indigo-100">
      Create a new job posting.
    </p>

  </button>

  <button
    onClick={() => navigate("/company/applicants")}
    className="bg-green-600 hover:bg-green-500 rounded-2xl p-8 transition text-left"
  >

    <Users
      size={34}
      className="mb-4"
    />

    <h3 className="font-bold text-xl">
      Applicants
    </h3>

    <p className="text-sm mt-2 text-green-100">
      Review student applications.
    </p>

  </button>

  <button
    onClick={() => navigate("/company/interviews")}
    className="bg-pink-600 hover:bg-pink-500 rounded-2xl p-8 transition text-left"
  >

    <Calendar
      size={34}
      className="mb-4"
    />

    <h3 className="font-bold text-xl">
      Interviews
    </h3>

    <p className="text-sm mt-2 text-pink-100">
      Schedule and manage interviews.
    </p>

  </button>

</div>

        {/* Analytics */}

        <div className="grid md:grid-cols-3 gap-6">

          <AnalyticsCard
            title="Applications"
            value={dashboard.totalApplicants}
            percentage={`+${dashboard.shortlisted}`}
          />

          <AnalyticsCard
            title="Interview Rate"
            value={`${dashboard.interviews}`}
            percentage="+0%"
          />

          <AnalyticsCard
            title="Hiring Success"
            value={`${dashboard.selected}`}
            percentage="+0%"
          />

        </div>

        {/* Recent Applicants */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

  <h2 className="text-2xl font-bold mb-6">
    Recent Applicants
  </h2>

  <div className="space-y-4">

    {dashboard.recentApplicants.length === 0 ? (

      <p className="text-slate-400">
        No applicants yet.
      </p>

    ) : (

      dashboard.recentApplicants.map(
        (application: any) => (

          <div
            key={application._id}
            className="bg-slate-800 rounded-xl p-4 flex justify-between items-center"
          >

            <div className="flex items-center gap-4">

              <img
                src={
                  application.student.profileImage
                   ? `${UPLOAD_URL}/profile-images/${application.student.profileImage}`
                    : "https://via.placeholder.com/60"
                }
                alt="Student"
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>

                <h3 className="font-semibold">
                  {application.student.fullName}
                </h3>

                <p className="text-slate-400 text-sm">
                  {application.job.title}
                </p>

              </div>

            </div>

            <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm">

              {application.status}

            </span>

          </div>

        )
      )

    )}

  </div>

</div>

{/* Recent Jobs */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

  <h2 className="text-2xl font-bold mb-6">
    Recently Posted Jobs
  </h2>

  <div className="space-y-4">

    {dashboard.recentJobs.length === 0 ? (

      <p className="text-slate-400">
        No jobs posted yet.
      </p>

    ) : (

      dashboard.recentJobs.map(
        (job: any) => (

          <div
            key={job._id}
            className="bg-slate-800 rounded-xl p-4 flex justify-between items-center"
          >

            <div>

              <h3 className="font-semibold">
                {job.title}
              </h3>

              <p className="text-slate-400 text-sm">
                {job.location}
              </p>

            </div>

            <span className="bg-green-600 px-3 py-1 rounded-full text-sm">

              {job.employmentType}

            </span>

          </div>

        )
      )

    )}

  </div>

</div>

{/* Company Summary */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

  <h2 className="text-2xl font-bold mb-6">
    Company Summary
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div>

      <p className="text-slate-400">
        Company Name
      </p>

      <h3 className="font-semibold mt-1">
        {dashboard.company.companyName}
      </h3>

    </div>

    <div>

      <p className="text-slate-400">
        Location
      </p>

      <h3 className="font-semibold mt-1">
        {dashboard.company.location}
      </h3>

    </div>

    <div>

      <p className="text-slate-400">
        Email
      </p>

      <h3 className="font-semibold mt-1">
        {dashboard.company.email}
      </h3>

    </div>

    <div>

      <p className="text-slate-400">
        Total Jobs
      </p>

      <h3 className="font-semibold mt-1">
        {dashboard.totalJobs}
      </h3>

    </div>

  </div>

</div>

</div>

    </DashboardLayout>

  );

};

export default CompanyDashboard;