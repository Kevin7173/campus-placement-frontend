import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { uploadProfileImage } from "../../api/student";
import toast from "react-hot-toast";

const UploadProfileImage = () => {
  const [file, setFile] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files?.length) return;

    const selected = e.target.files[0];

    if (!selected.type.startsWith("image/")) {
      toast.error("Please select an image.");
      return;
    }

    setFile(selected);

    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {

    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("profileImage", file);

      const res = await uploadProfileImage(formData);

      setMessage(res.data.message);

    } catch (error: any) {

      setMessage(
        error.response?.data?.message ||
        "Upload Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <DashboardLayout role="student">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Upload Profile Picture
        </h1>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <div className="border-2 border-dashed border-slate-700 rounded-xl p-10 text-center">

            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
            />

            <p className="mt-4 text-slate-400">
              PNG, JPG or WEBP
            </p>

          </div>

          {preview && (

            <div className="mt-8 text-center">

              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 rounded-full object-cover mx-auto"
              />

            </div>

          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 p-4 rounded-xl font-semibold"
          >
            {loading
              ? "Uploading..."
              : "Upload Profile Picture"}
          </button>

          {message && (

            <div className="mt-6 bg-green-700 rounded-xl p-4">

              {message}

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default UploadProfileImage;