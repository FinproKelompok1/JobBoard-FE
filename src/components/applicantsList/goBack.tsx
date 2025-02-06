'use client'

import { IoArrowBack } from "react-icons/io5";

export default function GoBack() {
  return (
    <button className="flex items-center gap-2 font-bold" onClick={() => history.back()}><IoArrowBack /> Back</button>
  )
}