import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getCompanies,
  deleteCompany,
} from "../../api/adminManagement";
import toast from "react-hot-toast";
import { UPLOAD_URL } from "../../config/api";
// Optional
// import defaultLogo from "../../assets/default-company.png";

const ManageCompanies = () => {

  const [companies, setCompanies] =
    useState<any[]>([]);

  const [filteredCompanies,
    setFilteredCompanies] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  const [sortBy,
    setSortBy] =
    useState("Newest");

  const [selectedCompany,
    setSelectedCompany] =
    useState<any>(null);

  useEffect(() => {

    loadCompanies();

  }, []);

  useEffect(() => {

    filterCompanies();

  }, [
    companies,
    search,
    sortBy,
  ]);

  const loadCompanies = async () => {

    try {

      setLoading(true);

      const res =
        await getCompanies();

      setCompanies(res.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const filterCompanies = () => {

    let data = [...companies];

    if (search.trim()) {

      const keyword =
        search.toLowerCase();

      data = data.filter(

        (company) =>

          company.companyName
            ?.toLowerCase()
            .includes(keyword)

          ||

          company.location
            ?.toLowerCase()
            .includes(keyword)

          ||

          company.email
            ?.toLowerCase()
            .includes(keyword)

      );

    }

    if (sortBy === "Name") {

      data.sort((a, b) =>

        a.companyName.localeCompare(
          b.companyName
        )

      );

    }

    setFilteredCompanies(data);

  };

  const handleDelete = async (
    id: string
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this company?"
      );

    if (!confirmDelete)
      return;

    try {

      await deleteCompany(id);

      toast.success(
  "Company deleted successfully."
);
      loadCompanies();

    } catch (error) {

      console.error(error);

      toast.error(
  "Unable to delete company."
);

    }

  };

  return (

    <DashboardLayout role="admin">

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold">

            Manage Companies

          </h1>

          <p className="text-slate-400 mt-2">

            View, search and manage all registered companies.

          </p>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h3 className="text-slate-400">

              Total Companies

            </h3>

            <p className="text-4xl font-bold mt-3">

              {companies.length}

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h3 className="text-slate-400">

              Logo Uploaded

            </h3>

            <p className="text-4xl font-bold mt-3 text-green-400">

              {
                companies.filter(
                  (c) => c.logo
                ).length
              }

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h3 className="text-slate-400">

              Websites Added

            </h3>

            <p className="text-4xl font-bold mt-3 text-indigo-400">

              {
                companies.filter(
                  (c) => c.website
                ).length
              }

            </p>

          </div>

        </div>

        {/* Search & Sort */}

        <div className="flex flex-col lg:flex-row gap-4">

          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="flex-1 bg-slate-800 rounded-xl p-3"
          />

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="bg-slate-800 rounded-xl px-4"
          >

            <option>
              Newest
            </option>

            <option>
              Name
            </option>

          </select>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="flex justify-center items-center h-80">

            <h2 className="text-2xl font-bold">

              Loading Companies...

            </h2>

          </div>

        ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {filteredCompanies.length === 0 ? (

              <div className="col-span-full text-center py-20">

                <h2 className="text-2xl font-semibold text-slate-400">

                  No companies found.

                </h2>

              </div>

            ) : (

              filteredCompanies.map((company) => (

                <div
                  key={company._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 hover:shadow-xl transition-all duration-300"
                >

                  <div className="flex items-center gap-5">

                    <img
                      src={
                        company.logo
                          ? `${UPLOAD_URL}/company-logos/${company.logo}`
                          : "https://via.placeholder.com/100"
                      }
                      alt={company.companyName}
                      className="w-24 h-24 rounded-2xl object-cover border border-slate-700"
                    />

                    <div className="flex-1">

                      <h2 className="text-2xl font-bold">

                        {company.companyName}

                      </h2>

                      <p className="text-slate-400 mt-1">

                        {company.email || "No Email"}

                      </p>

                      <p className="mt-2">

                        📍 {company.location || "Location not available"}

                      </p>

                      <p className="text-slate-400">

                        🌐 {company.website || "No Website"}

                      </p>

                    </div>

                  </div>

                  {/* Company Description */}

                  <div className="mt-5">

                    <p className="text-slate-400 line-clamp-2">

                      {company.description ||

                        "No company description available."}

                    </p>

                  </div>

                  {/* Action Buttons */}

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <button
                      onClick={() =>
                        setSelectedCompany(company)
                      }
                      className="bg-indigo-600 hover:bg-indigo-500 rounded-xl py-3 font-semibold transition"
                    >

                      View Details

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(company._id)
                      }
                      className="bg-red-600 hover:bg-red-500 rounded-xl py-3 font-semibold transition"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        )}
                {/* Company Details Modal */}

        {selectedCompany && (

          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">

              {/* Header */}

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold">

                  Company Details

                </h2>

                <button
                  onClick={() =>
                    setSelectedCompany(null)
                  }
                  className="text-3xl text-slate-400 hover:text-white transition"
                >

                  ×

                </button>

              </div>

              {/* Company Profile */}

              <div className="grid md:grid-cols-3 gap-8">

                <div className="flex flex-col items-center">

                  <img
                    src={
                      selectedCompany.logo
                        ? `${UPLOAD_URL}/company-logos/${selectedCompany.logo}`
                        : "https://via.placeholder.com/180"
                    }
                    alt={selectedCompany.companyName}
                    className="w-44 h-44 rounded-2xl object-cover border-4 border-indigo-600"
                  />

                  <h3 className="text-2xl font-bold mt-5 text-center">

                    {selectedCompany.companyName}

                  </h3>

                  <p className="text-slate-400 mt-2">

                    {selectedCompany.location || "Location not available"}

                  </p>

                </div>

                <div className="md:col-span-2 space-y-4">

                  <div className="grid md:grid-cols-2 gap-4">

                    <div className="bg-slate-800 rounded-xl p-4">

                      <p className="text-slate-400">

                        Email

                      </p>

                      <p className="font-semibold break-all">

                        {selectedCompany.email || "N/A"}

                      </p>

                    </div>

                    <div className="bg-slate-800 rounded-xl p-4">

                      <p className="text-slate-400">

                        Phone

                      </p>

                      <p className="font-semibold">

                        {selectedCompany.phone || "N/A"}

                      </p>

                    </div>

                    <div className="bg-slate-800 rounded-xl p-4">

                      <p className="text-slate-400">

                        Website

                      </p>

                      {selectedCompany.website ? (

                        <a
                          href={selectedCompany.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:underline break-all"
                        >

                          {selectedCompany.website}

                        </a>

                      ) : (

                        <p>N/A</p>

                      )}

                    </div>

                    <div className="bg-slate-800 rounded-xl p-4">

                      <p className="text-slate-400">

                        Jobs Posted

                      </p>

                      <p className="font-semibold">

                        {selectedCompany.jobsPosted ?? 0}

                      </p>

                    </div>

                  </div>

                  <div className="bg-slate-800 rounded-xl p-5">

                    <h4 className="font-semibold mb-3">

                      Company Description

                    </h4>

                    <p className="leading-7 text-slate-300">

                      {selectedCompany.description ||

                        "No description available."}

                    </p>

                  </div>

                </div>

              </div>

              {/* Footer Buttons */}

              <div className="flex flex-wrap gap-4 justify-end mt-8">

                {selectedCompany.website && (

                  <a
                    href={selectedCompany.website}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-semibold transition"
                  >

                    Visit Website

                  </a>

                )}

                <button
                  onClick={() =>
                    setSelectedCompany(null)
                  }
                  className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold transition"
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

export default ManageCompanies;
