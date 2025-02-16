import { formatRupiahTanpaDesimal } from "@/helpers/formatCurrency";
import { IJobLocation, IJobRole } from "@/types/analytics";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface ICustomYAxisTickProps {
  x: number
  y: number
  payload: { value: number }
}

interface IProps {
  data: IJobRole[] | IJobLocation[]
  xlabel: string
  xDataKey: string
  barDataKey: string
}

export default function BarChartGraphic({ data, xlabel, xDataKey, barDataKey }: IProps) {

  const CustomYAxisTick = (props: ICustomYAxisTickProps) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={4}
          textAnchor="end"
          transform="rotate(-45)"
          fontSize={12}
          fill="#000"
        >
          {formatRupiahTanpaDesimal(payload.value)}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart data={data} margin={{ bottom: 20 }}>
        <XAxis dataKey={xDataKey} tick={{ style: { fontSize: 12 } }}>
          <Label value={xlabel} position='insideBottom' fontSize={18} fill="#000" offset={-10} fontWeight='500' />
        </XAxis>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis tick={(props) => <CustomYAxisTick {...props} />} />
        <Tooltip formatter={(value) => formatRupiahTanpaDesimal(Number(value))} cursor={{ fill: "transparent" }} />
        <Bar dataKey={barDataKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}