import { getJobs } from "@/libs/jobs"
import { IJob } from "@/types/jobs"
import { useMemo } from "react"
import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { MdMoreHoriz } from "react-icons/md"
import TableSekeleton from "./tableSekeleton"
import Link from "next/link"
import { toastErrAxios } from "@/helpers/toast"
import axios from "@/helpers/axios"
import { toast } from "react-toastify"
import useSWR, { mutate } from "swr"
import EditJob from "./editJob"

interface IProps {
  sort: string
  search: string
}

export default function JobsTable({ sort, search }: IProps) {
  const { data: jobs = [], isLoading, isValidating } = useSWR<IJob[]>(`/jobs?${sort}&${search}`, getJobs, { revalidateOnFocus: false, revalidateIfStale: false, revalidateOnReconnect: false, revalidateOnMount: true });
  const skeletons = useMemo(() => Array.from({ length: 5 }), []);

  const handleDelete = async (jobId: string) => {
    try {
      const { data } = await axios.patch(`/jobs/delete/${jobId}`)
      mutate(`/jobs?${sort}&${search}`)
      mutate('/jobs/total')
      toast.success(data.message)
    } catch (err) {
      toastErrAxios(err)
    }
  }

  const handlePublish = async (jobId: string, isPublished: boolean) => {
    try {
      mutate(`/jobs?${sort}&${search}`, isPublished, false)
      const { data } = await axios.patch(`/jobs/publish/${jobId}`, { isPublished })
      mutate(`/jobs?${sort}&${search}`)
      toast.success(data.message)
    } catch (err) {
      toastErrAxios(err)
      mutate(`/jobs?${sort}&${search}`, !isPublished, false)
    }
  }

  if (isValidating || isLoading || jobs.length > 0) {
    return (
      <table className="w-full mt-10 text-left jobs_table">
        <thead>
          <tr>
            <th>Published</th>
            <th>Job</th>
            <th>Candidates</th>
            <th>Pre Selection Test</th>
            <th>Job Actions</th>
          </tr>
        </thead>
        <tbody>
          {isValidating || isLoading ? (
            skeletons.map((_, idx) => <TableSekeleton key={idx} />)
          ) : (
            jobs.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" onChange={() => handlePublish(item.id, !item.isPublished)} value={`${item.isPublished}`} className="sr-only peer" checked={item.isPublished} />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">{item.isPublished ? "published" : "unpublished"}</span>
                    </label>
                  </td>
                  <td>
                    <div className="font-medium border-b border-b-black w-fit">{item.title}</div>
                    <div>{item.category}</div>
                  </td>
                  <td>0</td>
                  <td>{String(item.isTestActive)}</td>
                  <td>
                    <div className="flex items-center gap-4">
                      {/* <button ><FaPencilAlt className="text-lightBlue" /></button> */}
                      <EditJob jobId={item.id}/>
                      <button onClick={() => handleDelete(item.id)}><FaTrash className="text-red-500" /></button>
                      <Link href={`/job/${item.id}`}><MdMoreHoriz className="text-xl" /></Link>
                    </div>
                  </td>
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
      <h1 className="font-medium text-2xl text-center">THERE IS NO JOB CREATED</h1>
    </div>
  )
}