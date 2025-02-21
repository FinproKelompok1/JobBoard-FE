import { FormValuePreselection } from "@/types/form";
import { ErrorMessage, Field, FieldArray, FormikProps } from "formik";
import SetOptions from "./setOptions";
import { BsQuestionSquareFill } from "react-icons/bs";

export default function CreateQuestion(formikProps: FormikProps<FormValuePreselection>) {
  const { values, handleChange } = formikProps
  return (
    <FieldArray name="preselectionQuestions">
      {({ push, remove }) => (
        <div>
          <h3 className='font-medium mb-1 w-fit'>Preselection Questions</h3>
          {values.preselectionQuestions.map((_, index) => (
            <div key={index} className="border border-black py-4 px-6 mb-10 flex flex-col" >
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <BsQuestionSquareFill />
                  <label htmlFor={`preselectionQuestions.${index}.question`} className='font-medium mb-1 w-fit'>Question {index + 1}</label>
                </div>
                <Field
                  as='textarea'
                  name={`preselectionQuestions.${index}.question`}
                  id={`preselectionQuestions.${index}.question`}
                  onChange={handleChange}
                  value={values.preselectionQuestions[index].question}
                  placeholder='Enter your question'
                  className='outline-none p-2 border bg-grey h-28'
                />
                <ErrorMessage name={`preselectionQuestions.${index}.question`} >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
              </div>

              <div className="flex flex-col">
                <label className='font-medium mb-1 w-fit'>Answer Options and correct answer</label>
                <SetOptions formikProps={formikProps} index={index} />
                <ErrorMessage name={`preselectionQuestions.${index}.correctAnswer`} >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
              </div>

              <button className="hover:bg-grey transition duration-200 font-medium w-fit mx-auto py-2 px-4" type="button" onClick={() => remove(index)}>Remove Question</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => push({ question: "", options: [""], correctAnswer: null })}
            className="bg-pink text-white font-semibold py-2 px-4"
          >
            Add Question
          </button>
        </div>
      )}
    </FieldArray>
  )
}