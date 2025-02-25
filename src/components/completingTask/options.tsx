import { FormValueCompletingTask } from "@/types/form";
import { FieldArray, FormikProps } from "formik";

interface IProps {
  options: string[];
  questionIdx: number;
  correctAnswer: number;
  formikProps: FormikProps<FormValueCompletingTask>;
}

export default function Options({ options, questionIdx, correctAnswer, formikProps }: IProps) {
  const { values, setFieldValue } = formikProps;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = Number(e.target.value);
    const updatedAnswers = values.answer.map((item) =>
      item.id === questionIdx ? { ...item, selectedOption } : item
    );
    
    if (!values.answer.find((item) => item.id === questionIdx)) {
      setFieldValue("answer", [...values.answer, { id: questionIdx, correctAnswer, selectedOption }]);
    } else {
      setFieldValue("answer", updatedAnswers);
    }
  };

  return (
    <FieldArray name="answer">
      {() => (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {options.map((item, idx) => (
            <li key={idx}>
              <input
                type="radio"
                id={`answer-${questionIdx}-${idx}`}
                name={`answer.${questionIdx}.selectedOption`}
                value={idx}
                className="hidden peer"
                onChange={handleChange}
              />
              <label
                htmlFor={`answer-${questionIdx}-${idx}`}
                className="flex items-center justify-between w-full p-4 border border-gray-300 rounded-lg cursor-pointer shadow-md bg-white 
                          transition-all duration-300 ease-in-out hover:border-blue-500 hover:bg-blue-50 
                          peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-blue-700"
              >
                <span className="text-lg font-medium">{item}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </FieldArray>
  );
}
