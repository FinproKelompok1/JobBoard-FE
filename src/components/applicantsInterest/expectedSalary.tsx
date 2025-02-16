import { formatRupiahTanpaDesimal } from "@/helpers/formatCurrency";
import { IExptectedSalary } from "@/types/analytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from "recharts";

export default function ExpectedSalary({ data }: { data: IExptectedSalary[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(value) => formatRupiahTanpaDesimal(Number(value))}>
          <Label value="Average Expected Salary" position='insideBottom' fontSize={18} fill="#000" offset={-10} fontWeight='500' />
        </XAxis>
        <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => formatRupiahTanpaDesimal(Number(value))} cursor={{ fill: "transparent" }} />
        <Bar dataKey="avgsalary" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
