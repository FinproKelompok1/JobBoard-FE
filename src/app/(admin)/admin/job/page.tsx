import JobsTable from "@/components/jobsTable/jobsTable";
import Link from "next/link";

export default function JobPage() {
  return (
    <main>
      <div className="max-w-[940px] p-4 mx-auto">
        <h1 className="text-2xl font-medium mb-4">0 Jobs Created</h1>
        <div className="flex justify-between">
          <input placeholder="Search job title" type="text" className="border-2 px-2 w-[25rem] focus:border-blueNavy hover:border-blueNavy outline-none transition duration-200" />
          <Link href={'/admin/create-job'} className="text-white bg-pink py-2 px-4 font-medium hover:bg-pink/85">Create a job</Link>
        </div>
        <div>
          <JobsTable />
        </div>
      </div>
    </main>
  )
}