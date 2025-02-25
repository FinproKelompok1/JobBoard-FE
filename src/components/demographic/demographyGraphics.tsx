'use client'

import { getDemography } from "@/libs/graphics";
import { IDemography } from "@/types/analytics";
import useSWR from "swr";
import EducationGraphic from "./education";
import GenderGraphic from "@/components/demographic/gender";
import AgeGraphic from "@/components/demographic/age";
import LocationGraphic from "@/components/demographic/location";
import { getToken } from "@/libs/token";

export default function DemographyGraphics() {
  const options = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
  };

  const token = getToken();
  const fetcher = (url: string) => getDemography(url, token!);
  const { data } = useSWR<IDemography>("/analytics/total-demographics", fetcher, options);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 shadow-lg border border-gray-200 px-6 py-6 my-6 rounded-xl bg-white">
      <h1 className="text-2xl font-semibold text-gray-800 text-center">Applicants Demographics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GenderGraphic data={data.gender} />
        <AgeGraphic data={data.age} />
        <LocationGraphic data={data.location} />
        <EducationGraphic data={data.education} />
      </div>
    </div>
  );
}
