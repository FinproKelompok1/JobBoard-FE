import { formatRupiahTanpaDesimal } from "@/helpers/formatCurrency"

interface IProps {
  setTempMinSalary: (param: string) => void
  setTempMaxSalary: (param: string) => void
  applySalary: () => void
  tempMinSalary: string
  tempMaxSalary: string
}

export default function SalaryRange({
  setTempMinSalary,
  setTempMaxSalary,
  applySalary,
  tempMinSalary,
  tempMaxSalary
}: IProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"];
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  }
  return (
    <>
      <input
        type="text"
        name="min_salary"
        placeholder="Min Salary"
        className="outline-none px-2 py-1 border"
        value={formatRupiahTanpaDesimal(Number(tempMinSalary) || 0)}
        onChange={(e) => setTempMinSalary(e.target.value.replace(/\D/g, ""))}
        onKeyDown={handleKeyDown}
      />
      <span>between</span>
      <input
        type="text"
        name="max_salary"
        placeholder="Max Salary"
        className="outline-none px-2 py-1 border"
        value={formatRupiahTanpaDesimal(Number(tempMaxSalary) || 0)}
        onChange={(e) => setTempMaxSalary(e.target.value.replace(/\D/g, ""))}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={applySalary}
        className="px-2 py-1 text-xs bg-pink text-white font-semibold"
      >
        APPLY
      </button>
    </>
  )
}