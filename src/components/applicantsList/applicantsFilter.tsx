import { createQueryString } from "@/helpers/createQuery"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import AgeRange from "./ageRange"
import SalaryRange from "./salaryRange"
import { FiFilter } from "react-icons/fi"
import { LiaSortAlphaDownSolid, LiaSortAlphaUpAltSolid } from "react-icons/lia"
import { IoMdClose } from "react-icons/io"

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
  const [tempMinAge, setTempMinAge] = useState<string>('')
  const [tempMaxAge, setTempMaxAge] = useState<string>('')
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

  const resetEdu = () => {
    setTempEdu('')
    setEdu('')
  }

  const handleSort = (e: React.MouseEvent<HTMLAnchorElement>, sort: string) => {
    e.preventDefault()
    const query = createQueryString('sort', sort)
    setSort(query)
  }

  const applyAge = () => {
    if (tempMinAge && tempMaxAge) {
      if (tempMinAge > tempMaxAge) {
        alert("Min age must be less than max age")
        return
      }
      const minAge = createQueryString('min_age', tempMinAge)
      const maxAge = createQueryString('max_age', tempMaxAge)
      setMinAge(minAge)
      setMaxAge(maxAge)
    }
  }

  const applySalary = () => {
    const minimum = Number(tempMinSalary.replace(/\D/g, ""))
    const maximum = Number(tempMaxSalary.replace(/\D/g, ""))
    if (minimum && maximum) {
      if (minimum > maximum) {
        alert("Min salary must be less than max salary")
        return
      }
      const minSalary = createQueryString('min_salary', String(minimum))
      const maxSalary = createQueryString('max_salary', String(maximum))
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
      <div className="inline-flex items-center gap-2">
        <select
          onChange={handleEdu}
          name="last_edu"
          id="last_edu"
          className="outline-none px-2 py-1 border cursor-pointer"
          value={tempEdu}
        >
          <option value="" disabled>filter by education</option>
          <option value="highSchoolDiploma">High School Diploma</option>
          <option value="bachelor">Bachelor</option>
          <option value="diploma">Diploma</option>
          <option value="doctoral">Doctoral</option>
          <option value="master">Master</option>
        </select>
        {tempEdu && (
          <button type="button" className="text-xs hover:text-pink" onClick={resetEdu}><IoMdClose /></button>
        )}
      </div>
      <div className="dropdown">
        <button tabIndex={0} role="button" className="p-2 hover:bg-slate-200 transition duration-200">
          <LiaSortAlphaDownSolid />
          <LiaSortAlphaUpAltSolid />
        </button>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] w-fit p-2 shadow">
          <p className="text-xs font-medium text-black/50 mx-2">sorted by earliest appliment</p>
          <li><a onClick={(e) => handleSort(e, 'asc')}>ascending</a></li>
          <li><a onClick={(e) => handleSort(e, 'desc')}>descending</a></li>
        </ul>
      </div>
      <div className="dropdown">
        <button tabIndex={0} role="button" className="p-2 hover:bg-slate-200 transition duration-200"><FiFilter /></button>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] w-fit p-2 shadow">
          <div className="flex items-center gap-2">
            <SalaryRange
              setTempMinSalary={setTempMinSalary}
              setTempMaxSalary={setTempMaxSalary}
              applySalary={applySalary}
              tempMinSalary={tempMinSalary}
              tempMaxSalary={tempMaxSalary}
            />
          </div>
          <div className="flex gap-2 items-center mt-4">
            <AgeRange
              setTempMinAge={setTempMinAge}
              setTempMaxAge={setTempMaxAge}
              applyAge={applyAge}
              tempMinAge={tempMinAge}
              tempMaxAge={tempMaxAge}
            />
          </div>
        </ul>
      </div>
    </div>
  )
}