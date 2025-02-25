
interface SalaryInputProps {
  formattedSalary: string;
  handleSalaryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SalaryInput({ formattedSalary, handleSalaryChange }: SalaryInputProps) {
  // const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (!/[\d]/.test(e.key) && 
  //       e.key !== 'Backspace' && 
  //       e.key !== 'Delete' && 
  //       e.key !== 'ArrowLeft' && 
  //       e.key !== 'ArrowRight' && 
  //       e.key !== 'Tab') {
  //     e.preventDefault();
  //   }
  // };

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
  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#E60278] focus:border-transparent outline-none"
  placeholder="Rp 0"
/>
      </div>
    </div>
  );
}