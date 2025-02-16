import { IApplicantsInterestCategory, IGenderDemography } from "@/types/analytics";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from "recharts";

interface ICustomizedLabel {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  category: string
}

export default function Category({ data }: { data: IApplicantsInterestCategory[] }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#E44D26", "#4CAF50", "#607D8B", "#795548",];
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    category,
  }: ICustomizedLabel) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.65; // Sedikit lebih dalam untuk visibilitas lebih baik
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
          {category[0].toUpperCase() + category.slice(1)}
        </tspan>
        <tspan x={x} dy="1.2em">
          {`${(percent * 100).toFixed(0)}%`}
        </tspan>
      </text>
    );
  };
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Tooltip
          formatter={(value) => [`${value} People`]}
          animationEasing="ease"
        />
        <text x="50%" y="10" textAnchor="middle" dominantBaseline="middle" fontSize={18} fill="#000" fontWeight={500}>
          Category
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
  );
}
