import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getCompanyJobs,
  deleteJob,
  toggleJobStatus,
  updateJob,
} from "../../api/jobs";
import toast from "react-hot-toast";

const ManageJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] =
  useState("All");

  const [editingJob, setEditingJob] =
  useState<any>(null);

const [editForm, setEditForm] =
  useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    employmentType: "Full Time",
    deadline: "",
});
const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await getCompanyJobs();
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);

      loadJobs();

    } catch (error) {

      console.error(error);

      toast.error("Unable to delete job");

    }
  };

  const handleToggleStatus = async (
  id: string
) => {
  try {

    await toggleJobStatus(id);

    loadJobs();

  } catch (error) {

    console.error(error);

    toast.error("Unable to update job status");

  }
};

const handleEdit = (job: any) => {

  setEditingJob(job);

  setEditForm({
    title: job.title,
    description: job.description,
    location: job.location,
    salary: job.salary,
    employmentType: job.employmentType,
    deadline: job.deadline
      ? job.deadline.substring(0, 10)
      : "",
  });

};

const handleSave = async () => {

  try {

    await updateJob(
      editingJob._id,
      editForm
    );

    setEditingJob(null);

    loadJobs();

    toast.success("Job updated successfully");

  } catch (error) {

    console.error(error);

    toast.error("Unable to update job");

  }

};

  const filteredJobs = jobs.filter((job) => {

  const keyword = search.toLowerCase();

  const matchesSearch =

    job.title.toLowerCase().includes(keyword) ||

    job.location.toLowerCase().includes(keyword) ||

    job.employmentType
      .toLowerCase()
      .includes(keyword);

  const matchesStatus =

    statusFilter === "All"

      ? true

      : statusFilter === "Active"

      ? job.isActive

      : !job.isActive;

  return matchesSearch && matchesStatus;

});

  return (
    <DashboardLayout role="company">

      <div className="space-y-8">

        <div className="flex justify-between items-center">

         <h1 className="text-4xl font-bold">

    Manage Jobs

  </h1>

  <div className="flex gap-4">

    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="bg-slate-800 p-3 rounded-xl w-72"
    />

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
      className="bg-slate-800 rounded-xl px-4"
    >

      <option>All</option>

      <option>Active</option>

      <option>Closed</option>

    </select>

  </div>

</div>

<div className="grid md:grid-cols-4 gap-6">

  <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

    <h3 className="text-slate-400">
      Total Jobs
    </h3>

    <p className="text-4xl font-bold mt-2">
      {jobs.length}
    </p>

  </div>

  <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

    <h3 className="text-slate-400">
      Active Jobs
    </h3>

    <p className="text-4xl font-bold mt-2 text-green-400">

      {jobs.filter(j => j.isActive).length}

    </p>

  </div>

  <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

    <h3 className="text-slate-400">
      Closed Jobs
    </h3>

    <p className="text-4xl font-bold mt-2 text-red-400">

      {jobs.filter(j => !j.isActive).length}

    </p>

  </div>

  <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

    <h3 className="text-slate-400">
      Total Applicants
    </h3>

    <p className="text-4xl font-bold mt-2 text-indigo-400">

      {jobs.reduce(
  (sum, job) =>
    sum + (job.applicantCount || 0),
  0
)}

    </p>

  </div>

</div>

        {loading ? (

          <div className="text-center text-xl">

            Loading...

          </div>

        ) : (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

            <table className="w-full">

              <thead className="bg-slate-800">

                <tr>

                  <th className="p-4 text-left">
                    Job
                  </th>

                  <th className="p-4">
                    Type
                  </th>

                  <th className="p-4">
                    Location
                  </th>

                  <th className="p-4">
                    Deadline
                  </th>
                  
                  <th className="p-4">
  Applicants
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

                {filteredJobs.length === 0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="text-center p-8"
                    >

                      No Jobs Found

                    </td>

                  </tr>

                ) : (

                  filteredJobs.map((job) => (

                    <tr
                      key={job._id}
                      className="border-t border-slate-800 hover:bg-slate-800 transition"
                    >

                      <td className="p-4">

                        <div>

                          <p className="font-semibold">

                            {job.title}

                          </p>

                          <p className="text-sm text-slate-400">

                            {job.salary}

                          </p>

                        </div>

                      </td>

                      <td className="text-center">

                        {job.employmentType}

                      </td>

                      <td className="text-center">

                        {job.location}

                      </td>

                      <td className="text-center">

                        <span
  className={
    new Date(job.deadline) <
    new Date()

      ? "text-red-400"

      : "text-green-400"
  }
>

  {job.deadline
  ? new Date(job.deadline).toLocaleDateString()
  : "No Deadline"}

</span>

                      </td>

                      <td className="text-center">

  <span className="bg-slate-700 px-3 py-1 rounded-full">

    {job.applicantCount}

  </span>

</td>

                      <td className="text-center">

                        {job.isActive ? (

  <span className="bg-green-600 px-3 py-1 rounded-full text-sm">

    Active

  </span>

) : (

  <span className="bg-red-600 px-3 py-1 rounded-full text-sm">

    Closed

  </span>

)}

                      </td>

                      <td className="text-center space-x-2">

  <button
  onClick={() =>
    navigate(`/company/job/${job._id}/applicants`)
  }
  className="bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-500"
>
  Applicants
</button>

  <button
  onClick={() => handleEdit(job)}
  className="bg-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-500"
>
  Edit
</button>

  <button
    onClick={() => handleToggleStatus(job._id)}
    className="bg-yellow-600 px-3 py-1 rounded-lg hover:bg-yellow-500"
  >
    {job.isActive ? "Close" : "Open"}
  </button>

  <button
    onClick={() => handleDelete(job._id)}
    className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-500"
  >
    Delete
  </button>

</td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    {editingJob && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

<div className="bg-slate-900 rounded-2xl p-8 w-[650px] space-y-4">

<h2 className="text-2xl font-bold">

Edit Job

</h2>

<input
className="w-full p-3 bg-slate-800 rounded-lg"
value={editForm.title}
onChange={(e)=>
setEditForm({
...editForm,
title:e.target.value
})
}
/>

<textarea
rows={5}
className="w-full p-3 bg-slate-800 rounded-lg"
value={editForm.description}
onChange={(e)=>
setEditForm({
...editForm,
description:e.target.value
})
}
/>

<input
className="w-full p-3 bg-slate-800 rounded-lg"
value={editForm.location}
onChange={(e)=>
setEditForm({
...editForm,
location:e.target.value
})
}
/>

<input
className="w-full p-3 bg-slate-800 rounded-lg"
value={editForm.salary}
onChange={(e)=>
setEditForm({
...editForm,
salary:e.target.value
})
}
/>

<select
className="w-full p-3 bg-slate-800 rounded-lg"
value={editForm.employmentType}
onChange={(e)=>
setEditForm({
...editForm,
employmentType:e.target.value
})
}
>

<option>Full Time</option>

<option>Internship</option>

<option>Part Time</option>

</select>

<input
type="date"
className="w-full p-3 bg-slate-800 rounded-lg"
value={editForm.deadline}
onChange={(e)=>
setEditForm({
...editForm,
deadline:e.target.value
})
}
/>

<div className="flex justify-end gap-4">

<button
onClick={()=>
setEditingJob(null)
}
className="bg-slate-700 px-5 py-2 rounded-lg"
>

Cancel

</button>

<button
onClick={handleSave}
className="bg-indigo-600 px-5 py-2 rounded-lg"
>

Save Changes

</button>

</div>

</div>

</div>

)}

    </DashboardLayout>
  );
};

export default ManageJobs;