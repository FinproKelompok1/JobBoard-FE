import { IAgeDemography } from "@/types/analytics";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

export default function AgeGraphic({ data }: { data: IAgeDemography[] }) {
  return (
    <BarChart width={250} height={100} data={data} barSize={29}>
      <XAxis dataKey="age" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="total" fill="#8884d8" />
    </BarChart>
  );
}