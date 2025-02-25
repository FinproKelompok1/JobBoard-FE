import { getApplicants } from "@/libs/applicants";
import { IApplicants } from "@/types/applicants";
import { useMemo, useState } from "react";
import useSWR from "swr";
import ApplicantSekeleton from "./applicantSekeleton";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatRupiahTanpaDesimal } from "@/helpers/formatCurrency";
import { formatDate } from "@/helpers/dateFormatter";
import { eduFormatter } from "@/helpers/educationFormatter";
import SetStatusApplicant from "./setStatusApplicant";
import Link from "next/link";
import { FcProcess } from "react-icons/fc";
import SetSchedule from "./setSchedule";
import SetReviewRejection from "./setReviewRejection";
import { GoChecklist } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import Pagination from "../pagination";

interface IProps {
  search: string
  edu: string
  sort: string
  min_age: string
  max_age: string
  min_salary: string
  max_salary: string
}

interface ISWR {
  applicants: IApplicants[],
  totalPage: number,
  page: string
}

export default function ApplicantsTable({
  search,
  edu,
  sort,
  min_age,
  max_age,
  min_salary,
  max_salary
}: IProps) {
  const { jobId } = useParams()
  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const [page, setPage] = useState<string>('page=1')
  const {
    data,
    isLoading,
    isValidating
  } = useSWR<ISWR>(
    `/applicants/${jobId}?${sort}&${search}&${edu}&${min_age}&${max_age}&${min_salary}&${max_salary}&${page}`,
    getApplicants,
    opt
  );
  const skeletons = useMemo(() => Array.from({ length: 5 }), []);

  if (isValidating || isLoading || (data && data.applicants.length > 0)) {
    return (
      <>
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 p-4 bg-white">
          <table className="w-full border-collapse text-left min-w-[1200px]">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
                <th className="p-3">Applicant</th>
                <th className="p-3">Education</th>
                <th className="p-3">Apply On</th>
                <th className="p-3">Expected Salary</th>
                <th className="p-3">Status</th>
                <th className="p-3">Test Result</th>
                <th className="p-3">Resume</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {isValidating || isLoading ? (
                skeletons.map((_, idx) => <ApplicantSekeleton key={idx} />)
              ) : (
                data &&
                data.applicants.map((item, idx) => {
                  const props = { status: item.status, jobId, userId: item.userId };
                  const age = new Date().getFullYear() - new Date(item.user.dob).getFullYear();
                  return (
                    <tr
                      key={idx}
                      className="border-b hover:bg-gray-50 transition-colors text-gray-800"
                    >
                      <td className="p-3 flex items-center gap-2">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image src={item.user.avatar} alt={item.user.fullname} fill />
                        </div>
                        <div>
                          <div className="flex gap-2">
                            <p>{item.user.fullname}</p>
                            <span className="text-blueNavy font-medium">({age})</span>
                          </div>
                          <p className="text-sm text-gray-500">{item.user.email}</p>
                        </div>
                      </td>
                      <td className="p-3">{eduFormatter(item.user.lastEdu)}</td>
                      <td className="p-3">{formatDate(item.createdAt.split('T')[0])}</td>
                      <td className="p-3">{formatRupiahTanpaDesimal(item.expectedSalary)}</td>
                      <td className="p-3"><SetStatusApplicant {...props} /></td>
                      <td className="p-3 text-center">{item.selectionTestResult}</td>
                      <td className="p-3">
                        <Link
                          target="_blank"
                          href={item.resume}
                          className="px-3 py-1 font-medium text-white bg-pink/80 rounded-md hover:bg-pink transition"
                        >
                          Preview
                        </Link>
                      </td>
                      <td className="p-3 flex justify-center items-center gap-2">
                        {item.status === 'processed' ? (
                          <FcProcess className="text-xl" />
                        ) : item.status === 'accepted' ? (
                          <GoChecklist className="text-xl text-green-400" />
                        ) : item.status === 'interviewed' ? (
                          <SetSchedule userId={item.userId} jobId={jobId} />
                        ) : !item.rejectedReview ? (
                          <SetReviewRejection userId={item.userId} jobId={jobId} />
                        ) : (
                          <RxCrossCircled className="text-xl text-red-500" />
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <Pagination totalPage={data?.totalPage} currentPage={Number(data?.page)} setPage={setPage} />
      </>
    )
  }
  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="font-medium text-2xl">THERE IS NO APPLICANT</h1>
      <div className="relative w-[20rem] h-[20rem] opacity-60">
        <Image src={'/applicant-table-empty.svg'} alt="Table Empty" fill />
      </div>
    </div>
  )
}