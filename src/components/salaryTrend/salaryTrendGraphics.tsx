'use client'

import { getSalaryTrend } from "@/libs/graphics";
import { ISalaryTrend } from "@/types/analytics";
import useSWR from "swr";
import BarChartGraphic from "./barChartGraphic";
import { getToken } from "@/libs/token";
import Image from "next/image";

export default function SalaryTrendGraphics() {

  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const token = getToken()
  const fetcher = (url: string) => getSalaryTrend(url, token!);

  const { data } = useSWR<ISalaryTrend>("/analytics/salary-trends", fetcher, opt);

  if (!data) {
    return (
      <div className="text-center py-4 font-medium text-gray-600">Loading...</div>
    )
  }

  if (Object.entries(data)[0][1].length <= 0) {
    return (
      <div className="mt-10 flex flex-col items-center">
        <h1 className="font-medium text-2xl">THERE IS NO APPLICANT&apos;S REVIEW</h1>
        <div className="relative w-[20rem] h-[20rem] opacity-60">
          <Image src={'/salary-trend-empty.svg'} alt="Salary Trend Empty" fill />
        </div>
      </div>
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