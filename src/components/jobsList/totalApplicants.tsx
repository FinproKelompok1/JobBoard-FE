import { getTotalApplicants } from "@/libs/applicants"
import useSWR from "swr"

export default function TotalApplicants({ jobId }: { jobId: string }) {
  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const { data: total = 0 } = useSWR<number>(
    `/applicants/total/${jobId}`,
    getTotalApplicants,
    opt)
  return (total)
}