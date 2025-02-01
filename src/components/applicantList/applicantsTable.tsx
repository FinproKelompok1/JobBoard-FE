'use client'

import { getApplicants } from "@/libs/applicants";
import { IApplicants } from "@/types/applicants";
import { useMemo } from "react";
import useSWR from "swr";
import ApplicantSekeleton from "./applicantSekeleton";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatRupiahTanpaDesimal } from "@/helpers/formatCurrency";

export default function ApplicantsTable() {
  const { jobId } = useParams()
  console.log(jobId)
  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const { data: applicants = [], isLoading, isValidating } = useSWR<IApplicants[]>(`/applicants/${jobId}`, getApplicants, opt);
  const skeletons = useMemo(() => Array.from({ length: 5 }), []);
  return (
    <table className="w-full mt-10 text-left applicants_table">
      <thead>
        <tr>
          <th>APPLICANT</th>
          <th>EDUCATION</th>
          <th>EMAIL</th>
          <th>EXPECTED SALARY</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        {isValidating || isLoading ? (
          skeletons.map((_, idx) => <ApplicantSekeleton key={idx} />)
        ) : (
          applicants.map((item, idx) => {
            const age = new Date().getFullYear() - new Date(item.user.dob).getFullYear()
            return (
              <tr key={idx}>
                <td>
                  <div className="flex items-center gap-2">
                    <Image src={item.user.avatar} alt={item.user.fullname} width={30} height={30} className="rounded-full"></Image>
                    <p>{item.user.fullname}</p>
                    <span>{age}</span>
                  </div>
                </td>
                <td>{item.user.lastEdu}</td>
                <td>{item.user.email}</td>
                <td>{formatRupiahTanpaDesimal(item.expectedSalary)}</td>
                <td>{item.status}</td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}