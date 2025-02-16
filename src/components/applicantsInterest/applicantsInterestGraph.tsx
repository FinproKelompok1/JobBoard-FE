'use client'

import useSWR from "swr";
import Category from "./category";
import { IApplicantsInterest } from "@/types/analytics";
import { getApplicantsInterest } from "@/libs/graphics";

export default function ApplicantsInterestGraph() {
  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const { data } = useSWR<IApplicantsInterest>("/analytics/applicant-interest", getApplicantsInterest, opt)

  console.log(data)

  if (!data) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className="flex flex-col gap-10 shadow-xl border px-4 my-4 rounded-md">
      <h1 className="text-xl font-medium mt-2 mb-10">APPLICANTS INTEREST</h1>
      <div className="h-[300px]">
        <Category data={data.basedOnJobCategory} />
      </div>
    </div>
  )
}