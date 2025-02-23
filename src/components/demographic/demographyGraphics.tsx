'use client'

import { getDemography } from "@/libs/graphics";
import { IDemography } from "@/types/analytics";
import useSWR from "swr";
import EducationGraphic from "./education";
import GenderGraphic from "@/components/demographic/gender";
import AgeGraphic from "@/components/demographic/age";
import LocationGraphic from "@/components/demographic/location";
import { getToken } from "@/libs/token";

export default function demographyGraphics() {
  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const token = getToken()
  const fetcher = (url: string) => getDemography(url, token!);
  const { data } = useSWR<IDemography>("/analytics/total-demographics", fetcher, opt)

  if (!data) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="flex flex-col gap-10 shadow-xl border px-4 my-4 rounded-md">
      <h1 className="text-xl font-medium mt-2 mb-10">APPLICANTS DEMOGRAPHICS</h1>
      <div className="md:flex inline-flex flex-col md:flex-row">
        <GenderGraphic data={data.gender} />
        <AgeGraphic data={data.age} />
      </div>
      <div className="md:flex inline-flex flex-col md:flex-row">
        <LocationGraphic data={data.location} />
        <EducationGraphic data={data.education} />
      </div>
    </div>
  )
}