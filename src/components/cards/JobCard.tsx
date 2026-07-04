interface JobCardProps {
  company: string;
  role: string;
}

const JobCard = ({
  company,
  role,
}: JobCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-md p-5 rounded-xl border border-slate-700 hover:border-indigo-500 transition">

      <h3 className="text-xl font-bold">
        {company}
      </h3>

      <p className="text-slate-400 mt-2">
        {role}
      </p>

      <button className="mt-4 bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500 transition">
        Apply Now
      </button>

    </div>
  );
};

export default JobCard;