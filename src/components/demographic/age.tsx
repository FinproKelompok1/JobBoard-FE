import { IAgeDemography } from "@/types/analytics";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AgeGraphic({ data }: { data: IAgeDemography[] }) {

  return (
    <ResponsiveContainer width='50%' height='100%'>
      <BarChart width={500} height={250} data={data} barSize={29}>
        <XAxis dataKey="age" />
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis label={{ 
          value: 'Age', 
          angle: -90, 
          position: 'insideLeft', 
          offset: 10,
          style: { fontSize: 18, fill: "#000", fontWeight: 500 } 
        }} />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}