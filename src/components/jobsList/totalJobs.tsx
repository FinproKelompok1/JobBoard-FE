'use client'

import { getTotalJobs } from "@/libs/jobs"
import useSWR from "swr";

export default function TotalJobs() {
  const { data: total = 0 } = useSWR('/jobs/total', getTotalJobs, { revalidateOnFocus: false, revalidateIfStale: false, revalidateOnReconnect: false, revalidateOnMount: true });
  return (total)
}