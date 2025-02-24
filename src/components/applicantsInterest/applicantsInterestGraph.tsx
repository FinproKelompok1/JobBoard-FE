'use client'

import useSWR from "swr";
import Category from "./category";
import { IApplicantsInterest } from "@/types/analytics";
import { getApplicantsInterest } from "@/libs/graphics";
import ExpectedSalary from "./expectedSalary";
import { getToken } from "@/libs/token";

export default function ApplicantsInterestGraph() {
  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const token = getToken()
  const fetcher = (url: string) => getApplicantsInterest(url, token!);
  const { data } = useSWR<IApplicantsInterest>("/analytics/applicant-interest", fetcher, opt)

  if (!data) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className="flex flex-col gap-10 shadow-xl border pb-6 my-4 rounded-md">
      <h1 className="text-xl font-medium mt-2 mb-10 ml-4">APPLICANTS INTEREST</h1>
      <div className="h-[300px]">
        <Category data={data.basedOnJobCategory} />
      </div>
      <div className="h-[300px]">
        <ExpectedSalary data={data.basedOnExpectedSalary} />
      </div>
    </div>
  )
}