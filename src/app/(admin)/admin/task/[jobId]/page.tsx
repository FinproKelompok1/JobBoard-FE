import { getPreselection } from "@/libs/preselection"
import { IPreselection } from "@/types/preselection"
import Link from "next/link"

export default async function PreselectionPage({ params }: { params: { jobId: string } }) {
  const data: IPreselection = await getPreselection(params.jobId)

  return (
    <main>
      <div className="max-w-[940px] mx-auto">
        <div className="border shadow-md flex flex-col gap-2 p-4">
          <h1 className="text-2xl font-medium">PRESELECTION TEST</h1>
          <p><span className="font-medium">Title :</span> {data.title}</p>
          <p><span className="font-medium">Description :</span> {data.description}</p>
          <Link
            className="bg-pink font-medium text-white py-2 px-4 w-fit"
            href={`/admin/task/${params.jobId}/preselection`}
          >START TEST
          </Link>
          <p className="text-blue-500 text-xs ml-2"><sup>*</sup>This test is required to continue the appliement</p>
        </div>
      </div>
    </main>
  )
}