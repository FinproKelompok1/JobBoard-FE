import { IPreselection } from "@/types/preselection"
import { useRouter } from "next/navigation"

interface IProps {
  data: IPreselection
  jobId: string
  isSubmitted: boolean
}

export default function Preselection({ data, jobId, isSubmitted }: IProps) {
  const router = useRouter()
  return (
    <div className="mt-10 rounded-xl shadow-lg border flex flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold text-blueNavy">PRESELECTION TEST</h1>
      <p><span className="font-medium">Title :</span> {data.title}</p>
      <p><span className="font-medium">Description :</span> {data.description}</p>
      <button
        className={`${isSubmitted && "hover:bg-pink/80"} disabled:bg-pink/80 disabled:cursor-not-allowed bg-pink font-medium text-white py-2 px-4 w-fit rounded-lg`}
        onClick={() => router.push(`/apply-job/${jobId}/preselection`)}
        disabled={!isSubmitted}
      >START TEST
      </button>
      <p className="text-blue-500 text-xs ml-2"><sup>*</sup>This test is required to continue the appliement after you submitted your cv</p>
    </div>
  )
}