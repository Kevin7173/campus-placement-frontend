import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
}

const StatCard = ({
  title,
  value,
  icon,
  color,
}: StatCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-indigo-500 transition-all duration-300 hover:scale-[1.02]">

      <div className={`${color} mb-4`}>
        {icon}
      </div>

      <h3 className="text-slate-400">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
};

export default StatCard;