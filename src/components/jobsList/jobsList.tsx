import Link from "next/link";
import JobsTable from "./jobsTable";
import React, { useState } from "react";
import { createQueryString } from "@/helpers/createQuery";
import { useDebounce } from "use-debounce";

export default function JobsList() {
  const [sort, setSort] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [search] = useDebounce(text, 800)

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const query = createQueryString('sort', e.target.value)
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
          placeholder="Search job title or category" type="text"
          className="border-2 px-2 w-[25rem] focus:border-blueNavy hover:border-blueNavy outline-none transition duration-200"
        />
        <Link href={'/admin/create-job'} className="text-white bg-pink py-2 px-4 font-medium hover:bg-pink/85">Create a job</Link>
      </div>
      <div>
        <label htmlFor="sort">Sort : </label>
        <select onChange={handleSort} name="sort" id="sort" className="border mt-2">
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      <div>
        <JobsTable sort={sort} search={search} />
      </div>
    </>
  )
}