import { ILocationDemography } from "@/types/analytics";
import React, { useState, useCallback } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";

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
    <div>
      <p>Click each rectangle </p>
      <BarChart width={730} height={250} data={data}>
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" onClick={handleClick}>
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
      <p className="content">{`Amount of "${activeItem.city}": ${activeItem.total}`}</p>
    </div>
  );
}
