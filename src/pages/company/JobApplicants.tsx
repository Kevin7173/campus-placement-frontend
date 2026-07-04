import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getApplicantsByJob,
  updateApplicationStatus,
} from "../../api/applications";
import toast from "react-hot-toast";
import { UPLOAD_URL } from "../../config/api";

const JobApplicants = () => {

  const { jobId } = useParams();

  const [applications, setApplications] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedApplication, setSelectedApplication] =
  useState<any>(null);

const [interviewForm, setInterviewForm] =
  useState({
    interviewDate: "",
    interviewTime: "",
    meetingLink: "",
    remarks: "",
  });

  useEffect(() => {
    loadApplicants();
  }, []);

  const loadApplicants = async () => {
    try {

      const res = await getApplicantsByJob(jobId!);

      setApplications(res.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const updateStatus = async (
  id: string,
  status: string
) => {

  try {

    await updateApplicationStatus(id, {
      status,
    });

    await loadApplicants();

    toast.success("Status Updated");

  } catch (error) {

    console.error(error);

    toast.error("Unable to update");

  }

};

const scheduleInterview = async () => {
  try {

    await updateApplicationStatus(
      selectedApplication._id,
      {
        status: "Interview Scheduled",
        ...interviewForm,
      }
    );

    

    setInterviewForm({
      interviewDate: "",
      interviewTime: "",
      meetingLink: "",
      remarks: "",
    });

    await loadApplicants();
    setSelectedApplication(null);

    toast.success("Interview Scheduled");

  } catch (error) {

    console.error(error);

    toast.error("Unable to schedule interview");

  }
};

  return (
    <DashboardLayout role="company">

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Job Applicants
        </h1>

        {loading ? (

          <h2>Loading...</h2>

        ) : (

          <div className="space-y-6">

            {applications.length === 0 ? (

              <div className="bg-slate-900 rounded-2xl p-8 text-center">

                No Applicants Yet

              </div>

            ) : (

              applications.map((application) => (

                <div
                  key={application._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex justify-between items-center"
                >

                  <div className="flex gap-5">

                    <img
                     src={
  application.student?.profileImage
    ? `${UPLOAD_URL}/profile-images/${application.student.profileImage}`
    : "https://via.placeholder.com/80"
}
                      className="w-20 h-20 rounded-full object-cover"
                      alt=""
                    />

                    <div>

                      <h2 className="text-xl font-bold">

                        {application.student.fullName}

                      </h2>

                      <p>

                        {application.student.email}

                      </p>

                      <p>

                        CGPA :
                        {" "}
                        {application.student.cgpa}

                      </p>

                      <p>

                        Department :
                        {" "}
                        {application.student.department}

                      </p>

                    </div>

<div className="mb-4">

<span
className={`px-3 py-1 rounded-full text-sm font-semibold
${
application.status==="Applied"

? "bg-blue-600"

: application.status==="Shortlisted"

? "bg-yellow-600"

: application.status==="Interview Scheduled"

? "bg-purple-600"

: application.status==="Selected"

? "bg-green-600"

: "bg-red-600"
}
`}
>

{application.status}

</span>

</div>

                  </div>

                  <div className="space-x-3">

                    <a
                      href={`${UPLOAD_URL}/resumes/${application.student.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 px-4 py-2 rounded-lg"
                    >

                      Download Resume

                    </a>

                    <button
  onClick={() =>
    updateStatus(
      application._id,
      "Shortlisted"
    )
  }
  className="bg-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-500"
>

  Shortlist

</button>

                    <button
  onClick={() => {
    setSelectedApplication(application);
  }}
  className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500"
>
  Interview
</button>

                    <button
  onClick={() =>
    updateStatus(
      application._id,
      "Selected"
    )
  }
  className="bg-green-700 px-4 py-2 rounded-lg hover:bg-green-600"
>

  Select

</button>

                   <button
  onClick={() =>
    updateStatus(
      application._id,
      "Rejected"
    )
  }
  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500"
>

  Reject

</button>

                  </div>

                </div>

              ))

            )}

          </div>

        )}

      </div>

{selectedApplication && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

<div className="bg-slate-900 rounded-2xl p-8 w-[600px] space-y-5">

<h2 className="text-2xl font-bold">

Schedule Interview

</h2>

<input
type="date"
className="w-full p-3 bg-slate-800 rounded-lg"
value={interviewForm.interviewDate}
onChange={(e)=>
setInterviewForm({
...interviewForm,
interviewDate:e.target.value
})
}
/>

<input
type="time"
className="w-full p-3 bg-slate-800 rounded-lg"
value={interviewForm.interviewTime}
onChange={(e)=>
setInterviewForm({
...interviewForm,
interviewTime:e.target.value
})
}
/>

<input
type="text"
placeholder="Google Meet / Zoom Link"
className="w-full p-3 bg-slate-800 rounded-lg"
value={interviewForm.meetingLink}
onChange={(e)=>
setInterviewForm({
...interviewForm,
meetingLink:e.target.value
})
}
/>

<textarea
rows={4}
placeholder="Remarks"
className="w-full p-3 bg-slate-800 rounded-lg"
value={interviewForm.remarks}
onChange={(e)=>
setInterviewForm({
...interviewForm,
remarks:e.target.value
})
}
/>

<div className="flex justify-end gap-4">

<button
onClick={()=>
setSelectedApplication(null)
}
className="bg-slate-700 px-5 py-2 rounded-lg"
>

Cancel

</button>

<button
onClick={scheduleInterview}
className="bg-indigo-600 px-5 py-2 rounded-lg"
>

Schedule

</button>

</div>

</div>

</div>

)}

    </DashboardLayout>
  );

};

export default JobApplicants;