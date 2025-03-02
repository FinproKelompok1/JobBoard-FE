import { createQueryString } from "@/helpers/createQuery"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import AgeRange from "./ageRange"
import SalaryRange from "./salaryRange"
import { FiFilter } from "react-icons/fi"
import { IoMdClose } from "react-icons/io"
import { TbArrowsSort } from "react-icons/tb"
import { GrStatusInfo } from "react-icons/gr";

interface IProps {
  setSearch: (param: string) => void
  setEdu: (param: string) => void
  setSort: (param: string) => void
  setMinAge: (param: string) => void
  setMaxAge: (param: string) => void
  setMinSalary: (param: string) => void
  setMaxSalary: (param: string) => void
  setStatus: (param: string) => void
}

export default function ApplicantFilter({
  setSearch,
  setEdu,
  setSort,
  setMinAge,
  setMaxAge,
  setMinSalary,
  setMaxSalary,
  setStatus
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
  
  const handleStatus = (e: React.MouseEvent<HTMLAnchorElement>, status: string) => {
    e.preventDefault()
    const query = createQueryString('status', status)
    setStatus(query)
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
    <div className="flex flex-wrap gap-4 mt-4 p-4 items-center bg-white shadow-md rounded-lg">
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search Name"
        name="name"
        className="px-4 py-2 text-xs sm:text-base rounded-lg outline-none border"
      />
      <div className="inline-flex items-center gap-2">
        <select
          onChange={handleEdu}
          name="last_edu"
          id="last_edu"
          className="outline-none px-4 py-2 text-xs sm:text-base rounded-lg border cursor-pointer"
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
        <button tabIndex={0} role="button" className="p-2 rounded-full hover:bg-slate-200 transition duration-200">
          <TbArrowsSort />
        </button>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] p-2 shadow -left-10 md:-left-32 w-[160px]">
          <li><a onClick={(e) => handleSort(e, 'asc')}>By erliest appliement (first)</a></li>
          <li><a onClick={(e) => handleSort(e, 'desc')}>By erliest appliement (last)</a></li>
        </ul>
      </div>
      <div className="dropdown">
        <button tabIndex={0} role="button" className="p-2 rounded-full hover:bg-slate-200 transition duration-200">
          <GrStatusInfo />
        </button>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] p-2 shadow -left-14 md:-left-28">
          <li><a onClick={(e) => handleStatus(e, '')}>All</a></li>
          <li><a onClick={(e) => handleStatus(e, 'processed')}>Processed</a></li>
          <li><a onClick={(e) => handleStatus(e, 'interviewed')}>Interviewed</a></li>
          <li><a onClick={(e) => handleStatus(e, 'rejected')}>Rejected</a></li>
          <li><a onClick={(e) => handleStatus(e, 'accepted')}>Accepted</a></li>
        </ul>
      </div>
      <div className="dropdown">
        <button tabIndex={0} role="button" className="p-2 rounded-full hover:bg-slate-200 transition duration-200"><FiFilter /></button>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] shadow -left-10 md:-left-32">
          <div className="flex flex-col tablet:flex-row items-center gap-2 rounded-lg shadow-sm bg-white">
            <SalaryRange
              setTempMinSalary={setTempMinSalary}
              setTempMaxSalary={setTempMaxSalary}
              applySalary={applySalary}
              tempMinSalary={tempMinSalary}
              tempMaxSalary={tempMaxSalary}
            />
          </div>
          <div className="flex flex-col tablet:flex-row items-center gap-2 rounded-lg shadow-sm bg-white mt-2">
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