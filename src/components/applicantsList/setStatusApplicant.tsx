import axios from "@/helpers/axios"
import { toastErrAxios } from "@/helpers/toast"
import React from "react"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { sweetAlertWarning } from "@/helpers/sweetAlert"

interface IProps {
  status: string
  userId: number
  jobId: string | string[]
}

export default function SetStatusApplicant({ userId, jobId, status }: IProps) {
  const handleSetStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const newStatus = e.target.value
      const { isConfirmed } = await sweetAlertWarning(`You set applicant status to become ${newStatus}`, "Confirm!")
      if (!isConfirmed) return
      const { data } = await axios.patch('/applicants', { userId, jobId, status: newStatus })
      toast.success(data.message)
      mutate((key: string) => key.startsWith(`/applicants/${jobId}`));
    } catch (err) {
      toastErrAxios(err)
    }
  }
  return (
    <select
      name="status"
      id="status"
      className="cursor-pointer outline-none"
      onChange={handleSetStatus}
      value={status}
    >
      <option value="processed">Processed</option>
      <option value="interviewed">Interviewed</option>
      <option value="accepted">Accepted</option>
      <option value="rejected">Rejected</option>
    </select>
  )
}