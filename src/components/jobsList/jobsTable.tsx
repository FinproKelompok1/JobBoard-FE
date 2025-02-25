import { getJobs } from "@/libs/jobs"
import { IJob } from "@/types/jobs"
import { useContext, useMemo, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { MdMoreHoriz } from "react-icons/md"
import JobSekeleton from "./jobSekeleton"
import Link from "next/link"
import { toastErrAxios } from "@/helpers/toast"
import axios from "@/helpers/axios"
import { toast } from "react-toastify"
import useSWR, { mutate } from "swr"
import EditJob from "./editJob"
import TotalApplicants from "./totalApplicants"
import { sweetAlertWarning } from "@/helpers/sweetAlert"
import Pagination from "../pagination"
import SetPublish from "./setPublish"
import SetPreTest from "./setPreTest"
import { getToken } from "@/libs/token"
import Image from "next/image"
import { QueryContext } from "./jobsListAdmin"

interface ISWR {
  jobs: IJob[],
  totalPage: number,
  page: string
}

export default function JobsTable() {
  const opt = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  }
  const context = useContext(QueryContext)
  if (!context) {
    throw new Error('There is no context')
  }
  const { sort, search } = context
  const [page, setPage] = useState<string>('page=1')
  const token = getToken()
  const fetcher = (url: string) => getJobs(url, token!);
  const {
    data,
    isLoading,
    isValidating
  } = useSWR<ISWR>(`/jobs?${sort}&${search}&${page}`, fetcher, opt);
  const skeletons = useMemo(() => Array.from({ length: 5 }), []);

  const handleDelete = async (jobId: string) => {
    const { isConfirmed } = await sweetAlertWarning("You won't be able to revert this!", "Yes, delete it!")
    if (!isConfirmed) return
    try {
      const { data } = await axios.patch(`/jobs/delete/${jobId}`)
      mutate((key: string) => key.startsWith(`/jobs`));
      toast.success(data.message)
    } catch (err) {
      toastErrAxios(err)
    }
  }

  if (isValidating || isLoading || (data && data.jobs.length > 0)) {
    return (
      <>
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 p-4 bg-white">
          <table className="w-full border-collapse text-left min-w-[600px]">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
                <th className="p-3">Publish</th>
                <th className="p-3">Job</th>
                <th className="p-3">Applicants</th>
                <th className="p-3">Pre Test</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isValidating || isLoading ? (
                skeletons.map((_, idx) => <JobSekeleton key={idx} />)
              ) : (
                data &&
                data.jobs.map((item) => {
                  const isExpired = new Date() > new Date(item.endDate);
                  return (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition-colors text-gray-800"
                    >
                      <td className="p-3">
                        <SetPublish jobId={item.id} isJobPublished={item.isPublished} />
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-gray-900 truncate w-40">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.category}</div>
                      </td>
                      <td className="p-3">
                        <TotalApplicants jobId={item.id} />
                      </td>
                      <td className="p-3">
                        <SetPreTest jobId={item.id} isTestValue={item.isTestActive} />
                      </td>
                      <td className="p-3">
                        {isExpired ? (
                          <span className="text-red-500 font-medium">Expired</span>
                        ) : (
                          <span className="text-blue-500 font-medium">Active</span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <EditJob job={item} />
                          <button onClick={() => handleDelete(item.id)}>
                            <FaTrash className="text-red-500 hover:text-red-700 transition-colors" />
                          </button>
                          <Link href={`/admin/job/${item.id}`}>
                            <MdMoreHoriz className="text-xl text-gray-600 hover:text-gray-900 transition-colors" />
                          </Link>
                        </div>
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
      <h1 className="font-medium text-2xl">THERE IS NO JOB CREATED</h1>
      <div className="relative w-[20rem] h-[20rem] opacity-60">
        <Image src={'/job-table-empty.svg'} alt="Table Empty" fill />
      </div>
    </div>
  )
}