import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createJob } from "../../api/jobs";
import { toast } from "react-hot-toast/headless";

const PostJobs = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    employmentType: "Full Time",
    skills: "",
    deadline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createJob({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        salary: formData.salary,
        employmentType: formData.employmentType,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill),

        deadline: formData.deadline,
      });

      toast.success("Job posted successfully!");

      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        employmentType: "Full Time",
        skills: "",
        deadline: "",
      });

    } catch (error: any) {

      console.error(error);

      toast.error(
  error.response?.data?.message ||
  "Unable to post job."
);

    } finally {

      setLoading(false);

    }
  };

  return (
    <DashboardLayout role="company">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Post New Job
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6"
        >
                  <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-slate-800 rounded-lg"
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className="w-full p-3 bg-slate-800 rounded-lg"
            required
          />

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg"
              required
            />

            <input
              type="text"
              name="salary"
              placeholder="Salary (Eg: ₹8 LPA)"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg"
            >
              <option value="Full Time">
                Full Time
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Part Time">
                Part Time
              </option>

            </select>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg"
            />

          </div>

          <input
            type="text"
            name="skills"
            placeholder="Required Skills (React, Node.js, MongoDB)"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 bg-slate-800 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-slate-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? "Posting Job..." : "Post Job"}
          </button>
                  </form>

      </div>

    </DashboardLayout>
  );
};

export default PostJobs;
          