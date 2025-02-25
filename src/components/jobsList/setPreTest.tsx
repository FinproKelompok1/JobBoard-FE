import { sweetAlertWarning } from "@/helpers/sweetAlert"
import axios from "@/helpers/axios"
import { mutate } from "swr"
import { toastErrAxios } from "@/helpers/toast"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

interface IProps {
  jobId: string
  isTestValue: boolean
}

export default function SetPreTest({ jobId, isTestValue }: IProps) {
  const router = useRouter()
  const handleStatusTest = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isTestActive = Boolean(Number(e.target.value))
    if (isTestActive) {
      const { isConfirmed } = await sweetAlertWarning('If there is no test created yet, you have to create if first', "Yes, confirm")
      if (!isConfirmed) return
    } else {
      const { isConfirmed } = await sweetAlertWarning('You will deactivate the test and applicant will not do tha task', "Yes, confirm")
      if (!isConfirmed) return
    }
    try {
      const { data } = await axios.patch(`/preselection/active/${jobId}`, { isTestActive })
      if (!data.isThereTest && isTestActive) router.push(`/admin/preselection/${jobId}`)
      if (data.message) {
        mutate((key: string) => key.startsWith(`/jobs`));
        toast.success(data.message)
      }
    } catch (err) {
      toastErrAxios(err)
    }
  }
  return (
    <select
      name="status"
      id="status"
      className={`cursor-pointer outline-none px-2 py-1 font-medium rounded text-white appearance-none transition-all duration-300 ${isTestValue === Boolean(1) ? "bg-green-500" : "bg-red-500"
        }`}
      onChange={handleStatusTest}
      value={isTestValue ? 1 : 0}
    >
      <option value={1} >Active</option>
      <option value={0} >Unactive</option>
    </select>
  )
}