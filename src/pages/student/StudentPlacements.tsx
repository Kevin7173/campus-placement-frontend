import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getStudentPlacements } from "../../api/placement";
import { UPLOAD_URL } from "../../config/api";
import {
  Calendar,
  Briefcase,
  CheckCircle,
  MapPin,
  Building2,
} from "lucide-react";

const StudentPlacements = () => {

  const [placements, setPlacements] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadPlacements();

  }, []);

  const loadPlacements = async () => {

    try {

      const res =
        await getStudentPlacements();

      setPlacements(res.data);

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

            Loading Placements...

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

            My Placements

          </h1>

          <p className="text-slate-400 mt-2">

            Track all your placement offers and joining details.

          </p>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <p className="text-slate-400">

              Total Offers

            </p>

            <h2 className="text-4xl font-bold mt-3">

              {placements.length}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <p className="text-slate-400">

              Offer Sent

            </p>

            <h2 className="text-4xl font-bold text-indigo-400 mt-3">

              {
                placements.filter(
                  (p) => p.status === "Offer Sent"
                ).length
              }

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <p className="text-slate-400">

              Joined

            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">

              {
                placements.filter(
                  (p) => p.status === "Joined"
                ).length
              }

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <p className="text-slate-400">

              Rejected

            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-3">

              {
                placements.filter(
                  (p) => p.status === "Rejected"
                ).length
              }

            </h2>

          </div>

        </div>
                {/* Placement Cards */}

        {placements.length === 0 ? (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">

            <Building2
              size={60}
              className="mx-auto mb-4 text-slate-500"
            />

            <h2 className="text-3xl font-bold">

              No Placements Yet

            </h2>

            <p className="text-slate-400 mt-3">

              Keep applying for jobs. Your placement offers will appear here.

            </p>

          </div>

        ) : (

          <div className="space-y-8">

            {placements.map((placement) => (

              <div
                key={placement._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-green-500 transition-all duration-300"
              >

                {/* Congratulations */}

                <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 mb-8">

                  <div className="flex items-center gap-4">

                    <CheckCircle
                      size={42}
                    />

                    <div>

                      <h2 className="text-2xl font-bold">

                        Congratulations!

                      </h2>

                      <p className="text-green-100">

                        You have received an offer from
                        {" "}
                        <strong>

                          {placement.company.companyName}

                        </strong>

                      </p>

                    </div>

                  </div>

                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                  {/* Company */}

                  <div className="flex gap-5 items-center">

                    <img
                      src={
                        placement.company.logo
                          ? `${UPLOAD_URL}/company-logos/${placement.company.logo}`
                          : "/default-company.png"
                      }
                      alt={placement.company.companyName}
                      className="w-24 h-24 rounded-2xl object-cover bg-white p-2"
                    />

                    <div>

                      <h2 className="text-2xl font-bold">

                        {placement.company.companyName}

                      </h2>

                      <p className="flex items-center gap-2 text-slate-400 mt-2">

                        <MapPin size={16} />

                        {placement.company.location}

                      </p>

                    </div>

                  </div>

                  {/* Job */}

                  <div className="space-y-4">

                    <div className="flex items-center gap-3">

                      <Briefcase size={18} />

                      <span>

                        {placement.job.title}

                      </span>

                    </div>

                    <div>

                      <span className="text-slate-400">

                        Employment

                      </span>

                      <p className="font-semibold">

                        {placement.job.employmentType}

                      </p>

                    </div>

                    <div>

                      <span className="text-slate-400">

                        Package

                      </span>

                      <h2 className="text-2xl font-bold text-green-400">

                        {placement.package ||
                          placement.job.salary ||
                          "N/A"}

                      </h2>

                    </div>

                  </div>

                  {/* Status */}

                  <div>

                    <span
                      className={`px-4 py-2 rounded-full font-semibold inline-block ${
                        placement.status === "Joined"
                          ? "bg-green-600"
                          : placement.status === "Offer Sent"
                          ? "bg-indigo-600"
                          : placement.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                      }`}
                    >

                      {placement.status}

                    </span>

                    <div className="mt-6 space-y-4">

                      <div>

                        <div className="flex items-center gap-2">

                          <Calendar size={18} />

                          <span>

                            Joining Date

                          </span>

                        </div>

                        <p className="mt-1 text-slate-300">

                          {placement.joiningDate
                            ? new Date(
                                placement.joiningDate
                              ).toLocaleDateString()
                            : "Not Assigned"}

                        </p>

                      </div>

                      <div>

                        <span className="text-slate-400">

                          Offer Received

                        </span>

                        <p>

                          {placement.createdAt
                            ? new Date(
                                placement.createdAt
                              ).toLocaleDateString()
                            : "-"}

                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Remarks */}

                {placement.remarks && (

                  <div className="mt-8 bg-slate-800 rounded-2xl p-5">

                    <h3 className="text-xl font-semibold mb-3">

                      Remarks

                    </h3>

                    <p className="text-slate-300">

                      {placement.remarks}

                    </p>

                  </div>

                )}

                {/* Website */}

                {placement.company.website && (

                  <div className="mt-6">

                    <a
                      href={placement.company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl font-semibold transition"
                    >

                      Visit Company Website

                    </a>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}
                {/* Placement Journey */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Placement Journey

          </h2>

          <div className="space-y-4">

            {placements.map((placement) => (

              <div
                key={placement._id}
                className="bg-slate-800 rounded-xl p-5"
              >

                <h3 className="text-lg font-semibold">

                  {placement.company.companyName}

                </h3>

                <p className="text-slate-400 mt-1">

                  {placement.job.title}

                </p>

                <div className="mt-4 flex flex-wrap gap-3">

                  <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm">

                    Applied

                  </span>

                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">

                    Shortlisted

                  </span>

                  <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">

                    Interview

                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      placement.status === "Joined"
                        ? "bg-green-600"
                        : placement.status === "Offer Sent"
                        ? "bg-emerald-600"
                        : placement.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-orange-600"
                    }`}
                  >

                    {placement.status}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Career Tips */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Career Tips

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-slate-800 rounded-xl p-5">

              📄 Keep multiple copies of your offer letter and important documents.

            </div>

            <div className="bg-slate-800 rounded-xl p-5">

              📧 Stay in touch with your recruiter before your joining date.

            </div>

            <div className="bg-slate-800 rounded-xl p-5">

              💻 Continue improving your technical and communication skills.

            </div>

            <div className="bg-slate-800 rounded-xl p-5">

              🚀 Prepare well for your first day and learn about your company.

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

};

export default StudentPlacements;