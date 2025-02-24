'use client'

import { getTotalJobs } from "@/libs/jobs"
import { getToken } from "@/libs/token";
import useSWR from "swr";

export default function TotalJobs() {
  const token = getToken()
  const fetcher = (url: string) => getTotalJobs(url, token!);
  const { data: total = 0 } = useSWR('/jobs/total', fetcher, { revalidateOnFocus: false, revalidateIfStale: false, revalidateOnReconnect: false, revalidateOnMount: true });
  return (total)
}