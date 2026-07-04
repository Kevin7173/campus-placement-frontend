import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";

const StudentSettings = () => {
  const [openPasswordModal, setOpenPasswordModal] =
    useState(false);

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Student Settings
        </h1>

        {/* Profile + Notifications */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* Profile */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h2 className="text-xl font-bold mb-4">
              Profile Settings
            </h2>

            <input
              placeholder="Full Name"
              className="w-full bg-slate-800 p-3 rounded-lg mb-3"
            />

            <input
              placeholder="Email"
              className="w-full bg-slate-800 p-3 rounded-lg"
            />

          </div>

          {/* Notifications */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h2 className="text-xl font-bold mb-4">
              Notifications
            </h2>

            <div className="space-y-3">

              <label className="flex gap-2">

                <input
                  type="checkbox"
                  defaultChecked
                />

                Job Alerts

              </label>

              <label className="flex gap-2">

                <input
                  type="checkbox"
                  defaultChecked
                />

                Interview Alerts

              </label>

            </div>

          </div>

        </div>

        {/* Security */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-xl font-bold mb-4">
            Security
          </h2>

          <button
            onClick={() =>
              setOpenPasswordModal(true)
            }
            className="bg-pink-600 hover:bg-pink-700 px-5 py-3 rounded-xl transition"
          >
            Change Password
          </button>

        </div>

      </div>

      <ChangePasswordModal
        open={openPasswordModal}
        onClose={() =>
          setOpenPasswordModal(false)
        }
      />

    </DashboardLayout>
  );
};

export default StudentSettings;