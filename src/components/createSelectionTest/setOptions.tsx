import { FormValuePreselection } from "@/types/form"
import { ErrorMessage, Field, FieldArray, FormikProps } from "formik"
import { useEffect } from "react"

interface IProps {
  formikProps: FormikProps<FormValuePreselection>
  index: number
}

export default function SetOptions({ formikProps, index }: IProps) {
  const { values, setFieldValue, handleChange } = formikProps
  useEffect(() => {
    if (values.preselectionQuestions[index].options.length !== 4) {
      setFieldValue(`preselectionQuestions.${index}.options`, ["", "", "", ""]);
    }
  }, [values.preselectionQuestions, index, setFieldValue]);
  return (
    <FieldArray name={`preselectionQuestions.${index}.options`}>
      {() => {
        return (
          <>
            {values.preselectionQuestions[index].options?.map((_, optIndex) => (
              <div key={optIndex} className="flex flex-col mb-2">
                <div className="flex gap-2">
                  <Field
                    type="radio"
                    name={`preselectionQuestions.${index}.correctAnswer`}
                    value={optIndex.toString()}
                    onChange={() => setFieldValue(`preselectionQuestions.${index}.correctAnswer`, optIndex)}
                    className="ml-2"
                    checked={values.preselectionQuestions[index].correctAnswer === optIndex}
                  />
                  <Field
                    name={`preselectionQuestions.${index}.options.${optIndex}`}
                    id={`preselectionQuestions.${index}.options.${optIndex}`}
                    onChange={handleChange}
                    value={values.preselectionQuestions[index].options[optIndex]}
                    placeholder='Enter the option'
                    className='outline-none p-2 border bg-grey flex-1'
                  />
                </div>
                <ErrorMessage name={`preselectionQuestions.${index}.options.${optIndex}`} >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
              </div>
            ))}
          </>
        )
      }}
    </FieldArray>
  )
}