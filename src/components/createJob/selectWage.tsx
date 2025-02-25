import { formatRupiahTanpaDesimal } from "@/helpers/formatCurrency";
import { FormValueJob } from "@/types/form";
import { Field, FormikProps } from "formik";

export default function SelectWage({ setFieldValue, values }: FormikProps<FormValueJob>) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"];
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  }
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setFieldValue("salary", rawValue);
  }
  return (
    <>
      <label htmlFor='salary' className='text-normal sm:text-xl font-medium mb-2 w-fit'>Salary <span className="text-xs font-normal">(OPTIONAL)</span></label>
      <Field
        type='text'
        name='salary'
        id='salary'
        onChange={handlePriceChange}
        onKeyDown={handleKeyDown}
        value={formatRupiahTanpaDesimal(Number(values.salary) || 0)}
        className='outline-none p-2 border bg-white placeholder:text-black rounded-lg focus:ring-2 focus:ring-blueNavy'
      />
    </>
  )
}