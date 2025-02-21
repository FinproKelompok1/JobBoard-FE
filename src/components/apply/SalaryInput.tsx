interface SalaryInputProps {
  formattedSalary: string;
  handleSalaryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SalaryInput({ formattedSalary, handleSalaryChange }: SalaryInputProps) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        Expected Salary
      </label>
      <div className="relative">
        <input
          type="text"
          value={formattedSalary}
          onChange={handleSalaryChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#E60278] focus:border-transparent outline-none transition-all duration-200"
          placeholder="Rp 0"
        />
      </div>
    </div>
  );
}