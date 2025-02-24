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
import { QueryContext } from "./jobsList"
import TotalApplicants from "./totalApplicants"
import { sweetAlertWarning } from "@/helpers/sweetAlert"
import Pagination from "../pagination"
import SetPublish from "./setPublish"
import SetPreTest from "./setPreTest"
import { getToken } from "@/libs/token"

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
        <div className="overflow-x-auto">

          <table className="w-full mt-2text-left jobs_table">
            <thead>
              <tr>
                <th>PUBLISH</th>
                <th>JOB</th>
                <th>APPLICANTS</th>
                <th>PRE SELECTION TEST</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isValidating || isLoading ? (
                skeletons.map((_, idx) => <JobSekeleton key={idx} />)
              ) : (
                data && data.jobs.map((item) => {
                  const isExpired = new Date() > new Date(item.endDate)
                  return (
                    <tr key={item.id}>
                      <td>
                        <SetPublish jobId={item.id} isJobPublished={item.isPublished} />
                      </td>
                      <td>
                        <div className="font-medium border-b border-b-black w-fit line-clamp-1">{item.title}</div>
                        <div>{item.category}</div>
                      </td>
                      <td><TotalApplicants jobId={item.id} /></td>
                      <td><SetPreTest jobId={item.id} isTestValue={item.isTestActive} /></td>
                      <td>{isExpired ? (
                        <span className="font-medium text-red-500">Expired</span>
                      ) : (
                        <span className="font-medium text-blue-500">Active</span>)
                      }</td>
                      <td>
                        <div className="flex items-center gap-4">
                          <EditJob job={item} />
                          <button onClick={() => handleDelete(item.id)}><FaTrash className="text-red-500" /></button>
                          <Link href={`/admin/job/${item.id}`}><MdMoreHoriz className="text-xl" /></Link>
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
      <h1 className="font-medium text-2xl text-center">THERE IS NO JOB CREATED</h1>
    </div>
  )
}