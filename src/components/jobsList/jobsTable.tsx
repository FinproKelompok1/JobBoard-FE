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

interface IProps {
  sort: string
  search: string
}

export default function JobsTable({ sort, search }: IProps) {
  const { data: jobs = [], isLoading } = useSWR<IJob[]>(`/jobs?${sort}&${search}`, getJobs);
  const skeletons = useMemo(() => Array.from({ length: 5 }), []);

  const handleDelete = async (jobId: string) => {
    try {
      const { data } = await axios.patch(`/jobs/${jobId}`)
      mutate(`/jobs?${sort}&${search}`)
      mutate('/jobs/total')
      toast.success(data.message)
    } catch (err) {
      toastErrAxios(err)
    }
  }

  if (isLoading || jobs.length > 0) {
    return (
      <table className="w-full mt-10 text-left jobs_table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Job</th>
            <th>Candidates</th>
            <th>PreSelectionTest</th>
            <th>Job Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            skeletons.map((_, idx) => <TableSekeleton key={idx} />)
          ) : (
            jobs.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{String(item.isPublished)}</td>
                  <td>
                    <div className="font-medium border-b border-b-black w-fit">{item.title}</div>
                    <div>{item.category}</div>
                  </td>
                  <td>0</td>
                  <td>{String(item.isTestActive)}</td>
                  <td>
                    <div className="flex items-center gap-4">
                      <Link href={'/'}><FaPencilAlt className="text-lightBlue" /></Link>
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