'use client'

import { getDemography } from "@/libs/graphics";
import { IDemography } from "@/types/analytics";
import dynamic from "next/dynamic";
import useSWR from "swr";

const GenderGraphic = dynamic(() => import("@/components/demographic/gender"), { ssr: false })
const AgeGraphic = dynamic(() => import("@/components/demographic/age"), { ssr: false })
const LocationGraphic = dynamic(() => import("@/components/demographic/location"), { ssr: false })

export default function Graphics() {
  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const { data } = useSWR<IDemography>("/analytics/total-demographics", getDemography, opt)

  if (!data) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <GenderGraphic data={data.gender} />
        <AgeGraphic data={data.age} />
      </div>
      <LocationGraphic data={data.location} />
    </div>
  )
}