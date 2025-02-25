import { eduFormatter } from "@/helpers/educationFormatter";
import { IEducationDemography } from "@/types/analytics";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ICustomizedLabel {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  education: string
}

export default function EducationGraphic({ data }: { data: IEducationDemography[] }) {
  const COLORS = ["#4CAF50", "#0088FE", "#FFBB28", "#A569BD", "#E44D26"];
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    education,
  }: ICustomizedLabel) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fontWeight="bold"
      >
        <tspan x={x} dy="-0.4em">
          {eduFormatter(education)}
        </tspan>
        <tspan x={x} dy="1.2em">
          {`${(percent * 100).toFixed(0)}%`}
        </tspan>
      </text>
    );
  };
  return (
    <div className="h-[300px] flex-1">
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Tooltip
            formatter={(value) => [`${value} People`]}
            animationEasing="ease"
          />
          <text x="50%" y="10" textAnchor="middle" dominantBaseline="middle" fontSize={18} fill="#000" fontWeight={500}>
            Education
          </text>
          <Pie
            data={data}
            cx='50%'
            cy={150}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius='85%'
            fill="#8884d8"
            dataKey="total"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
