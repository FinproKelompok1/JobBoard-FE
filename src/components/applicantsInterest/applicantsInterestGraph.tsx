'use client'

import useSWR from "swr";
import Category from "./category";
import { IApplicantsInterest } from "@/types/analytics";
import { getApplicantsInterest } from "@/libs/graphics";
import ExpectedSalary from "./expectedSalary";
import { getToken } from "@/libs/token";
import Image from "next/image";

export default function ApplicantsInterestGraph() {
  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const token = getToken();
  const fetcher = (url: string) => getApplicantsInterest(url, token!);
  const { data } = useSWR<IApplicantsInterest>("/analytics/applicant-interest", fetcher, opt);

  if (!data) {
    console.log(data)
    return (
      <div className="text-center py-4 font-medium text-gray-600">Loading...</div>
    );
  }

  if (Object.entries(data)[0][1].length <= 0) {
    return (
      <div className="mt-10 flex flex-col items-center">
        <h1 className="font-medium text-2xl">THERE IS NO APPLICANT INTEREST GRAPHIC</h1>
        <div className="relative w-[20rem] h-[20rem] opacity-60">
          <Image src={'/applicant-interest-empty.svg'} alt="Applicant Interset Empty" fill />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10 shadow-lg border border-gray-200 pb-6 my-4 rounded-lg bg-white">
      <h1 className="text-xl font-semibold mt-4 mb-6 ml-4 text-gray-700">APPLICANTS INTEREST</h1>
      <div className="h-[300px] px-4">
        <Category data={data.basedOnJobCategory} />
      </div>
      <div className="h-[300px] px-4">
        <ExpectedSalary data={data.basedOnExpectedSalary} />
      </div>
    </div>
  );
}
