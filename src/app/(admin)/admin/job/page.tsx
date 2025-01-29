import JobsList from "@/components/jobsList/jobList";
import TotalJobs from "@/components/jobsList/totalJobs";

export default function JobPage() {
  return (
    <main>
      <div className="max-w-[940px] p-4 mx-auto">
        <h1 className="text-2xl font-medium mb-4"><TotalJobs /> Jobs Created</h1>
        <JobsList />
      </div>
    </main>
  )
}