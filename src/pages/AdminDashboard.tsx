import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  getAdminDashboard,
  getPlacementAnalytics,
  getChartAnalytics,
  getActivityTimeline,
   getDashboardHighlights,
} from "../api/admin";


import {
  Users,
  Building2,
  Briefcase,
  CheckCircle,
  Clock,
  UserPlus,
  Building,
  FileText,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import StatCard from "../components/cards/StatCard";
import AnalyticsCard from "../components/cards/AnalyticsCard";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<any>(null);

  const [analytics, setAnalytics] =
  useState<any>(null);

const [chartData, setChartData] =
  useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [activities, setActivities] =
  useState<any[]>([]);

  const [highlights, setHighlights] =
  useState<any>(null);
useEffect(() => {

  loadDashboard();

  loadAnalytics();

  loadCharts();

   loadActivities();

   loadHighlights();
}, []);

  const loadDashboard = async () => {
    try {

      const res = await getAdminDashboard();

      setDashboard(res.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const loadAnalytics = async () => {

  try {

    const res =
      await getPlacementAnalytics();

    setAnalytics(res.data);

  } catch (error) {

    console.error(error);

  }

};

const loadCharts = async () => {

  try {

    const res =
      await getChartAnalytics();

    setChartData(res.data);

  } catch (error) {

    console.error(error);

  }

};

const loadActivities = async () => {

  try {

    const res =
      await getActivityTimeline();

    setActivities(res.data);

  } catch (error) {

    console.error(error);

  }

};

const loadHighlights = async () => {

  try {

    const res =
      await getDashboardHighlights();

    setHighlights(res.data);

  } catch (error) {

    console.error(error);

  }

};

 const COLORS = [
  "#6366F1",
  "#22C55E",
  "#EF4444",
  "#FACC15",
  "#06B6D4",
  "#A855F7",
];

  if (loading) {

  return (

    <DashboardLayout role="admin">

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />

      </div>

    </DashboardLayout>

  );

}

  return (

    <DashboardLayout role="admin">

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold">

            Admin Dashboard

          </h1>

          <p className="text-slate-400 mt-2">

            Campus Placement Portal Overview

          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-2 gap-6">

          <StatCard
            title="Students"
            value={dashboard?.totalStudents || 0}
            icon={<Users size={30} />}
            color="text-indigo-400"
          />

          <StatCard
            title="Companies"
            value={dashboard?.totalCompanies || 0}
            icon={<Building2 size={30} />}
            color="text-green-400"
          />

          <StatCard
            title="Jobs"
            value={dashboard?.totalJobs || 0}
            icon={<Briefcase size={30} />}
            color="text-yellow-400"
          />

          <StatCard
            title="Placements"
            value={dashboard?.selectedStudents || 0}
            icon={<CheckCircle size={30} />}
            color="text-pink-400"
          />

        </div>

        {/* Recent Students */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-2xl font-bold mb-6">

            Recent Students

          </h2>

          <div className="space-y-4">

            {dashboard?.recentStudents?.map((student: any) => (

              <div
                key={student._id}
                className="bg-slate-800 rounded-xl p-4"
              >

                <h3 className="font-semibold">

                  {student.fullName}

                </h3>

                <p className="text-slate-400">

                  {student.department}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Recent Companies */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-2xl font-bold mb-6">

            Recent Companies

          </h2>

          <div className="space-y-4">

            {dashboard?.recentCompanies?.map((company: any) => (

              <div
                key={company._id}
                className="bg-slate-800 rounded-xl p-4"
              >

                <h3 className="font-semibold">

                  {company.companyName}

                </h3>

                <p className="text-slate-400">

                  {company.location}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Recent Jobs */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-2xl font-bold mb-6">

            Recent Jobs

          </h2>

          <div className="space-y-4">

            {dashboard?.recentJobs?.map((job: any) => (

              <div
                key={job._id}
                className="bg-slate-800 rounded-xl p-4"
              >

                <h3 className="font-semibold">

                  {job.title}

                </h3>

                <p className="text-slate-400">

                  {job.company?.companyName}

                </p>

              </div>

            ))}

          </div>

        </div>

                {/* Placement Summary */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-2xl font-bold mb-6">

            Placement Summary

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <p className="text-slate-400">

                Total Applications

              </p>

              <h2 className="text-4xl font-bold mt-2">

                {dashboard?.totalApplications || 0}

              </h2>

            </div>

            <div>

              <p className="text-slate-400">

                Students Placed

              </p>

              <h2 className="text-4xl font-bold mt-2 text-green-400">

                {dashboard?.selectedStudents || 0}

              </h2>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-4 gap-6">

          <button
            onClick={() => navigate("/admin/students")}
            className="bg-indigo-600 p-4 rounded-xl hover:bg-indigo-500 transition"
          >

            Manage Students

          </button>

          <button
            onClick={() => navigate("/admin/companies")}
            className="bg-green-600 p-4 rounded-xl hover:bg-green-500 transition"
          >

            Manage Companies

          </button>

          

          <button
            onClick={() => navigate("/admin/placements")}
            className="bg-pink-600 p-4 rounded-xl hover:bg-pink-500 transition"
          >

            Placements

          </button>

        </div>

        {/* Analytics */}

        <div className="grid md:grid-cols-3 gap-6">

          <AnalyticsCard
            title="Placement Rate"
            value={`${dashboard?.placementRate || 0}%`}
            percentage="Live"
          />

          <AnalyticsCard
            title="Active Jobs"
            value={dashboard?.activeJobs || 0}
            percentage="Database"
          />

          <AnalyticsCard
            title="Today's Applications"
            value={dashboard?.todayApplications || 0}
            percentage="Today"
          />

        </div>

        {/* Today's Activity */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-2xl font-bold mb-6">

            Today's Activity

          </h2>

          <div className="space-y-4">

            <div className="bg-slate-800 p-4 rounded-xl">

              👨‍🎓 {dashboard?.todayStudents || 0} students registered today

            </div>

            <div className="bg-slate-800 p-4 rounded-xl">

              🏢 {dashboard?.todayCompanies || 0} companies joined today

            </div>

            <div className="bg-slate-800 p-4 rounded-xl">

              💼 {dashboard?.todayJobs || 0} jobs posted today

            </div>

            <div className="bg-slate-800 p-4 rounded-xl">

              📄 {dashboard?.todayApplications || 0} applications submitted today

            </div>

            <div className="bg-slate-800 p-4 rounded-xl">

              📅 {dashboard?.todayInterviews || 0} interviews scheduled

            </div>

          </div>

        </div>

      </div>

      {/* Placement Analytics */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

  <h2 className="text-3xl font-bold mb-8">

    Placement Analytics

  </h2>

  <div className="grid md:grid-cols-4 gap-6">

    <div className="bg-slate-800 rounded-xl p-6">

      <p className="text-slate-400">

        Placement Rate

      </p>

      <h2 className="text-4xl font-bold text-green-400 mt-3">

        {analytics?.placementRate || 0}%

      </h2>

    </div>

    <div className="bg-slate-800 rounded-xl p-6">

      <p className="text-slate-400">

        Joined

      </p>

      <h2 className="text-4xl font-bold text-indigo-400 mt-3">

        {analytics?.joined || 0}

      </h2>

    </div>

    <div className="bg-slate-800 rounded-xl p-6">

      <p className="text-slate-400">

        Offer Sent

      </p>

      <h2 className="text-4xl font-bold text-yellow-400 mt-3">

        {analytics?.offerSent || 0}

      </h2>

    </div>

    <div className="bg-slate-800 rounded-xl p-6">

      <p className="text-slate-400">

        Rejected

      </p>

      <h2 className="text-4xl font-bold text-red-400 mt-3">

        {analytics?.rejected || 0}

      </h2>

    </div>

  </div>

</div>

{/* Charts */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

  {/* Department Chart */}

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

    <h2 className="text-2xl font-bold mb-6">

      Placements by Department

    </h2>

    <ResponsiveContainer
      width="100%"
      height={350}
    >

      <BarChart
        data={
          chartData?.departmentData || []
        }
      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="placements"
          fill="#6366F1"
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

  {/* Status Chart */}

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

    <h2 className="text-2xl font-bold mb-6">

      Placement Status

    </h2>

    <ResponsiveContainer
      width="100%"
      height={350}
    >

      <PieChart>

        <Pie
          data={
            chartData?.statusData || []
          }
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >

          {(chartData?.statusData || []).map(
            (_: any, index: number) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            )
          )}

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>

{/* Recent Activity */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

  <h2 className="text-2xl font-bold mb-6">

    Recent Activity

  </h2>

  <div className="space-y-5">

    {activities.length === 0 ? (

      <p className="text-slate-400">

        <div className="flex flex-col items-center justify-center py-12 text-slate-400">

  <div className="text-6xl mb-4">
    📭
  </div>

  <h3 className="text-xl font-semibold">
    Nothing Here Yet
  </h3>

  <p className="mt-2">
    Activity will appear here once users start using the portal.
  </p>

</div>

      </p>

    ) : (

      activities.map((activity, index) => (

        <div
          key={index}
          className="flex gap-4 items-start border-b border-slate-800 pb-4"
        >

          <div className="bg-indigo-600 rounded-full p-3">

            {activity.type === "Student" && (
              <UserPlus size={18} />
            )}

            {activity.type === "Company" && (
              <Building size={18} />
            )}

            {activity.type === "Job" && (
              <Briefcase size={18} />
            )}

            {activity.type === "Application" && (
              <FileText size={18} />
            )}

            {activity.type === "Placement" && (
              <CheckCircle size={18} />
            )}

          </div>

          <div className="flex-1">

            <h3 className="font-semibold">

              {activity.title}

            </h3>

            <p className="text-slate-400 mt-1">

              {activity.message}

            </p>

            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">

              <Clock size={14} />

              {new Date(
                activity.createdAt
              ).toLocaleString()}

            </div>

          </div>

        </div>

      ))

    )}

  </div>

</div>

{/* Dashboard Highlights */}

<div className="grid lg:grid-cols-3 gap-8">

  {/* Top Companies */}

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

    <h2 className="text-2xl font-bold mb-6">

      🏆 Top Recruiting Companies

    </h2>

    <div className="space-y-4">

      {highlights?.topCompanies?.length === 0 ? (

        <p className="text-slate-400">

          <div className="text-center py-10 text-slate-400">

  <div className="text-5xl mb-3">
    🏢
  </div>

  <h3 className="font-semibold">
    No Placement Data
  </h3>

</div>

        </p>

      ) : (

        highlights?.topCompanies?.map(
          (company: any, index: number) => (

            <div
              key={index}
              className="flex justify-between items-center bg-slate-800 rounded-xl p-4"
            >

              <div>

                <h3 className="font-semibold">

                  {company._id?.companyName}

                </h3>

              </div>

              <span className="text-indigo-400 font-bold">

                {company.placements}

              </span>

            </div>

          )
        )

      )}

    </div>

  </div>

  {/* Top Jobs */}

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

    <h2 className="text-2xl font-bold mb-6">

      🔥 Most Applied Jobs

    </h2>

    <div className="space-y-4">

      {highlights?.topJobs?.length === 0 ? (

        <p className="text-slate-400">

          <div className="text-center py-10 text-slate-400">

  <div className="text-5xl mb-3">
    📄
  </div>

  <h3 className="font-semibold">
    No Applications Yet
  </h3>

</div>

        </p>

      ) : (

        highlights?.topJobs?.map(
          (job: any, index: number) => (

            <div
              key={index}
              className="flex justify-between items-center bg-slate-800 rounded-xl p-4"
            >

              <h3 className="font-semibold">

                {job._id?.title}

              </h3>

              <span className="text-green-400 font-bold">

                {job.applications}

              </span>

            </div>

          )
        )

      )}

    </div>

  </div>

  {/* Top Students */}

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

    <h2 className="text-2xl font-bold mb-6">

      ⭐ Top Performing Students

    </h2>

    <div className="space-y-4">

      {highlights?.topStudents?.length === 0 ? (

        <p className="text-slate-400">

          <div className="text-center py-10 text-slate-400">

  <div className="text-5xl mb-3">
    🎓
  </div>

  <h3 className="font-semibold">
    No Students Placed Yet
  </h3>

</div>

        </p>

      ) : (

        highlights?.topStudents?.map(
          (placement: any, index: number) => (

            <div
              key={index}
              className="bg-slate-800 rounded-xl p-4"
            >

              <h3 className="font-semibold">

                {placement.student?.fullName}

              </h3>

              <p className="text-slate-400">

                {placement.student?.department}

              </p>

              <p className="text-yellow-400 mt-2">

                CGPA :

                {" "}

                {placement.student?.cgpa}

              </p>

            </div>

          )
        )

      )}

    </div>

  </div>

</div>
    </DashboardLayout>

  );

};

export default AdminDashboard;