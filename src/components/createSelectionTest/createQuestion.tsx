import { FormValuePreselection } from "@/types/form";
import { ErrorMessage, Field, FieldArray, FormikProps } from "formik";
import SetOptions from "./setOptions";
import { BsQuestionSquareFill } from "react-icons/bs";

export default function CreateQuestion(formikProps: FormikProps<FormValuePreselection>) {
  const { values, handleChange } = formikProps;
  return (
    <FieldArray name="preselectionQuestions">
      {({ push, remove }) => (
        <div className="space-y-6">
          <h3 className='text-lg font-semibold mb-2'>Preselection Questions</h3>
          {values.preselectionQuestions.map((_, index) => (
            <div key={index} className="border border-gray-300 shadow-md rounded-lg py-5 px-6 mb-6 flex flex-col bg-white">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center mb-2">
                  <BsQuestionSquareFill className="text-gray-700" />
                  <label htmlFor={`preselectionQuestions.${index}.question`} className='font-semibold text-gray-800'>Question {index + 1}</label>
                </div>
                <Field
                  as='textarea'
                  name={`preselectionQuestions.${index}.question`}
                  id={`preselectionQuestions.${index}.question`}
                  onChange={handleChange}
                  value={values.preselectionQuestions[index].question}
                  placeholder='Enter your question'
                  className='outline-none p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blueNavy'
                />
                <ErrorMessage name={`preselectionQuestions.${index}.question`} >{msg => <div className='text-red-500 text-xs mt-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
              </div>

              <div className="flex flex-col mt-4">
                <label className='font-semibold text-gray-800 mb-2'>Answer Options and Correct Answer</label>
                <SetOptions formikProps={formikProps} index={index} />
                <ErrorMessage name={`preselectionQuestions.${index}.correctAnswer`} >{msg => <div className='text-red-500 text-xs mt-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
              </div>

              <button className="text-red-600 font-medium w-fit mx-auto py-2 px-4 mt-4 border border-red-500 rounded-lg hover:bg-red-100 transition duration-200" type="button" onClick={() => remove(index)}>Remove Question</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => push({ question: "", options: [""], correctAnswer: null })}
            className="bg-blueNavy/80 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blueNavy transition duration-200"
          >
            Add Question
          </button>
        </div>
      )}
    </FieldArray>
  );
}
