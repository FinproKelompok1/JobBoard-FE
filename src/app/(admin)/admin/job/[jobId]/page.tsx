import ApplicantsTable from "@/components/applicantList/applicantsTable";
import { formatDate } from "@/helpers/dateFormatter";
import { formatRupiahTanpaDesimal } from "@/helpers/formatCurrency";
import { getJobDetail } from "@/libs/jobs";
import { IJob } from "@/types/jobs";
import Image from "next/image";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

export default async function JobDetailPage({ params }: { params: { jobId: string } }) {
  const jobDetail: IJob = await getJobDetail(params.jobId)
  return (
    <main>
      <div className="max-w-[940px] mx-auto pb-20">
        {jobDetail.banner && (
          <div className="relative xl:rounded-xl overflow-hidden aspect-[16/9] min-h-[15rem] xl:w-[70%] flex-1">
            <Image src={jobDetail.banner} alt={jobDetail.title} fill />
          </div>
        )}
        <div className="flex py-4 md:flex-row flex-col px-4 tablet:px-0 gap-8">
          <div className="flex-1">
            <div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold border-b border-black w-fit">{jobDetail.title} ({jobDetail.category})</h1>
                <h1 className="text-sm font-medium text-black/50">{jobDetail.role}</h1>
                <div className="flex items-center gap-2"><span className="text-blueNavy"><FaMoneyBillWave /></span><span>{formatRupiahTanpaDesimal(jobDetail.salary)}</span></div>
                <div className="flex items-center gap-2"><span className="text-blueNavy"><SlCalender /></span><span>{formatDate(jobDetail.endDate)}</span></div>
                <div className="flex items-center gap-2"><span className="text-blueNavy"><FaLocationDot /></span><span>{jobDetail.location.city}, {jobDetail.location.province}</span></div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {jobDetail.tags.map((item) => {
                return (
                  <div key={item} className="py-1 px-3 bg-pink text-xs rounded-xl text-blueNavy font-medium">{item}</div>
                )
              })}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: jobDetail.description }} className="description flex-1" />
        </div>
        <div className="overflow-x-auto">
          <h1 className="text-2xl font-medium px-4 tablet:px-0">Applicants List</h1>
          <ApplicantsTable />
        </div>
      </div>
    </main>
  )
}