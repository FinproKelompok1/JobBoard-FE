'use client'

import { getSalaryTrend } from "@/libs/graphics";
import { ISalaryTrend } from "@/types/analytics";
import useSWR from "swr";
import BarChartGraphic from "./barChartGraphic";

export default function SalaryTrendGraphics() {

  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const { data } = useSWR<ISalaryTrend>("/analytics/salary-trends", getSalaryTrend, opt)

  console.log(data)

  if (!data) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="flex flex-col gap-10 shadow-xl border px-4 pb-4 my-4 rounded-md">
      <h1 className="text-xl font-medium mt-2 mb-2">SALARY TREND EMPLOYEE</h1>
      <div className="h-[300px]">
        <BarChartGraphic data={data.basedOnJobRole} xlabel="By Role" xDataKey="role" barDataKey="avgsalary" />
      </div>
      <div className="h-[300px]">
        <BarChartGraphic data={data.basedOnJobLocation} xlabel="By Location" xDataKey="city" barDataKey="avgsalary" />
      </div>
    </div>
  )
}