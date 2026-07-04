import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";

const AdminSettings = () => {

  const [openPasswordModal, setOpenPasswordModal] =
    useState(false);
  return (
    <>
    <DashboardLayout role="admin">

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Admin Settings
        </h1>

        {/* Portal Configuration */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-xl font-bold mb-6">
            Portal Configuration
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="College Name"
              className="bg-slate-800 p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Academic Year"
              className="bg-slate-800 p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Placement Session"
              className="bg-slate-800 p-3 rounded-lg"
            />

          </div>

        </div>

        {/* User Management */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-xl font-bold mb-6">
            User Management
          </h2>

          <div className="space-y-3">

            <label className="flex gap-2">
              <input type="checkbox" defaultChecked />
              Allow Student Registration
            </label>

            <label className="flex gap-2">
              <input type="checkbox" defaultChecked />
              Allow Company Registration
            </label>

            <label className="flex gap-2">
              <input type="checkbox" defaultChecked />
              Require Company Approval
            </label>

          </div>

        </div>

        {/* Notification Settings */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-xl font-bold mb-6">
            Notification Settings
          </h2>

          <div className="space-y-3">

            <label className="flex gap-2">
              <input type="checkbox" defaultChecked />
              Placement Notifications
            </label>

            <label className="flex gap-2">
              <input type="checkbox" defaultChecked />
              Registration Notifications
            </label>

            <label className="flex gap-2">
              <input type="checkbox" defaultChecked />
              System Alerts
            </label>

          </div>

        </div>

        {/* Security */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-xl font-bold mb-6">
            Security Settings
          </h2>

          <button
  onClick={() => setOpenPasswordModal(true)}
  className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg transition"
>
  Change Password
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

export default AdminSettings;