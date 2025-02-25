import { formatRupiahTanpaDesimal } from "@/helpers/formatCurrency";

interface IProps {
  setTempMinSalary: (param: string) => void;
  setTempMaxSalary: (param: string) => void;
  applySalary: () => void;
  tempMinSalary: string;
  tempMaxSalary: string;
}

export default function SalaryRange({
  setTempMinSalary,
  setTempMaxSalary,
  applySalary,
  tempMinSalary,
  tempMaxSalary,
}: IProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"];
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 rounded-lg shadow-sm bg-white max-w-md mx-auto">
      <input
        type="text"
        name="min_salary"
        placeholder="Min Salary"
        className="w-full md:w-auto flex-1 px-3 py-2 text-xs border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        value={formatRupiahTanpaDesimal(Number(tempMinSalary) || 0)}
        onChange={(e) => setTempMinSalary(e.target.value.replace(/\D/g, ""))}
        onKeyDown={handleKeyDown}
      />
      <span className="text-gray-500">to</span>
      <input
        type="text"
        name="max_salary"
        placeholder="Max Salary"
        className="w-full md:w-auto flex-1 px-3 py-2 text-xs border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        value={formatRupiahTanpaDesimal(Number(tempMaxSalary) || 0)}
        onChange={(e) => setTempMaxSalary(e.target.value.replace(/\D/g, ""))}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={applySalary}
        className="px-4 py-2 text-xs bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
      >
        APPLY
      </button>
    </div>
  );
}
