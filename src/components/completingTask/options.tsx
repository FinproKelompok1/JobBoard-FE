import { FormValueCompletingTask } from "@/types/form"
import { FieldArray, FormikProps } from "formik"

interface IProps {
  options: string[]
  questionIdx: number
  correctAnswer: number
  formikProps: FormikProps<FormValueCompletingTask>
}

export default function Options({ options, questionIdx, correctAnswer, formikProps }: IProps) {
  const { values } = formikProps
  return (
    <FieldArray name="answer">
      {({ push }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (!values.answer.find((item) => item.id === questionIdx)) {
            push({ id: questionIdx, correctAnswer, selectedOption: e.target.value })
          } else {
            const indexValue = values.answer.findIndex((item) => item.id === questionIdx)
            values.answer[indexValue].selectedOption = Number(e.target.value)
          }
        }
        return (
          <ul className="grid w-full gap-6 xl:grid-cols-2">
            {options.map((item, idx) => {
              return (
                <li key={idx}>
                  <input
                    type="radio"
                    id={`answer-${questionIdx}-${idx}`}
                    name={`answer.${questionIdx}.selectedOption`}
                    value={idx}
                    className="hidden peer"
                    onChange={handleChange}
                  />
                  <label htmlFor={`answer-${questionIdx}-${idx}`} className="inline-flex items-center justify-between w-full p-5 cursor-pointer border hover:border-lightBlue hover:text-lightBlue shadow-md peer-checked:text-lightBlue peer-checked:border-lightBlue">
                    <div className="block">
                      <div className="w-full text-lg">{item}</div>
                    </div>
                  </label>
                </li>
              )
            })}
          </ul>
        )
      }
      }
    </FieldArray>
  )
}