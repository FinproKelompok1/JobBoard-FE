import { useContext } from "react"
import { QueryContext } from "./jobsList"
import { sweetAlertWarning } from "@/helpers/sweetAlert"
import axios from "@/helpers/axios"
import { mutate } from "swr"
import { toastErrAxios } from "@/helpers/toast"
import { toast } from "react-toastify"
import { IJob } from "@/types/jobs"

export default function SetPreTest({ item }: { item: IJob }) {
  const context = useContext(QueryContext)
  if (!context) {
    throw new Error('There is no context')
  }
  const { sort, search } = context

  const handleStatusTest = async (jobId: string, isTestActive: boolean) => {
    const { isConfirmed } = await sweetAlertWarning('If there is no test created yet, you have to create if first', "Yes, confirm")
    if (!isConfirmed) return
    try {
      const { data } = await axios.patch(`/preselection/active/${jobId}`, { isTestActive })
      mutate((key: string) => key.startsWith(`/jobs`));
      toast.success(data.message)
    } catch (err) {
      toastErrAxios(err)
    }
  }
  return (
    <select
      name="status"
      id="status"
      className="cursor-pointer outline-none"
      onChange={(e) => handleStatusTest(item.id, !Boolean(e.target.value))}
      value={item.isTestActive ? 1 : 0}
    >
      <option value={1}>Active</option>
      <option value={0}>Unactive</option>
    </select>
  )
}