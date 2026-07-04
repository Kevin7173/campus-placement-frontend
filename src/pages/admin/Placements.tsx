import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getPlacements,
  deletePlacement,
  updatePlacement,
} from "../../api/placement";

import { Download ,Printer} from "lucide-react";
import toast from "react-hot-toast";

const Placements = () => {

  const [placements, setPlacements] =
    useState<any[]>([]);

  const [filteredPlacements, setFilteredPlacements] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedPlacement, setSelectedPlacement] =
    useState<any>(null);

  useEffect(() => {

    loadPlacements();

  }, []);

  useEffect(() => {

    filterPlacements();

  }, [
    placements,
    search,
    statusFilter,
  ]);

  const loadPlacements = async () => {

    try {

      setLoading(true);

      const res =
        await getPlacements();

      setPlacements(res.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const filterPlacements = () => {

    let data = [...placements];

    if (search) {

      const keyword =
        search.toLowerCase();

      data = data.filter((placement) =>

        placement.student.fullName
          ?.toLowerCase()
          .includes(keyword)

        ||

        placement.company.companyName
          ?.toLowerCase()
          .includes(keyword)

        ||

        placement.job.title
          ?.toLowerCase()
          .includes(keyword)

      );

    }

    if (
      statusFilter !== "All"
    ) {

      data = data.filter(

        (placement) =>

          placement.status ===
          statusFilter

      );

    }

    setFilteredPlacements(data);

  };

  const exportCSV = () => {

  const headers = [

    "Student",

    "Company",

    "Job",

    "Package",

    "Status",

    "Joining Date",

  ];

  const rows = filteredPlacements.map(

    (placement) => [

      placement.student?.fullName || "",

      placement.company?.companyName || "",

      placement.job?.title || "",

      placement.package ||

      placement.job?.salary ||

      "",

      placement.status,

      placement.joiningDate

        ? new Date(

            placement.joiningDate

          ).toLocaleDateString()

        : "",

    ]

  );

  const csvContent =

    [headers, ...rows]

      .map((row) => row.join(","))

      .join("\n");

  const blob = new Blob(

    [csvContent],

    {

      type:

        "text/csv;charset=utf-8;",

    }

  );

  const url =

    window.URL.createObjectURL(blob);

  const link =

    document.createElement("a");

  link.href = url;

  link.download =

    "placements-report.csv";

  link.click();

  window.URL.revokeObjectURL(url);

};

const printReport = () => {

  const reportWindow = window.open("", "_blank");

  if (!reportWindow) return;

  reportWindow.document.write(`
    <html>

      <head>

        <title>Campus Placement Report</title>

        <style>

          body{
            font-family:Arial,sans-serif;
            padding:30px;
          }

          h1{
            text-align:center;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
          }

          th,td{
            border:1px solid #000;
            padding:10px;
            text-align:left;
          }

          th{
            background:#f2f2f2;
          }

        </style>

      </head>

      <body>

        <h1>Campus Placement Report</h1>

        <p>
          Generated on:
          ${new Date().toLocaleString()}
        </p>

        <table>

          <thead>

            <tr>

              <th>Student</th>

              <th>Company</th>

              <th>Job</th>

              <th>Package</th>

              <th>Status</th>

              <th>Joining Date</th>

            </tr>

          </thead>

          <tbody>

            ${filteredPlacements
              .map(
                (placement) => `
                  <tr>

                    <td>${placement.student?.fullName || ""}</td>

                    <td>${placement.company?.companyName || ""}</td>

                    <td>${placement.job?.title || ""}</td>

                    <td>${placement.package || placement.job?.salary || ""}</td>

                    <td>${placement.status}</td>

                    <td>${
                      placement.joiningDate
                        ? new Date(
                            placement.joiningDate
                          ).toLocaleDateString()
                        : "-"
                    }</td>

                  </tr>
                `
              )
              .join("")}

          </tbody>

        </table>

      </body>

    </html>
  `);

  reportWindow.document.close();

  reportWindow.print();

};
  const totalOffers = placements.length;

const offerSent = placements.filter(
  (p) => p.status === "Offer Sent"
).length;

const joined = placements.filter(
  (p) => p.status === "Joined"
).length;

const rejected = placements.filter(
  (p) => p.status === "Rejected"
).length;
    if (loading) {

    return (

      <DashboardLayout role="admin">

        <div className="flex justify-center items-center h-[70vh]">

          <h1 className="text-3xl font-bold">

            Loading Placements...

          </h1>

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout role="admin">

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">

            Placement Management

          </h1>

          <p className="text-slate-400 mt-2">

            View and manage all student placements.

          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <p>Total Offers</p>

            <h2 className="text-4xl font-bold mt-2">

              {totalOffers}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <p>Offer Sent</p>

            <h2 className="text-4xl font-bold text-indigo-400 mt-2">

              {offerSent}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <p>Joined</p>

            <h2 className="text-4xl font-bold text-green-400 mt-2">

              {joined}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <p>Rejected</p>

            <h2 className="text-4xl font-bold text-red-400 mt-2">

              {rejected}

            </h2>

          </div>

        </div>
                {/* Search & Filter */}

<div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search by student, company or job..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 bg-slate-800 rounded-xl p-3"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="bg-slate-800 rounded-xl px-5"
          >
            <button
  onClick={exportCSV}
  className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-5 py-3 rounded-xl font-semibold transition"
>

  <Download size={18} />

  Export CSV

</button>

<button
  onClick={printReport}
  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl font-semibold transition"
>

  <Printer size={18} />

  Print / PDF

</button>


            <option value="All">
              All
            </option>

            <option value="Offer Sent">
              Offer Sent
            </option>

            <option value="Joined">
              Joined
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

        </div>

        {/* Placement Table */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4">
                  Company
                </th>

                <th className="p-4">
                  Job
                </th>

                <th className="p-4">
                  Package
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredPlacements.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center p-10"
                  >

                    No Placements Found

                  </td>

                </tr>

              ) : (

                filteredPlacements.map(
                  (placement) => (

                    <tr
                      key={placement._id}
                      className="border-t border-slate-800 hover:bg-slate-800 transition"
                    >

                      <td className="p-4">

                        {placement.student.fullName}

                      </td>

                      <td className="text-center">

                        {placement.company.companyName}

                      </td>

                      <td className="text-center">

                        {placement.job.title}

                      </td>

                      <td className="text-center">

                        {placement.package ||
                          placement.job.salary}

                      </td>

                      <td className="text-center">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            placement.status === "Joined"

                              ? "bg-green-600"

                              : placement.status === "Offer Sent"

                              ? "bg-indigo-600"

                              : "bg-red-600"

                          }`}
                        >

                          {placement.status}

                        </span>

                      </td>

                      <td className="text-center space-x-2">

                        <button
                          onClick={() =>
                            setSelectedPlacement(
                              placement
                            )
                          }
                          className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-lg"
                        >

                          View

                        </button>

                        <button
                          onClick={async () => {

                            if (
                              !window.confirm(
                                "Delete placement?"
                              )
                            )
                              return;

                            try {

                              await deletePlacement(
                                placement._id
                              );

                              loadPlacements();

                            } catch (error) {

                              console.error(error);

                            }

                          }}
                          className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg"
                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>
                {/* Placement Details Modal */}

        {selectedPlacement && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold">

                  Placement Details

                </h2>

                <button
                  onClick={() =>
                    setSelectedPlacement(null)
                  }
                  className="text-2xl text-slate-400 hover:text-white"
                >

                  ✕

                </button>

              </div>

              <div className="grid md:grid-cols-2 gap-8">

                <div className="space-y-4">

                  <h3 className="text-xl font-semibold">

                    Student

                  </h3>

                  <p>

                    <strong>Name:</strong>{" "}
                    {selectedPlacement.student.fullName}

                  </p>

                  <p>

                    <strong>Department:</strong>{" "}
                    {selectedPlacement.student.department}

                  </p>

                </div>

                <div className="space-y-4">

                  <h3 className="text-xl font-semibold">

                    Company

                  </h3>

                  <p>

                    <strong>Name:</strong>{" "}
                    {selectedPlacement.company.companyName}

                  </p>

                  <p>

                    <strong>Job:</strong>{" "}
                    {selectedPlacement.job.title}

                  </p>

                  <p>

                    <strong>Package:</strong>{" "}
                    {selectedPlacement.package ||
                      selectedPlacement.job.salary}

                  </p>

                </div>

              </div>

              <div className="mt-8">

                <label className="block mb-2 font-semibold">

                  Placement Status

                </label>

                <select
                  value={selectedPlacement.status}
                  onChange={(e) =>
                    setSelectedPlacement({
                      ...selectedPlacement,
                      status: e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 rounded-xl p-3"
                >

                  <option value="Offer Sent">

                    Offer Sent

                  </option>

                  <option value="Joined">

                    Joined

                  </option>

                  <option value="Rejected">

                    Rejected

                  </option>

                </select>

              </div>

              <div className="flex gap-4 mt-8">

                <button
                  onClick={async () => {

                    try {

                      await updatePlacement(

                        selectedPlacement._id,

                        {

                          status:
                            selectedPlacement.status,

                        }

                      );

                      await loadPlacements();

                      setSelectedPlacement(null);

                    } catch (error) {

                      console.error(error);

                      toast.success("Placement updated successfully.");

                    }

                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-semibold"
                >

                  Save Changes

                </button>

                <button
                  onClick={() =>
                    setSelectedPlacement(null)
                  }
                  className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold"
                >

                  Close

                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>

  );

};

export default Placements;