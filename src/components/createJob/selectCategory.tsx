import { ErrorMessage, Field, FormikProps } from "formik";
import { categories } from './data';
import { FormValueJob } from "@/types/form";

export default function SelectCategory({ handleChange, values }: FormikProps<FormValueJob>) {
  return (
    <>
      <label htmlFor="category" className='text-normal sm:text-xl font-medium mb-2 w-fit'>Category</label>
      <Field
        as="select"
        name='category'
        id='category'
        onChange={handleChange}
        value={values.category}
        className='outline-none px-2 cursor-pointer appearance-none border py-2 rounded-lg focus:ring-2 focus:ring-blueNavy'
      >
        <option value={''} disabled className='text-black/50'>
          Select Category
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Field>
      <ErrorMessage name="category" >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
    </>
  )
}