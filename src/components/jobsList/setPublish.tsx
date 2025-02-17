import { useContext } from "react"
import { QueryContext } from "./jobsList"
import { sweetAlertWarning } from "@/helpers/sweetAlert"
import axios from "@/helpers/axios"
import { mutate } from "swr"
import { toast } from "react-toastify"
import { toastErrAxios } from "@/helpers/toast"
import { IJob } from "@/types/jobs"

export default function SetPublish({ item }: { item: IJob }) {
  const context = useContext(QueryContext)
  if (!context) {
    throw new Error('There is no context')
  }
  const { sort, search } = context

  const handlePublish = async (jobId: string, isPublished: boolean) => {
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
      <input type="checkbox" onChange={() => handlePublish(item.id, !item.isPublished)} value={`${item.isPublished}`} className="sr-only peer" checked={item.isPublished} />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900">{item.isPublished ? "published" : "unpublished"}</span>
    </label>
  )
}