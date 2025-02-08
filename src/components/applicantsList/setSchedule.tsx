import axios from "@/helpers/axios"
import { formatDate } from "@/helpers/dateFormatter"
import { sweetAlertWarning } from "@/helpers/sweetAlert"
import { toastErrAxios } from "@/helpers/toast"
import UseOpen from "@/hooks/useOpen"
import { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { toast } from "react-toastify"
import { mutate } from "swr"

interface IProps {
  jobId: string | string[]
  userId: number
}

export default function SetSchedule({ jobId, userId }: IProps) {
  const { open, hidden, menuHandler } = UseOpen()
  const [interviewDate, setInterviewDate] = useState<string>('')
  const [interviewTime, setInterviewTime] = useState<string>('')
  const [interviewOldDate, setInterviewOldDate] = useState<string>('')
  const [interviewOldTime, setInterviewOldTime] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const date = new Date()
  const minDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const handleCreateSchedule = async () => {
    const { isConfirmed } = await sweetAlertWarning("Your schedule will be sent direct to applicant's email", "Confirm!")
    if (!isConfirmed) return
    try {
      setIsLoading(true)
      const startTime = `${interviewDate}T${interviewTime}:00+07:00`
      const { data } = await axios.post('/schedule', { jobId, userId, startTime })
      mutate((key: string) => key.startsWith(`/applicants/${jobId}`));
      toast.success(data.message)
    } catch (err) {
      toastErrAxios(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReschedule = async () => {
    const { isConfirmed } = await sweetAlertWarning("The applicant will be resent the new schedule", "Confirm!")
    if (!isConfirmed) return
    try {
      setIsLoading(true)
      const startTime = `${interviewDate}T${interviewTime}:00+07:00`
      const { data } = await axios.patch('/schedule', { jobId, userId, startTime })
      mutate((key: string) => key.startsWith(`/applicants/${jobId}`));
      toast.success(data.message)
    } catch (err) {
      toastErrAxios(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.post('/schedule/applicant-schedule', { jobId, userId })
      if (data.result) {
        const res = new Date(data.result.startTime)
        setInterviewOldDate(`${res.getFullYear()}-${String(res.getMonth() + 1).padStart(2, '0')}-${String(res.getDate()).padStart(2, '0')}`)
        setInterviewOldTime(res.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }))
      }
    }
    getData()
  }, [])

  const handleDeleteSchedule = async () => {
    const { isConfirmed } = await sweetAlertWarning("This schedule cannot be reverted or restored", "Yes, delete it!")
    if (!isConfirmed) return
    try {
      const { data } = await axios.delete(`/schedule/delete?jobId=${jobId}&userId=${userId}`)
      toast.success(data.message)
      mutate((key: string) => key.startsWith(`/applicants/${jobId}`));
    } catch (err) {
      toastErrAxios(err)
    }
  }
  return (
    <>
      {!interviewOldDate && !interviewOldTime ? (
        <button type="button" onClick={menuHandler} className='px-2 py-1 font-medium text-white bg-green-400 text-xs'>SET SCHEDULE</button>
      ) : (
        <div className="group relative">
          <div className="flex flex-col group-hover:opacity-0 transition duration-300">
            <span>{formatDate(interviewOldDate)}</span>
            <span>{interviewOldTime}</span>
          </div>
          <button onClick={menuHandler} className="absolute top-[0.8rem] -left-[1rem] text-xs transition duration-300 group-hover:opacity-100 opacity-0 px-2 py-1 bg-blueNavy text-white font-medium">Update</button>
          <button onClick={handleDeleteSchedule} className="absolute top-[0.8rem] -right-[1rem] text-xs transition duration-300 group-hover:opacity-100 opacity-0 px-2 py-1 bg-red-500 text-white font-medium">Delete</button>
        </div>
      )}
      <div className={`fixed ${hidden ? '' : 'hidden'} z-50 inset-0 bg-[rgba(0,0,0,0.5)]`}></div>
      <div className={`${open ? 'scale-100' : 'scale-0'} w-[50%] py-5 px-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 bg-white z-[60] ${hidden ? '' : 'hidden'}`}>
        <button type="button" onClick={menuHandler} className="w-fit text-[1.5rem] hover:text-red-500 mb-2"><IoMdClose /></button>
        <div className='flex flex-col'>
          <label htmlFor="interview_date" className='pb-2 font-semibold mt-4'>Interview date :</label>
          <input
            type='date'
            name='interview_date'
            id='interview_date'
            min={minDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            value={interviewDate}
            className='shadow-md border focus:border-lightBlue focus:border-2 outline-none px-2 py-1'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="interview_time" className='pb-2 font-semibold mt-4'>Interview Time :</label>
          <input
            type='time'
            name='interview_time'
            id='interview_time'
            onChange={(e) => setInterviewTime(e.target.value)}
            value={interviewTime}
            className='shadow-md border focus:border-lightBlue focus:border-2 outline-none px-2 py-1'
          />
        </div>
        {!interviewOldDate && !interviewOldTime ? (
          <button
            type="button"
            disabled={interviewDate == '' || interviewTime == '' || isLoading}
            onClick={handleCreateSchedule}
            className={`${interviewDate == '' || interviewTime == '' || isLoading ? 'disabled:cursor-not-allowed opacity-60 shadow-none' : 'hover:shadow-sm'} shadow-md border border-lightBlue shadow-lightBlue font-[550] mt-8 py-2 transition duration-300 w-full`}
          >
            {isLoading ? 'LOADING...' : 'SAVE'}
          </button>
        ) : (
          <button
            type="button"
            disabled={(interviewDate == interviewOldDate && interviewTime == interviewOldTime) || isLoading}
            onClick={handleReschedule}
            className={`${interviewDate == interviewOldDate && interviewTime == interviewOldTime ? 'disabled:cursor-not-allowed opacity-60 shadow-none' : 'hover:shadow-sm'} ${isLoading && 'disabled:cursor-not-allowed opacity-60 shadow-none'} shadow-md border border-lightBlue shadow-lightBlue font-[550] mt-8 py-2 transition duration-300 w-full`}
          >
            {isLoading ? 'LOADING...' : 'UPDATE'}
          </button>
        )}
      </div>
    </>
  )
}