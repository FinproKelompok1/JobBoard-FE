import { IGenderDemography } from "@/types/analytics";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from "recharts";

interface ICustomizedLabel {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  type: string
}

export default function GenderGraphic({ data }: { data: IGenderDemography[] }) {
  const COLORS = ["#0088FE", "#00C49F"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    type,
  }: ICustomizedLabel) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        <tspan x={x} dy="-0.5em">{`${type[0].toUpperCase()}${type.slice(1)}`}</tspan>
        <tspan x={x} dy="1.2em">{`${(percent * 100).toFixed(0)}%`}</tspan>
      </text>
    );
  };
  return (
    <ResponsiveContainer width='50%' height='100%'>
      <PieChart>
        <Tooltip
          formatter={(value) => [`${value} People`]}
          animationEasing="ease"
        />
        <text x="50%" y="10" textAnchor="middle" dominantBaseline="middle" fontSize={18} fill="#000" fontWeight={500}>
          Gender
        </text>
        <Pie
          data={data}
          cx={223}
          cy={150}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="total"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
