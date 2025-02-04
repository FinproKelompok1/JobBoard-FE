import { createQueryString } from "@/helpers/createQuery"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

interface IProps {
  setSearch: (param: string) => void
  setEdu: (param: string) => void
  setSort: (param: string) => void
  setMinAge: (param: string) => void
  setMaxAge: (param: string) => void
  setMinSalary: (param: string) => void
  setMaxSalary: (param: string) => void
}

export default function ApplicantFilter({
  setSearch,
  setEdu,
  setSort,
  setMinAge,
  setMaxAge,
  setMinSalary,
  setMaxSalary
}: IProps) {
  const [text, setText] = useState<string>('')
  const [search] = useDebounce(text, 800)
  const [tempEdu, setTempEdu] = useState<string>('')
  const [tempMinAge, setTempMinAge] = useState<string>()
  const [tempMaxAge, setTempMaxAge] = useState<string>()
  const [tempMinSalary, setTempMinSalary] = useState<string>('')
  const [tempMaxSalary, setTempMaxSalary] = useState<string>('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = createQueryString('search', e.target.value)
    setText(query)
  }

  const handleEdu = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempEdu(e.target.value)
    const query = createQueryString('last_edu', e.target.value)
    setEdu(query)
  }

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const query = createQueryString('sort', e.target.value)
    setSort(query)
  }

  const applyAge = () => {
    if (tempMinAge && tempMaxAge) {
      const minAge = createQueryString('min_age', tempMinAge)
      const maxAge = createQueryString('max_age', tempMaxAge)
      setMinAge(minAge)
      setMaxAge(maxAge)
    }
  }

  const applySalary = () => {
    if (tempMinSalary && tempMaxSalary) {
      const minSalary = createQueryString('min_salary', tempMinSalary)
      const maxSalary = createQueryString('max_salary', tempMaxSalary)
      setMinSalary(minSalary)
      setMaxSalary(maxSalary)
    }
  }

  useEffect(() => {
    setSearch(search)
  }, [search])
  return (
    <div className="flex items-center flex-wrap gap-4 mt-2">
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search Name"
        name="name"
        className="px-2 py-1 outline-none border"
      />
      <div className="flex gap-2 items-center">
        <input
          type="number"
          min={0}
          max={100}
          name="min_age"
          placeholder="Age"
          value={tempMinAge}
          onChange={(e) => setTempMinAge(e.target.value)}
          className="outline-none px-2 py-1 border w-16"
        />
        <span>between</span>
        <input
          type="number"
          min={0}
          max={100}
          name="max_age"
          placeholder="Age"
          value={tempMaxAge}
          onChange={(e) => setTempMaxAge(e.target.value)}
          className="outline-none px-2 py-1 border w-16"
        />
        <button
          onClick={applyAge}
          className="px-2 py-1 text-xs bg-pink text-white font-semibold"
        >
          APPLY
        </button>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          name="min_salary"
          placeholder="Min Salary"
          className="outline-none px-2 py-1 border"
          onChange={(e) => setTempMinSalary(e.target.value)}
        />
        <span>between</span>
        <input
          type="text"
          name="max_salary"
          placeholder="Max Salary"
          className="outline-none px-2 py-1 border"
          onChange={(e) => setTempMaxSalary(e.target.value)}
        />
        <button
          onClick={applySalary}
          className="px-2 py-1 text-xs bg-pink text-white font-semibold"
        >
          APPLY
        </button>
      </div>
      <select
        onChange={handleEdu}
        name="last_edu"
        id="last_edu"
        className="outline-none p-2 border cursor-pointer"
        value={tempEdu}
      >
        <option value="" disabled>filter by education</option>
        <option value="highSchoolDiploma">High School Diploma</option>
        <option value="bachelor">Bachelor</option>
        <option value="diploma">Diploma</option>
        <option value="doctoral">Doctoral</option>
        <option value="master">Master</option>
      </select>
      <div>
        <label htmlFor="sort">Sort : </label>
        <select onChange={handleSort} name="sort" id="sort" className="border mt-2">
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>
  )
}