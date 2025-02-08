import axios from "@/helpers/axios";
import { sweetAlertWarning } from "@/helpers/sweetAlert";
import { toastErrAxios } from "@/helpers/toast";
import UseOpen from "@/hooks/useOpen"
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  jobId: string | string[]
  userId: number
}

export default function SetReviewRejection({ jobId, userId }: IProps) {
  const { open, hidden, menuHandler } = UseOpen()
  const [rejectedReview, setRejectedReview] = useState<string>('')

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open])

  const handleSave = async () => {
    const { isConfirmed } = await sweetAlertWarning("This review cannot be updated or reverted", "Confirm!")
    if (!isConfirmed) return
    try {
      const { data } = await axios.patch('/applicants/review', { rejectedReview, jobId, userId })
      toast.success(data.message)
      mutate((key: string) => key.startsWith(`/applicants/${jobId}`));
    } catch (err) {
      toastErrAxios(err)
    }
  }
  return (
    <>
      <button type="button" onClick={menuHandler} className='px-2 py-1 font-medium text-white bg-red-500 text-xs'>REVIEW</button>
      <div className={`fixed ${hidden ? '' : 'hidden'} z-50 inset-0 bg-[rgba(0,0,0,0.5)]`}></div>
      <div className={`${open ? 'scale-100' : 'scale-0'} w-[50%] py-5 px-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 bg-white z-[60] ${hidden ? '' : 'hidden'}`}>
        <button type="button" onClick={menuHandler} className="w-fit text-[1.5rem] hover:text-red-500 mb-6"><IoMdClose /></button>
        <textarea
          name="rejected-review"
          id="rejected-review"
          className="w-full h-full border outline-none border-black px-2 py-1"
          placeholder="Give your honest review for the rejected applicant"
          value={rejectedReview}
          onChange={(e) => setRejectedReview(e.target.value)}
        />
        <button type="button" disabled={rejectedReview == ''} onClick={handleSave} className={`${rejectedReview == '' ? 'disabled:cursor-not-allowed' : 'hover:shadow-sm'} shadow-md border border-lightBlue shadow-lightBlue font-[550] mt-8 py-2 transition duration-300 w-full`}>SAVE</button>
      </div>
    </>
  )
}