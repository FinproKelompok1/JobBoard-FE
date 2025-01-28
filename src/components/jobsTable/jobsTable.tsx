'use client'

import { getJobs } from "@/libs/jobs"
import { IJob } from "@/types/jobs"
import { useEffect, useState } from "react"
import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { MdMoreHoriz } from "react-icons/md"
import TableSekeleton from "./tableSekeleton"

export default function JobsTable() {
  const [jobs, setJobs] = useState<IJob[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      const data = await getJobs()
      setJobs(data)
      setIsLoading(false)
    }
    getData()
  }, [])
  return (
    <>
      <table className="border w-full mt-10 text-left jobs_table">
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
            Array.from({ length: 5 }).map(() => <TableSekeleton />)
          ) : (
            jobs.length > 0 && jobs.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{String(item.isPublished)}</td>
                  <td>
                    <div className="font-medium border-b border-b-black w-fit">{item.title}</div>
                    <div>{item.category}</div>
                  </td>
                  <td>0</td>
                  <td>{String(item.isTestActive)}</td>
                  <td>
                    <div className="flex items-center gap-4">
                      <button><FaPencilAlt className="text-lightBlue" /></button>
                      <button><FaTrash className="text-red-500" /></button>
                      <button><MdMoreHoriz className="text-xl" /></button>
                    </div>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </>
  )
}