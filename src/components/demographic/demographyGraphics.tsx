'use client'

import { getDemography } from "@/libs/graphics";
import { IDemography } from "@/types/analytics";
import dynamic from "next/dynamic";
import useSWR from "swr";

const GenderGraphic = dynamic(() => import("@/components/demographic/gender"), { ssr: false })
const AgeGraphic = dynamic(() => import("@/components/demographic/age"), { ssr: false })
const LocationGraphic = dynamic(() => import("@/components/demographic/location"), { ssr: false })

export default function demographyGraphics() {
  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const { data } = useSWR<IDemography>("/analytics/total-demographics", getDemography, opt)

  console.log(data)

  if (!data) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="flex flex-col gap-10 shadow-xl border px-4 my-4 rounded-md">
      <h1 className="text-xl font-medium mt-2 mb-10">DEMOGRAPHICS</h1>
      <div className="md:flex inline-flex flex-col md:flex-row">
        <GenderGraphic data={data.gender} />
        <AgeGraphic data={data.age} />
      </div>
      <LocationGraphic data={data.location} />
    </div>
  )
}