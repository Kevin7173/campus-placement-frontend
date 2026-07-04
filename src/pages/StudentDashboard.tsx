import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getStudentDashboard } from "../api/student";
import { Link, useNavigate } from "react-router-dom";

import {
  Briefcase,
  Calendar,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

import StatCard from "../components/cards/StatCard";
import JobCard from "../components/cards/JobCard";
import AnalyticsCard from "../components/cards/AnalyticsCard";
import ChartCard from "../components/cards/ChartCard";


const StudentDashboard = () => {

  const [dashboard, setDashboard] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const res = await getStudentDashboard();

      setDashboard(res.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <DashboardLayout role="student">

        <div className="flex justify-center items-center h-[70vh]">

          <h1 className="text-3xl font-bold">
            Loading Dashboard...
          </h1>

        </div>

      </DashboardLayout>
    );

  }
  return (
    <DashboardLayout role="student">

      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="text-slate-400 mt-2">
            Here's your placement overview.
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-2 gap-6">

          <StatCard
            title="Available Jobs"
            value={dashboard.availableJobs}
            icon={<Briefcase size={32} />}
            color="text-indigo-400"
          />

          <StatCard
            title="Applications"
            value={dashboard.applications}
            icon={<CheckCircle size={32} />}
            color="text-green-400"
          />

          <StatCard
            title="Interviews"
            value={dashboard.interviews}
            icon={<Calendar size={32} />}
            color="text-yellow-400"
          />

          <StatCard
            title="Offers"
            value={dashboard.offers}
            icon={<TrendingUp size={32} />}
            color="text-pink-400"
          />

        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8">

  <h2 className="text-3xl font-bold">

    Placement Status

  </h2>

  <p className="mt-2 text-green-100">

    View your placement offers and joining details.

  </p>

  <Link
    to="/student/placements"
    className="inline-block mt-6 bg-white text-green-700 px-5 py-3 rounded-xl font-semibold hover:bg-slate-100"
  >

    View Placements

  </Link>

</div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-3 gap-6">

  <button
    onClick={() => navigate("/student/jobs")}
    className="bg-indigo-600 p-4 rounded-xl hover:bg-indigo-500 transition font-semibold"
  >
    Apply for Jobs
  </button>

  <button
    onClick={() => navigate("/student/profile")}
    className="bg-green-600 p-4 rounded-xl hover:bg-green-500 transition font-semibold"
  >
    Update Profile / Resume
  </button>

  <button
    onClick={() => navigate("/student/applications")}
    className="bg-pink-600 p-4 rounded-xl hover:bg-pink-500 transition font-semibold"
  >
    View Applications & Interviews
  </button>

</div>

        {/* Analytics */}

        <div className="grid md:grid-cols-3 gap-6">

          <AnalyticsCard
            title="Placement Rate"
            value={`${dashboard.offers * 20}%`}
            percentage="+12%"
          />

          <AnalyticsCard
            title="Interview Success"
            value={`${dashboard.interviews * 20}%`}
            percentage="+8%"
          />

          <AnalyticsCard
            title="Profile Score"
            value="100%"
            percentage="+5%"
          />

        </div>

        {/* Charts */}

        <div className="grid md:grid-cols-2 gap-6">

         <ChartCard
  title="Application Statistics"
  data={[
    {
      name: "Applied",
      value: dashboard.chartData.applied,
    },
    {
      name: "Shortlisted",
      value: dashboard.chartData.shortlisted,
    },
    {
      name: "Interview",
      value: dashboard.chartData.interviews,
    },
    {
      name: "Selected",
      value: dashboard.chartData.selected,
    },
    {
      name: "Rejected",
      value: dashboard.chartData.rejected,
    },
  ]}
/>

<ChartCard
  title="Placement Progress"
  data={[
    {
      name: "Offers",
      value: dashboard.offers,
    },
    {
      name: "Applications",
      value: dashboard.applications,
    },
  ]}
/>

        </div>

        {/* Applications + Interviews */}

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Recent Applications
            </h2>

            <div className="space-y-4">

  {dashboard.recentApplications.length === 0 ? (

    <p className="text-slate-400">
      No applications yet.
    </p>

  ) : (

    dashboard.recentApplications.map(
      (application: any) => (

        <div
          key={application._id}
          className="bg-slate-800 p-4 rounded-xl flex justify-between items-center"
        >

          <div>

            <p className="font-semibold">
              {application.job.company.companyName}
              {" - "}
              {application.job.title}
            </p>

            <p className="text-sm text-slate-400">
              Applied on{" "}
              {new Date(
                application.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

          <span className="text-indigo-400">
            {application.status}
          </span>

        </div>

      )
    )

  )}

</div>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h2 className="text-2xl font-bold mb-6">
              Upcoming Interviews
            </h2>

            <div className="space-y-4">

  {dashboard.upcomingInterviews.length === 0 ? (

    <p className="text-slate-400">
      No interviews scheduled.
    </p>

  ) : (

    dashboard.upcomingInterviews.map(
      (application: any) => (

        <div
          key={application._id}
          className="bg-slate-800 p-4 rounded-xl"
        >

          <h3 className="font-semibold">
            {application.job.company.companyName}
          </h3>

          <p className="text-slate-400 text-sm">
            {application.interviewDate || "Date not set"}
          </p>

          <p className="text-slate-500 text-xs mt-1">
            {application.interviewTime || ""}
          </p>

        </div>

      )
    )

  )}

</div>
          </div>

        </div>

        {/* Placement Progress */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-2xl font-bold mb-6">
            Placement Progress
          </h2>

          <div className="space-y-6">

            <div>
              <div className="flex justify-between mb-2">
                <span>Profile Completion</span>
                <span>90%</span>
              </div>

              <div className="h-3 bg-slate-800 rounded-full">
                <div className="h-3 bg-indigo-500 rounded-full w-[90%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Application Target</span>
                <span>70%</span>
              </div>

              <div className="h-3 bg-slate-800 rounded-full">
                <div className="h-3 bg-green-500 rounded-full w-[70%]" />
              </div>
            </div>

          </div>

        </div>

        {/* Recommended Jobs */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-2xl font-bold mb-6">
            Recommended Jobs
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="grid md:grid-cols-3 gap-6">

  {dashboard.recommendedJobs?.length ? (

    dashboard.recommendedJobs.map((job: any) => (

      <JobCard
        key={job._id}
        company={job.company.companyName}
        role={job.title}
      />

    ))

  ) : (

    <p className="text-slate-400">
      No recommended jobs available.
    </p>

  )}

</div>

            {dashboard.recommendedJobs?.map((job: any) => (

  <JobCard
    key={job._id}
    company={job.company.companyName}
    role={job.title}
  />

))}

          </div>

        </div>

        {/* Recent Activity */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="space-y-4">

  {dashboard.recentApplications?.length ? (

    dashboard.recentApplications.map(
      (application: any) => (

        <div
          key={application._id}
          className="bg-slate-800 p-4 rounded-xl"
        >

          <h3 className="font-semibold">
            {application.job.company.companyName}
          </h3>

          <p className="text-slate-400">
            {application.job.title}
          </p>

          <div className="flex justify-between mt-2">

            <span className="text-indigo-400">
              {application.status}
            </span>

            <span className="text-sm text-slate-500">
              {new Date(
                application.createdAt
              ).toLocaleDateString()}
            </span>

          </div>

        </div>

      )

    )

  ) : (

    <p className="text-slate-400">
      No recent activity.
    </p>

  )}

</div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default StudentDashboard;