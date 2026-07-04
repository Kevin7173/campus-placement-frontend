import { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../../api/auth";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({
  open,
  onClose,
}: Props) => {

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  const handleSubmit = async () => {

    if (!currentPassword) {

      return toast.error(
        "Enter current password."
      );

    }

    if (!newPassword) {

      return toast.error(
        "Enter new password."
      );

    }

    if (newPassword.length < 6) {

      return toast.error(
        "Password should be at least 6 characters."
      );

    }

    if (newPassword !== confirmPassword) {

      return toast.error(
        "Passwords do not match."
      );

    }

    try {

      setLoading(true);

      await changePassword({

        currentPassword,

        newPassword,

      });

      toast.success(
        "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      onClose();

    } catch (error: any) {

      toast.error(

        error.response?.data?.message ||

        "Unable to change password."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">

          Change Password

        </h2>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e)=>
            setCurrentPassword(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-slate-800 mb-4"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e)=>
            setNewPassword(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-slate-800 mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>
            setConfirmPassword(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-slate-800"
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-700"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
          >
            {loading
              ? "Updating..."
              : "Update"}
          </button>

        </div>

      </div>

    </div>

  );

};

export default ChangePasswordModal;