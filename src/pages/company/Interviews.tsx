import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getCompanyInterviews } from "../../api/company";
import { UPLOAD_URL } from "../../config/api";

const Interviews = () => {

  const [interviews, setInterviews] = useState<any[]>([]);

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {

      const res = await getCompanyInterviews();

      setInterviews(res.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <DashboardLayout role="company">

      <h1 className="text-4xl font-bold mb-8">
        Interviews
      </h1>

      <div className="space-y-5">

        {interviews.length === 0 ? (

          <div className="bg-slate-900 p-8 rounded-2xl text-center">

            No Interviews Scheduled

          </div>

        ) : (

          interviews.map((interview) => (

            <div
              key={interview._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex justify-between items-center"
            >

              <div className="flex items-center gap-4">

                <img
                  src={
                    interview.student.profileImage
                      ? `${UPLOAD_URL}/profile-images/${interview.student.profileImage}`
                      : "https://via.placeholder.com/70"
                  }
                  className="w-16 h-16 rounded-full object-cover"
                  alt=""
                />

                <div>

                  <h2 className="text-xl font-bold">
                    {interview.student.fullName}
                  </h2>

                  <p>{interview.job.title}</p>

                  <p className="text-slate-400">
                    {interview.interviewDate}
                  </p>

                  <p className="text-slate-500">
                    {interview.interviewTime}
                  </p>

                </div>

              </div>

              <a
                href={interview.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="bg-indigo-600 px-5 py-2 rounded-lg"
              >
                Join
              </a>

            </div>

          ))

        )}

      </div>

    </DashboardLayout>
  );
};

export default Interviews;