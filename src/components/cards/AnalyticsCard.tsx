interface AnalyticsCardProps {
  title: string;
  value: string;
  percentage: string;
}

const AnalyticsCard = ({
  title,
  value,
  percentage,
}: AnalyticsCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-indigo-500 transition">

      <h3 className="text-slate-400">
        {title}
      </h3>

      <div className="flex justify-between mt-4">

        <h2 className="text-3xl font-bold">
          {value}
        </h2>

        <span className="text-green-400">
          {percentage}
        </span>

      </div>

    </div>
  );
};

export default AnalyticsCard;