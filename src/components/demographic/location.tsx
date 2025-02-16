import { ILocationDemography } from "@/types/analytics";
import React, { useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function LocationGraphic({ data }: { data: ILocationDemography[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];

  const handleClick = useCallback(
    (entry: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div className="h-[300px] flex-1">
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
          <XAxis dataKey="city" tick={{ style: { fontSize: 12 } }} />
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis label={{
            value: 'Location',
            angle: -90,
            position: 'insideLeft',
            offset: 10,
            style: { fontSize: 18, fill: "#000", fontWeight: 500 }
          }} />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="total" onClick={handleClick}>
            {data.map((_, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
