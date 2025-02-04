'use client'

import { useState } from "react";
import ApplicantFilter from "./applicantsFilter";
import ApplicantsTable from "./applicantsTable";

export default function ApplicantsList() {
  const [sort, setSort] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [edu, setEdu] = useState<string>('')
  const [minAge, setMinAge] = useState<string>('')
  const [maxAge, setMaxAge] = useState<string>('')
  const [minSalary, setMinSalary] = useState<string>('')
  const [maxSalary, setMaxSalary] = useState<string>('')
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
      <div className="overflow-x-auto">
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
    </div>
  )
}