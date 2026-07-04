import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getStudentApplications } from "../../api/applications";
import {
  Search,
  Building2,
  Briefcase,
  Calendar,
} from "lucide-react";

interface Application {
  _id: string;
  status: string;
  createdAt: string;
  job: {
    title: string;
    location: string;
    company: {
      companyName: string;
      location: string;
    };
  };
}

const StudentApplications = () => {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res =
        await getStudentApplications();

      setApplications(res.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications =
    useMemo(() => {
      return applications.filter(
        (application) =>
          application.job.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          application.job.company.companyName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [applications, search]);

  const statusColor = (
    status: string
  ) => {
    switch (status) {
      case "Applied":
        return "bg-yellow-600";

      case "Shortlisted":
        return "bg-blue-600";

      case "Interview Scheduled":
        return "bg-purple-600";

      case "Selected":
        return "bg-green-600";

      case "Rejected":
        return "bg-red-600";

      default:
        return "bg-slate-600";
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">
            Loading Applications...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            My Applications
          </h1>

          <p className="text-slate-400 mt-2">
            Track all your placement applications.
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3 px-4 py-3">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-transparent outline-none w-full"
          />

        </div>

                {/* Applications */}

        {filteredApplications.length === 0 ? (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">

            <h2 className="text-2xl font-bold">
              No Applications Found
            </h2>

            <p className="text-slate-400 mt-2">
              You haven't applied for any jobs yet.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {filteredApplications.map((application) => (

              <div
                key={application._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 transition"
              >

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                  <div className="space-y-4">

                    <div>

                      <h2 className="text-2xl font-bold">

                        {application.job.title}

                      </h2>

                      <div className="flex items-center gap-2 mt-2 text-slate-400">

                        <Building2 size={18} />

                        {application.job.company.companyName}

                      </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-4">

                      <div className="flex items-center gap-2">

                        <Briefcase size={18} />

                        {application.job.location}

                      </div>

                      <div className="flex items-center gap-2">

                        <Calendar size={18} />

                        Applied on{" "}
                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}

                      </div>

                    </div>

                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-4">

                    <span
                      className={`${statusColor(
                        application.status
                      )} px-5 py-2 rounded-full font-semibold`}
                    >
                      {application.status}
                    </span>

                    <div className="text-sm text-slate-400">

                      Company Location

                      <br />

                      {application.job.company.location}

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

               {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Total Applications
            </h3>

            <p className="text-4xl font-bold mt-2 text-indigo-400">
              {applications.length}
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Shortlisted
            </h3>

            <p className="text-4xl font-bold mt-2 text-blue-400">
              {
                applications.filter(
                  (app) =>
                    app.status ===
                    "Shortlisted"
                ).length
              }
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Interviews
            </h3>

            <p className="text-4xl font-bold mt-2 text-purple-400">
              {
                applications.filter(
                  (app) =>
                    app.status ===
                    "Interview Scheduled"
                ).length
              }
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Selected
            </h3>

            <p className="text-4xl font-bold mt-2 text-green-400">
              {
                applications.filter(
                  (app) =>
                    app.status ===
                    "Selected"
                ).length
              }
            </p>

          </div>

        </div>

        {/* Status Guide */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Application Status Guide
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-yellow-600 rounded-xl p-4">
              🟡 Applied – Your application has been submitted.
            </div>

            <div className="bg-blue-600 rounded-xl p-4">
              🔵 Shortlisted – Congratulations! You've been shortlisted.
            </div>

            <div className="bg-purple-600 rounded-xl p-4">
              🟣 Interview Scheduled – Prepare for your interview.
            </div>

            <div className="bg-green-600 rounded-xl p-4">
              🟢 Selected – Congratulations! You have been selected.
            </div>

            <div className="bg-red-600 rounded-xl p-4 md:col-span-2">
              🔴 Rejected – Don't worry. Keep applying to more opportunities.
            </div>

          </div>

        </div>

        {/* Tips */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Tips
          </h2>

          <div className="space-y-4">

            <div className="bg-slate-800 rounded-xl p-4">
              ✅ Keep your profile updated.
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              ✅ Check your email regularly for interview invitations.
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              ✅ Practice aptitude and coding before interviews.
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              ✅ Apply to multiple companies to improve your chances.
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default StudentApplications;