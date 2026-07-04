import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { uploadResume } from "../../api/student";
import { toast } from "react-hot-toast/headless";

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resumeName, setResumeName] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const selectedFile = e.target.files[0];

    if (selectedFile.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    setFile(selectedFile);
    setResumeName(selectedFile.name);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF resume.");;
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const res = await uploadResume(formData);

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
          Upload Resume
        </h1>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <div className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center">

            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mb-6"
            />

            <p className="text-slate-400">
              Upload your latest resume in PDF format.
            </p>

          </div>

          {resumeName && (

            <div className="mt-6 bg-slate-800 rounded-xl p-4">

              <strong>Selected File:</strong>

              <p>{resumeName}</p>

            </div>

          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 transition p-4 rounded-xl font-semibold"
          >
            {loading
              ? "Uploading..."
              : "Upload Resume"}
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

export default UploadResume;