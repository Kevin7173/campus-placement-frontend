import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartCardProps {
  title: string;
  data: any[];
}

const ChartCard = ({
  title,
  data,
}: ChartCardProps) => {

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-bold mb-6">
        {title}
      </h2>

      <ResponsiveContainer
        width="100%"
        height={280}
      >

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <Tooltip />

          <Bar dataKey="value" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default ChartCard;