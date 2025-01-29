'use client'

import { getTotalJobs } from "@/libs/jobs"
import { useEffect, useState } from "react"

export default function TotalJobs() {
  const [total, setTotal] = useState<number>(0)
  useEffect(() => {
    const getData = async () => {
      const data = await getTotalJobs()
      setTotal(data)
    }
    getData()
  }, [])
  return (total)
}