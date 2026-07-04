import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { UPLOAD_URL } from "../../config/api";
import { getJobs } from "../../api/jobs";
import { applyJob } from "../../api/applications";
import { Search } from "lucide-react";


import {
  MapPin,
  Building2,
  Briefcase,
  IndianRupee,
  Clock,
  Send,
} from "lucide-react";

interface Company {
  _id: string;
  companyName: string;
  location: string;
  logo?: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  employmentType: string;
  skills: string[];
  deadline: string;
  company: Company;
}

const StudentJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");

const [filter, setFilter] = useState("All");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await getJobs();

      setJobs(res.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const apply = async (jobId: string) => {
    try {
      await applyJob(jobId);

      setMessage(
        "Application Submitted Successfully."
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to Apply."
      );
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {

      const matchesSearch =
        job.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        job.company.companyName
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        job.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        job.employmentType === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [jobs, search, filter]);

  if (loading) {
    return (
      <DashboardLayout role="student">

        <div className="flex justify-center items-center h-[70vh]">

          <h1 className="text-3xl font-bold">
            Loading Jobs...
          </h1>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">

      <div className="space-y-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Available Jobs
            </h1>

            <p className="text-slate-400 mt-2">
              Browse the latest campus placement opportunities.
            </p>

          </div>

        </div>

        {message && (

          <div className="bg-green-600 rounded-xl p-4">

            {message}

          </div>

        )}

        <div className="grid lg:grid-cols-3 gap-4">

          <div className="bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3 px-4 py-3 mb-6">

  <Search size={20} />

  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search jobs..."
    className="bg-transparent outline-none w-full"
  />

</div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="bg-slate-900 border border-slate-800 rounded-xl px-4"
          >
            <option>All</option>
            <option>Full Time</option>
            <option>Internship</option>
            <option>Part Time</option>

          </select>

        </div>

                {/* Job Cards */}

        {filteredJobs.length === 0 ? (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">

            <h2 className="text-2xl font-bold mb-2">
              No Jobs Found
            </h2>

            <p className="text-slate-400">
              Try changing the search or filter.
            </p>

          </div>

        ) : (

          <div className=" gap-6">

            {filteredJobs.map((job) => (

              <div
                key={job._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 transition"
              >

                <div className="flex justify-between items-start">

                  <div className="flex items-center gap-4">

  <img
    src={
      job.company.logo
        ? `${UPLOAD_URL}/company-logos/${job.company.logo}`
        : "https://via.placeholder.com/70"
    }
    alt="Company Logo"
    className="w-16 h-16 rounded-xl object-cover bg-white p-2"
  />

  <div>

    <h2 className="text-2xl font-bold">
      {job.title}
    </h2>

    <div className="flex items-center gap-2 mt-2 text-slate-400">

      <Building2 size={16} />

      {job.company.companyName}

    </div>

  </div>

</div>

                  <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm">

                    {job.employmentType}

                  </span>

                </div>

                <p className="text-slate-400 mt-5">

                  {job.description}

                </p>

                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div className="flex items-center gap-2">

                    <MapPin size={18} />

                    {job.location}

                  </div>

                  <div className="flex items-center gap-2">

                    <IndianRupee size={18} />

                    {job.salary}

                  </div>

                  <div className="flex items-center gap-2">

                    <Clock size={18} />

                    {new Date(job.deadline).toLocaleDateString()}

                  </div>

                  <div className="flex items-center gap-2">

                    <Briefcase size={18} />

                    {job.skills.length} Skills

                  </div>

                </div>

                <div className="mt-6">

                  <h3 className="font-semibold mb-3">

                    Required Skills

                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {job.skills.map((skill) => (

                      <span
                        key={skill}
                        className="bg-green-600 px-3 py-1 rounded-full text-sm"
                      >

                        {skill}

                      </span>

                    ))}

                  </div>

                </div>

                <div className="mt-8 flex justify-end">

                  <button
                    onClick={() => apply(job._id)}
                    className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl flex items-center gap-2 transition"
                  >

                    <Send size={18} />

                    Apply Now

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

                {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Total Jobs
            </h3>

            <p className="text-4xl font-bold mt-2 text-indigo-400">
              {jobs.length}
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Full Time
            </h3>

            <p className="text-4xl font-bold mt-2 text-green-400">
              {
                jobs.filter(
                  (job) =>
                    job.employmentType ===
                    "Full Time"
                ).length
              }
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Internships
            </h3>

            <p className="text-4xl font-bold mt-2 text-yellow-400">
              {
                jobs.filter(
                  (job) =>
                    job.employmentType ===
                    "Internship"
                ).length
              }
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <h3 className="text-slate-400 text-sm">
              Part Time
            </h3>

            <p className="text-4xl font-bold mt-2 text-pink-400">
              {
                jobs.filter(
                  (job) =>
                    job.employmentType ===
                    "Part Time"
                ).length
              }
            </p>

          </div>

        </div>

        {/* Placement Tips */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Placement Tips
          </h2>

          <div className="space-y-4">

            <div className="bg-slate-800 rounded-xl p-4">
              ✅ Keep your resume updated before applying.
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              ✅ Apply early to improve your chances.
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              ✅ Prepare company-specific interview questions.
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              ✅ Maintain a strong CGPA and complete your profile.
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default StudentJobs;