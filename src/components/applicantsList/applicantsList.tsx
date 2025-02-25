'use client'

import { useState } from "react";
import ApplicantFilter from "./applicantsFilter";
import ApplicantsTable from "./applicantsTable";
import { formatRupiahTanpaDesimal } from "@/helpers/formatCurrency";
import { IoMdClose } from "react-icons/io";

export default function ApplicantsList() {
  const [sort, setSort] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [edu, setEdu] = useState<string>('')
  const [minAge, setMinAge] = useState<string>('')
  const [maxAge, setMaxAge] = useState<string>('')
  const [minSalary, setMinSalary] = useState<string>('')
  const [maxSalary, setMaxSalary] = useState<string>('')

  const resetSalary = () => {
    setMinSalary('')
    setMaxSalary('')
  }

  const resetAge = () => {
    setMinAge('')
    setMaxAge('')
  }
  return (
    <div>
      <ApplicantFilter
        setSearch={setSearch}
        setEdu={setEdu}
        setSort={setSort}
        setMinAge={setMinAge}
        setMaxAge={setMaxAge}
        setMinSalary={setMinSalary}
        setMaxSalary={setMaxSalary}
      />
      <div className={`${(minSalary && maxSalary) || (minAge && maxAge) ? 'inline-flex flex-wrap' : 'hidden'} my-2 gap-2 items-center`}>
        {minSalary && maxSalary && (
          <span className="text-xs px-2 py-1 bg-slate-300 inline-flex items-center gap-2 w-fit rounded-md shadow-sm">
            <span className="font-medium">{formatRupiahTanpaDesimal(Number(minSalary.split('=')[1]))}</span> to
            <span className="font-medium">{formatRupiahTanpaDesimal(Number(maxSalary.split('=')[1]))}</span>
            <button type="button" className="hover:text-red-500 transition-colors" onClick={resetSalary}><IoMdClose /></button>
          </span>
        )}
        {minAge && maxAge && (
          <span className="text-xs px-2 py-1 bg-slate-300 inline-flex items-center gap-2 w-fit rounded-md shadow-sm">
            <span className="font-medium">{minAge.split('=')[1]}</span> to
            <span className="font-medium">{maxAge.split('=')[1]}</span>
            <button type="button" className="hover:text-red-500 transition-colors" onClick={resetAge}><IoMdClose /></button>
          </span>
        )}
      </div>
      <ApplicantsTable
        search={search}
        edu={edu}
        sort={sort}
        min_age={minAge}
        max_age={maxAge}
        min_salary={minSalary}
        max_salary={maxSalary}
      />
    </div>
  )
}