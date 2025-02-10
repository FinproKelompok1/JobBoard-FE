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
        <div className="overflow-x-auto">

          <table className="w-[1200px] mt-4 text-left applicants_table overflow-x-scroll">
            <thead>
              <tr>
                <th>APPLICANT</th>
                <th>EDUCATION</th>
                <th>APPLY ON</th>
                <th>EXPECTED SALARY</th>
                <th>STATUS</th>
                <th>RESUME</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {isValidating || isLoading ? (
                skeletons.map((_, idx) => <ApplicantSekeleton key={idx} />)
              ) : (
                data && data.applicants.map((item, idx) => {
                  const props = { status: item.status, jobId, userId: item.userId }
                  const age = new Date().getFullYear() - new Date(item.user.dob).getFullYear()
                  return (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center gap-2">
                          <Image src={item.user.avatar} alt={item.user.fullname} width={40} height={40} className="rounded-full"></Image>
                          <div className="flex flex-col">
                            <div className="flex gap-2">
                              <p>{item.user.fullname}</p>
                              <span className="text-blueNavy font-medium">{age}</span>
                            </div>
                            <p className="text-sm font-medium text-black/50">{item.user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>{eduFormatter(item.user.lastEdu)}</td>
                      <td>{formatDate(item.createdAt.split('T')[0])}</td>
                      <td>{formatRupiahTanpaDesimal(item.expectedSalary)}</td>
                      <td><SetStatusApplicant {...props} /></td>
                      <td><Link href={item.resume} className="px-2 py-1 font-medium text-white bg-pink">Preview</Link></td>
                      <td>
                        <div className="flex items-center justify-center">
                          {item.status === 'processed' ?
                            (<FcProcess className="text-xl text-black" />) : item.status === 'accepted' ?
                              (<GoChecklist className="text-xl text-green-400" />) : item.status === 'interviewed' ?
                                (<SetSchedule userId={item.userId} jobId={jobId} />) : !item.rejectedReview ?
                                  (<SetReviewRejection userId={item.userId} jobId={jobId} />) : <RxCrossCircled className="text-xl text-red-500" />
                          }
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        <Pagination totalPage={data?.totalPage} setPage={setPage} />
      </>
    )
  }
  return (
    <div className="mt-10">
      <h1 className="font-medium text-2xl text-center">THERE IS NO APPLICANT</h1>
    </div>
  )
}