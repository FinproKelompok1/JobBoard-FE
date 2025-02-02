import ApplicantsTable from "@/components/applicantList/applicantsTable";

export default function JobDetailPage() {
  return (
    <main>
      <div className="max-w-[940px] mx-auto">
        <h1>APPLICANT LIST</h1>
        <div className="overflow-x-auto">
          <ApplicantsTable />
        </div>
      </div>
    </main>
  )
}