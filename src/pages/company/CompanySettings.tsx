import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";

import {
  Building2,
  Mail,
  Globe,
  MapPin,
  Briefcase,
  FileText,
  Save,
} from "lucide-react";

import {
  getCompanyProfile,
  updateCompanyProfile,
} from "../../api/company";

interface CompanyData {
  companyName: string;
  email: string;
  website: string;
  location: string;
  industry: string;
  description: string;
  logo: string;

  eligibleDepartments: string;
  minimumCGPA: number;
}

const CompanySettings = () => {

  const [openPasswordModal, setOpenPasswordModal] =
    useState(false);
  const [company, setCompany] =
    useState<CompanyData>({
      companyName: "",
      email: "",
      website: "",
      location: "",
      industry: "",
      description: "",
      logo: "",

eligibleDepartments: "",
minimumCGPA: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res =
        await getCompanyProfile();

      setCompany(res.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setCompany({
      ...company,
      [e.target.name]:
        e.target.value,
    });
  };

  const saveCompany = async () => {
    try {
      setSaving(true);

      await updateCompanyProfile(
        company
      );

      setMessage(
        "Company Profile Updated Successfully."
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error(error);

      setMessage(
        "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="company">
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">
            Loading Company...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
    
    <DashboardLayout role="company">

      <div className="space-y-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Company Settings
            </h1>

            <p className="text-slate-400 mt-2">
              Manage your company profile.
            </p>

          </div>

          <button
            onClick={saveCompany}
            disabled={saving}
            className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl flex items-center gap-2 transition"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

        {message && (
          <div className="bg-green-600 rounded-xl p-4">
            {message}
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <div className="flex items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-green-600 flex items-center justify-center text-4xl font-bold">

              {company.companyName
                ? company.companyName.charAt(
                    0
                  )
                : "C"}

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {company.companyName}
              </h2>

              <p className="text-slate-400">
                {company.industry}
              </p>

            </div>

          </div>

        </div>

                {/* Company Information */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-8">
            Company Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="flex items-center gap-2 mb-2 text-slate-300">
                <Building2 size={18} />
                Company Name
              </label>

              <input
                type="text"
                name="companyName"
                value={company.companyName}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-green-500"
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-2 text-slate-300">
                <Mail size={18} />
                HR Email
              </label>

              <input
                type="email"
                name="email"
                value={company.email}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-green-500"
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-2 text-slate-300">
                <Globe size={18} />
                Website
              </label>

              <input
                type="text"
                name="website"
                value={company.website}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-green-500"
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-2 text-slate-300">
                <MapPin size={18} />
                Location
              </label>

              <input
                type="text"
                name="location"
                value={company.location}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-green-500"
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-2 text-slate-300">
                <Briefcase size={18} />
                Industry
              </label>

              <input
                type="text"
                name="industry"
                value={company.industry}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-green-500"
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-2 text-slate-300">
                🌐 Logo URL
              </label>

              <input
                type="text"
                name="logo"
                value={company.logo}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-green-500"
                placeholder="https://..."
              />

            </div>

          </div>

        </div>

        {/* Company Description */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">

            <FileText size={22} />

            Company Description

          </h2>

          <textarea
            rows={8}
            name="description"
            value={company.description}
            onChange={handleChange}
            placeholder="Tell students about your company..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none resize-none focus:border-green-500"
          />

        </div>

                {/* Company Logo Preview */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Company Logo Preview
          </h2>

          <div className="flex justify-center">

            {company.logo ? (
              <img
                src={company.logo}
                alt="Company Logo"
                className="w-36 h-36 object-contain rounded-xl bg-white p-4"
              />
            ) : (
              <div className="w-36 h-36 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                No Logo
              </div>
            )}

          </div>

        </div>

        {/* Recruitment Preferences */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Recruitment Preferences
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
  type="text"
  name="eligibleDepartments"
  value={company.eligibleDepartments}
  onChange={handleChange}
  placeholder="Eligible Departments"
  className="bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none"
/>

<input
  type="number"
  step="0.01"
  name="minimumCGPA"
  value={company.minimumCGPA}
  onChange={handleChange}
  placeholder="Minimum CGPA"
  className="bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none"
/>

          </div>

        </div>

        {/* Notifications */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Notifications
          </h2>

          <div className="space-y-4">

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                defaultChecked
              />

              <span>
                Email Notifications
              </span>

            </label>

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                defaultChecked
              />

              <span>
                Interview Notifications
              </span>

            </label>

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                defaultChecked
              />

              <span>
                New Applicant Alerts
              </span>

            </label>

          </div>

        </div>

        {/* Security */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Security
          </h2>

         <button
  onClick={() => setOpenPasswordModal(true)}
  className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg transition"
>
  Change Password
</button>

        </div>

        {/* Bottom Save Button */}

        <div className="flex justify-end">

          <button
            onClick={saveCompany}
            disabled={saving}
            className="bg-green-600 hover:bg-green-500 px-8 py-3 rounded-xl flex items-center gap-2 transition disabled:opacity-60"
          >
            <Save size={20} />

            {saving
              ? "Saving..."
              : "Save Company Profile"}

          </button>

        </div>

      </div>


    </DashboardLayout>
    <ChangePasswordModal
      open={openPasswordModal}
      onClose={() => setOpenPasswordModal(false)}
    />
  </>
    
  );
};

export default CompanySettings;