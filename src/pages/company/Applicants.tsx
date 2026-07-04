import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { UPLOAD_URL } from "../../config/api";
import {
  getCompanyApplications,
  updateApplicationStatus,
} from "../../api/applications";

import {
  Search,
  User,
  GraduationCap,
  Briefcase,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";

interface Applicant {
  _id: string;

  status: string;

  student: {
    _id: string;
    fullName: string;
    email: string;
    department: string;
    cgpa: number;
    phone?: string;
    skills?: string;
    resume?: string;
    profileImage?: string;
  };

  job: {
  _id: string;
  title: string;

  company: {
    companyName: string;
    logo?: string;
  };
};
}

const Applicants = () => {

  const [applications, setApplications] =
    useState<Applicant[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusMap, setStatusMap] =
    useState<Record<string, string>>({});

  useEffect(() => {
    loadApplicants();
  }, []);

  const loadApplicants = async () => {
    try {

      const res =
        await getCompanyApplications();

      setApplications(res.data);

      const map: Record<string, string> = {};

      res.data.forEach((app: Applicant) => {
        map[app._id] = app.status;
      });

      setStatusMap(map);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const updateStatus = async (
    applicationId: string
  ) => {

    try {

      await updateApplicationStatus(
        applicationId,
        {
          status:
            statusMap[applicationId],
        }
      );

      toast.success("Application Updated Successfully");

      loadApplicants();

    } catch (error) {

      console.error(error);

      toast.error("Failed to update application");

    }

  };

  const filteredApplicants =
    useMemo(() => {

      return applications.filter(
        (application) =>

          application.student.fullName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          application.job.title
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

      <DashboardLayout role="company">

        <div className="flex justify-center items-center h-[70vh]">

          <h1 className="text-3xl font-bold">

            Loading Applicants...

          </h1>

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout role="company">

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">

            Applicants

          </h1>

          <p className="text-slate-400 mt-2">

            Manage all students who applied for your jobs.

          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3 px-4 py-3">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search applicants..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-transparent outline-none w-full"
          />

        </div>

                {/* Applicant Cards */}

        {filteredApplicants.length === 0 ? (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">

            <h2 className="text-2xl font-bold">
              No Applicants Found
            </h2>

            <p className="text-slate-400 mt-2">
              No students have applied for your jobs yet.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {filteredApplicants.map((application) => (

              <div
                key={application._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-500 transition duration-300"
              >

                <div className="grid lg:grid-cols-3 gap-8">

                  {/* Student Information */}

<div>

  <div className="flex items-center gap-4 mb-5">

    <img
      src={
        application.student.profileImage
          ? `${UPLOAD_URL}/profile-images/${application.student.profileImage}`
          : "https://via.placeholder.com/80"
      }
      alt="Student"
      className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
    />

    <div>

      <h2 className="text-2xl font-bold">
        {application.student.fullName}
      </h2>

      <p className="text-slate-400">
        {application.student.department}
      </p>

    </div>

  </div>

                    <div className="space-y-4">

                      <div className="flex items-center gap-3 text-slate-300">

                        <Mail size={18} />

                        <span>{application.student.email}</span>

                      </div>

                      <div className="flex items-center gap-3 text-slate-300">

                        <GraduationCap size={18} />

                        <span>{application.student.department}</span>

                      </div>

                      <div className="flex items-center gap-3 text-slate-300">

                        <User size={18} />

                        <span>
                          CGPA : {application.student.cgpa}
                          <div className="mt-5">

  {application.student.resume ? (

    <a
      href={`${UPLOAD_URL}/resumes/${application.student.resume}`}
      target="_blank"
      rel="noreferrer"
      className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg inline-block transition"
    >
      View Resume
    </a>

  ) : (

    <span className="text-red-400">
      Resume Not Uploaded
    </span>

  )}

</div>
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Job Information */}

<div>

  <h3 className="text-xl font-semibold mb-5">
    Applied Job
  </h3>

  {application.job.company?.logo && (

    <img
      src={`${UPLOAD_URL}/company-logos/${application.job.company.logo}`}
      alt="Company Logo"
      className="w-16 h-16 rounded-xl object-cover bg-white p-2 mb-4"
    />

  )}

  <div className="flex items-center gap-3">

    <Briefcase size={18} />

    <span>{application.job.title}</span>

  </div>

</div>

                  {/* Status */}

                  <div>

                    <h3 className="text-xl font-semibold mb-5">
                      Application Status
                    </h3>

                    <span
                      className={`${statusColor(
                        application.status
                      )} inline-block px-4 py-2 rounded-full font-semibold`}
                    >
                      {application.status}
                    </span>

                    <div className="mt-6 space-y-4">

                      <select
                        value={
                          statusMap[application._id] ||
                          application.status
                        }
                        onChange={(e) =>
                          setStatusMap({
                            ...statusMap,
                            [application._id]:
                              e.target.value,
                          })
                        }
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none"
                      >
                        <option value="Pending">
  Pending
</option>

                        <option value="Shortlisted">
                          Shortlisted
                        </option>

                        <option value="Interview Scheduled">
                          Interview Scheduled
                        </option>

                        <option value="Selected">
                          Selected
                        </option>

                        <option value="Rejected">
                          Rejected
                        </option>

                      </select>

                      <button
                        onClick={() =>
                          updateStatus(
                            application._id
                          )
                        }
                        className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-xl font-semibold transition"
                      >
                        Update Status
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

                {/* Statistics */}

        <div className="grid md:grid-cols-5 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Total Applicants
            </h3>

            <p className="text-4xl font-bold mt-2 text-indigo-400">
              {applications.length}
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Pending
            </h3>

            <p className="text-4xl font-bold mt-2 text-yellow-400">
              {
                applications.filter(
  (app) => app.status === "Pending"
).length
              }
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Shortlisted
            </h3>

            <p className="text-4xl font-bold mt-2 text-blue-400">
              {
                applications.filter(
                  (app) => app.status === "Shortlisted"
                ).length
              }
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Interview
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
                  (app) => app.status === "Selected"
                ).length
              }
            </p>

          </div>

        </div>

        {/* Recruitment Tips */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Recruitment Tips
          </h2>

          <div className="space-y-4">

            <div className="bg-slate-800 rounded-xl p-4">
              Review each student's profile and resume before making a decision.
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              Keep application statuses updated so students stay informed.
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              Schedule interviews promptly after shortlisting candidates.
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              Provide timely updates to create a better recruitment experience.
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

};

export default Applicants;