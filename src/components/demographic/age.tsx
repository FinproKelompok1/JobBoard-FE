import { IAgeDemography } from "@/types/analytics";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export default function AgeGraphic({ data }: { data: IAgeDemography[] }) {

  return (
    <div className="h-[300px] flex-1">
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data} barSize={29}>
          <XAxis dataKey="age" tick={{ style: { fontSize: 12 } }} />
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis label={{
            value: 'Age',
            angle: -90,
            position: 'insideLeft',
            offset: 10,
            style: { fontSize: 18, fill: "#000", fontWeight: 500 }
          }} />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}