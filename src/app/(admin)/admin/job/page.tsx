import JobsListAdmin from "@/components/jobsList/jobsListAdmin";
import TotalJobs from "@/components/jobsList/totalJobs";

export default function JobPage() {
  return (
    <>
      <div className="max-w-[940px] p-4 mx-auto">
        <h1 className="text-2xl font-medium mb-4"><TotalJobs /> Jobs Created</h1>
        <JobsListAdmin />
      </div>
    </>
  )
}