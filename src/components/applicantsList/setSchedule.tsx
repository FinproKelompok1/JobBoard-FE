import axios from "@/helpers/axios"
import { formatDate } from "@/helpers/dateFormatter"
import { toastErrAxios } from "@/helpers/toast"
import UseOpen from "@/hooks/useOpen"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { mutate } from "swr"

interface IProps {
  jobId: string | string[]
  userId: number
}

export default function SetSchedule({ jobId, userId }: IProps) {
  const { open, hidden, menuHandler } = UseOpen()
  const [interviewDate, setInterviewDate] = useState<string>('')
  const [interviewTime, setInterviewTime] = useState<string>('')
  const date = new Date()
  const minDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const handleSave = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: `Your schedule will be sent direct to applicant's email`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!"
    })
    if (!isConfirmed) return
    try {
      const startTime = `${interviewDate}T${interviewTime}:00+07:00`
      const { data } = await axios.post('/schedule', { jobId, userId, startTime })
      mutate((key: string) => key.startsWith(`/applicants/${jobId}`));
      toast.success(data)
    } catch (err) {
      toastErrAxios(err)
    } finally {
      menuHandler()
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
        const res = data.result.startTime
        setInterviewDate(formatDate(res.split('T')[0]))
        setInterviewTime(new Date(res).toLocaleTimeString('it-IT'))
      }
    }
    getData()
  }, [])

  const handleDeleteSchedule = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: `This schedule cannot be reverted or restored`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
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
      {!interviewDate && !interviewTime ? (
        <button type="button" onClick={menuHandler} className='px-2 py-1 font-medium text-white bg-green-400 text-xs'>SET SCHEDULE</button>
      ) : (
        <div className="group relative">
          <div className="flex flex-col group-hover:opacity-0 transition duration-300">
            <span>{interviewDate}</span>
            <span>{interviewTime}</span>
          </div>
          <button className="absolute top-[0.8rem] -left-[1rem] text-xs transition duration-300 group-hover:opacity-100 opacity-0 px-2 py-1 bg-blueNavy text-white font-medium">Update</button>
          <button onClick={handleDeleteSchedule} className="absolute top-[0.8rem] -right-[1rem] text-xs transition duration-300 group-hover:opacity-100 opacity-0 px-2 py-1 bg-red-500 text-white font-medium">Delete</button>
        </div>
      )}
      <div className={`fixed ${hidden ? '' : 'hidden'} z-50 inset-0 bg-[rgba(0,0,0,0.5)]`}></div>
      <div className={`${open ? 'scale-100' : 'scale-0'} w-[50%] py-5 px-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 bg-white z-[60] ${hidden ? '' : 'hidden'}`}>
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
        <button type="button" disabled={interviewDate == '' || interviewTime == ''} onClick={handleSave} className={`${interviewDate == '' || interviewTime == '' ? 'disabled:cursor-not-allowed' : 'hover:shadow-sm'} shadow-md border border-lightBlue shadow-lightBlue font-[550] mt-8 py-2 transition duration-300 w-full`}>SAVE</button>
      </div>
    </>
  )
}