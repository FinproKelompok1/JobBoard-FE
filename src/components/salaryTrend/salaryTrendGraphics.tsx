'use client'

import { getSalaryTrend } from "@/libs/graphics";
import { ISalaryTrend } from "@/types/analytics";
import useSWR from "swr";
import JobRole from "./jobRole";
import JobLocation from "./jobLocation";

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
      <h1 className="text-xl font-medium mt-2 mb-2">SALARY TREND</h1>
      <div className="h-[300px]">
        <JobRole data={data.basedOnJobRole} />
      </div>
      <div className="h-[300px]">
        <JobLocation data={data.basedOnJobLocation} />
      </div>
    </div>
  )
}