import { sweetAlertWarning } from "@/helpers/sweetAlert"
import axios from "@/helpers/axios"
import { mutate } from "swr"
import { toast } from "react-toastify"
import { toastErrAxios } from "@/helpers/toast"

interface IProps {
  jobId: string
  isJobPublished: boolean
}

export default function SetPublish({ jobId, isJobPublished }: IProps) {
  const handlePublish = async (isPublished: boolean) => {
    const { isConfirmed } = await sweetAlertWarning('', "Yes, i'm sure")
    if (!isConfirmed) return
    try {
      const { data } = await axios.patch(`/jobs/publish/${jobId}`, { isPublished })
      mutate((key: string) => key.startsWith(`/jobs`));
      toast.success(data.message)
    } catch (err) {
      toastErrAxios(err)
    }
  }
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" onChange={() => handlePublish(!isJobPublished)} value={`${isJobPublished}`} className="sr-only peer" checked={isJobPublished} />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blueNavy"></div>
      <span className="ml-3 text-sm font-medium text-gray-900">{isJobPublished ? "published" : "unpublished"}</span>
    </label>
  )
}