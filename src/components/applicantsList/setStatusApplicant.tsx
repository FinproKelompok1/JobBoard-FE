import axios from "@/helpers/axios"
import { toastErrAxios } from "@/helpers/toast"
import UseOpen from "@/hooks/useOpen"
import React, { useEffect } from "react"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { mutate } from "swr"
import SetSchedule from "./setSchedule"

interface IProps {
  status: string
  userId: number
  jobId: string | string[]
}

export default function SetStatusApplicant({ userId, jobId, status }: IProps) {
  const handleSetStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const newStatus = e.target.value
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: `You set applicant status to become ${newStatus}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm!"
      })
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