import { getApplicants } from "@/libs/applicants";
import { IApplicants } from "@/types/applicants";
import { useMemo } from "react";
import useSWR from "swr";
import ApplicantSekeleton from "./applicantSekeleton";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatRupiahTanpaDesimal } from "@/helpers/formatCurrency";
import { formatDate } from "@/helpers/dateFormatter";
import { eduFormatter } from "@/helpers/educationFormatter";
import SetStatusApplicant from "./setStatusApplicant";
// import PreviewPdf from "./previewPdf";
import Link from "next/link";

interface IProps {
  search: string
  edu: string
  sort: string
  min_age: string
  max_age: string
  min_salary: string
  max_salary: string
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
  const {
    data: applicants = [],
    isLoading,
    isValidating
  } = useSWR<IApplicants[]>(
    `/applicants/${jobId}?${sort}&${search}&${edu}&${min_age}&${max_age}&${min_salary}&${max_salary}`,
    getApplicants,
    opt
  );
  const skeletons = useMemo(() => Array.from({ length: 5 }), []);

  if (isValidating || isLoading || applicants.length > 0) {
    return (
      <table className="w-[1000px] mt-4 text-left applicants_table overflow-x-scroll">
        <thead>
          <tr>
            <th>APPLICANT</th>
            <th>EDUCATION</th>
            <th>APPLY ON</th>
            <th>EXPECTED SALARY</th>
            <th>STATUS</th>
            <th>RESUME</th>
          </tr>
        </thead>
        <tbody>
          {isValidating || isLoading ? (
            skeletons.map((_, idx) => <ApplicantSekeleton key={idx} />)
          ) : (
            applicants.map((item, idx) => {
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
                  {/* <td><PreviewPdf resume={item.resume} /></td> */}
                  <td><Link href={item.resume} className="px-2 py-1 font-medium text-white bg-pink">Preview</Link></td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    )
  }
  return (
    <div className="mt-10">
      <h1 className="font-medium text-2xl text-center">THERE IS NO APPLICANT</h1>
    </div>
  )
}