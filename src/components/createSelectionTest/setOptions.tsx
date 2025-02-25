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
      setFieldValue(`preselectionQuestions.${index}.options`, ["", "", "", ""])
    }
  }, [values.preselectionQuestions, index, setFieldValue])

  return (
    <FieldArray name={`preselectionQuestions.${index}.options`}>
      {() => (
        <div className="space-y-3">
          {values.preselectionQuestions[index].options?.map((_, optIndex) => (
            <div key={optIndex} className="flex items-center gap-2 bg-gray-50 p-3 flex-wrap">
              <Field
                type="radio"
                name={`preselectionQuestions.${index}.correctAnswer`}
                value={optIndex.toString()}
                onChange={() => setFieldValue(`preselectionQuestions.${index}.correctAnswer`, optIndex)}
                className="cursor-pointer accent-pink"
                checked={values.preselectionQuestions[index].correctAnswer === optIndex}
              />
              <Field
                name={`preselectionQuestions.${index}.options.${optIndex}`}
                id={`preselectionQuestions.${index}.options.${optIndex}`}
                onChange={handleChange}
                value={values.preselectionQuestions[index].options[optIndex]}
                placeholder={`Option ${optIndex + 1}`}
                className="flex-1 outline-none p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blueNavy"
              />
              <ErrorMessage name={`preselectionQuestions.${index}.options.${optIndex}`} >
                {msg => <div className='text-red-500 text-xs'><sup>*</sup>{msg}</div>}
              </ErrorMessage>
            </div>
          ))}
        </div>
      )}
    </FieldArray>
  )
}
