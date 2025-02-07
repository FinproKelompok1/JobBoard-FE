import { getJobs } from "@/libs/jobs"
import { IJob } from "@/types/jobs"
import { useContext, useMemo } from "react"
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
import Swal from "sweetalert2"

export default function JobsTable() {
  const context = useContext(QueryContext)
  if (!context) {
    throw new Error('There is no context')
  }
  const { sort, search } = context
  const { data: jobs = [], isLoading, isValidating } = useSWR<IJob[]>(`/jobs?${sort}&${search}`, getJobs, { revalidateOnFocus: false, revalidateIfStale: false, revalidateOnReconnect: false, revalidateOnMount: true });
  const skeletons = useMemo(() => Array.from({ length: 5 }), []);

  const handleDelete = async (jobId: string) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    if (!isConfirmed) return
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
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i'm sure"
    })
    if (!isConfirmed) return
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
      <table className="w-full mt-2text-left jobs_table">
        <thead>
          <tr>
            <th>PUBLISH</th>
            <th>JOB</th>
            <th>APPLICANTS</th>
            <th>PRE SELECTION TEST</th>
            <th>JOB ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {isValidating || isLoading ? (
            skeletons.map((_, idx) => <JobSekeleton key={idx} />)
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
                  <td><TotalApplicants jobId={item.id} /></td>
                  <td>{String(item.isTestActive)}</td>
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
    )
  }
  return (
    <div className="mt-10">
      <h1 className="font-medium text-2xl text-center">THERE IS NO JOB CREATED</h1>
    </div>
  )
}