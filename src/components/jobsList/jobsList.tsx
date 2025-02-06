'use client'

import Link from "next/link";
import JobsTable from "./jobsTable";
import React, { createContext, useState } from "react";
import { createQueryString } from "@/helpers/createQuery";
import { useDebounce } from "use-debounce";
import { IoFilterSharp } from "react-icons/io5";

export interface IQueryContext {
  search: string
  sort: string
}

export const QueryContext = createContext<IQueryContext | null>(null)

export default function JobsList() {
  const [sort, setSort] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [search] = useDebounce(text, 800)

  const handleSort = (e: React.MouseEvent<HTMLAnchorElement>, sort: string) => {
    e.preventDefault()
    const query = createQueryString('sort', sort)
    setSort(query)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = createQueryString('search', e.target.value)
    setText(query)
  }

  return (
    <>
      <div className="flex justify-between">
        <input
          onChange={handleSearch}
          placeholder="Search job title or category" type="search"
          className="border-2 px-2 w-[25rem] focus:border-blueNavy hover:border-blueNavy outline-none transition duration-200"
        />
        <Link href={'/admin/create-job'} className="text-white bg-pink py-2 px-4 font-medium hover:bg-pink/85">Create a job</Link>
      </div>
      <div className="dropdown mt-10">
        <button tabIndex={0} role="button" className="p-2 hover:bg-slate-200 transition duration-200"><IoFilterSharp /></button>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] w-fit p-2 shadow">
          <p className="text-xs font-medium text-black/50 mx-2">sorted by earliest entry</p>
          <li><a onClick={(e) => handleSort(e, 'asc')}>ascending</a></li>
          <li><a onClick={(e) => handleSort(e, 'desc')}>descending</a></li>
        </ul>
      </div>
      <QueryContext.Provider value={{ search, sort }}>
        <div className="overflow-x-auto">
          <JobsTable />
        </div>
      </QueryContext.Provider>
    </>
  )
}