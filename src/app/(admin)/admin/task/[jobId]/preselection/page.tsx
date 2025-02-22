import Task from "@/components/completingTask/task";
import { getPreselectionQuestions } from "@/libs/preselection";
import { IPreselectionQuestion } from "@/types/preselection";

export default async function TaskPage({ params }: { params: { jobId: string } }) {
  const data: IPreselectionQuestion[] = await getPreselectionQuestions(params.jobId)
  return (
    <main>
      <div className="max-w-[940px] mx-auto">
        <Task data={data}/>
      </div>
    </main>
  )
}