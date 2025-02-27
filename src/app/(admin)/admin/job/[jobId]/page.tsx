import ApplicantsList from "@/components/applicantsList/applicantsList";
import GoBack from "@/components/applicantsList/goBack";
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
    <>
      <div className="max-w-[940px] mx-auto pb-20 mt-4 px-6 lg:px-0">
        <GoBack />
        {jobDetail.banner && (
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] min-h-[15rem] border shadow-md">
            <Image src={jobDetail.banner} alt={jobDetail.title} fill className="object-cover" />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-semibold text-gray-900 border-b border-gray-300 pb-2">
              {jobDetail.title} <span className="text-gray-500">({jobDetail.category})</span>
            </h1>
            <h2 className="text-lg font-medium text-gray-600">{jobDetail.role}</h2>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <FaMoneyBillWave className="text-green-500" />
                <span>{formatRupiahTanpaDesimal(jobDetail.salary)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <SlCalender className="text-blue-500" />
                <span>{formatDate(jobDetail.endDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaLocationDot className="text-red-500" />
                <span>{jobDetail.location.city}, {jobDetail.location.province}</span>
              </div>
              <div>
                <span
                  className={`${jobDetail.isTestActive ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'} rounded-full py-1 px-3 text-xs`}
                >
                  Preselection test {jobDetail.isTestActive ? 'active' : 'unactive'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {jobDetail.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-100 text-blueNavy text-sm rounded-lg font-medium shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="description flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl text-center font-semibold text-gray-900 mb-3">Job Description</h2>
            <div dangerouslySetInnerHTML={{ __html: jobDetail.description }} className="text-gray-700 text-sm leading-relaxed" />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Applicants List</h2>
          <ApplicantsList />
        </div>
      </div>
    </>
  )
}