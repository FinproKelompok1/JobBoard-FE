import UseOpen from "@/hooks/useOpen"
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io"

export default function PreviewPdf({ resume }: { resume: string }) {
  const { open, hidden, menuHandler } = UseOpen()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open])

  return (
    <>
      <button onClick={menuHandler} className="px-2 py-1 font-medium text-white bg-pink">Preview</button>
      <div className={`fixed ${hidden ? '' : 'hidden'} overflow-y-scroll z-40 inset-0 bg-[rgba(0,0,0,0.5)]`} />
      <div className={`${open ? 'scale-100' : 'scale-0'} h-[80vh] overflow-y-scroll w-full sm:w-[75%] xl:w-[50%] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 bg-white z-50 ${hidden ? '' : 'hidden'}`}>
        <button type="button" onClick={menuHandler} className="w-fit text-[1.5rem] hover:text-red-500 m-2"><IoMdClose /></button>
        <object data="/Hanif Ahmad Rizqullah_CV_ATS.pdf" type="application/pdf" width="100%" height="100%"></object>
      </div>
    </>
  )
}