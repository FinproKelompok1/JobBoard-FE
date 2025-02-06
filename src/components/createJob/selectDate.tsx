import { ErrorMessage, Field, FormikProps } from "formik";
import { FormValueJob } from "@/types/form";

export default function SelectDate({ handleChange, values }: FormikProps<FormValueJob>) {
  const date = new Date()
  const minDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return (
    <>
      <label htmlFor="endDate" className='text-normal sm:text-xl font-medium mb-2 w-fit'>Deadline for applying</label>
      <Field
        type='date'
        name='endDate'
        id='endDate'
        min={minDate}
        onChange={handleChange}
        value={values.endDate}
        className='border focus:border-lightBlue focus:border-2 outline-none p-2'
      />
      <ErrorMessage name="endDate" >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
    </>
  )
}