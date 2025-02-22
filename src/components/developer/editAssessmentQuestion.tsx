"use client";

import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { IAssessmentQuestion, IAssessmentQuestionForm } from "@/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  correctAnswer: Yup.string()
    .required("Correct Answer is required")
    .matches(/^[a-d]$/, "Correct Answer must be a, b, c, or d"),
  options: Yup.array()
    .of(Yup.string().required("Options is required"))
    .max(200, "Option must be at most 200 characters")
    .required("Options is required"),
});

export default function EditAssesmentQuestion({
  question,
  mutate,
}: {
  question: IAssessmentQuestion;
  mutate: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const indexToLetter = (index: number): string =>
    String.fromCharCode(97 + index);

  const initialValues: IAssessmentQuestionForm = {
    question: question.question,
    options: question.options,
    correctAnswer: indexToLetter(question.correctAnswer),
  };

  const handleEditQuestion = async (values: IAssessmentQuestionForm) => {
    try {
      setIsEditing(true);
      await axios.patch(`/assessment-questions/${question.id}`, values);

      toast.success("Question edited successfully");
      mutate();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to edit question:", error);
      toastErrAxios(error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 rounded-md border-2 border-accent px-2 py-1 text-center font-semibold tracking-wide text-accent transition-all duration-300 ease-in-out hover:bg-accent hover:text-white"
      >
        <FaEdit size={18} />
        Edit
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-xl rounded-lg bg-white p-5 shadow-lg">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold text-primary">Edit Question</h1>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-lg font-bold text-gray-600 hover:text-gray-800"
              >
                <IoClose size={30} />
              </button>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleEditQuestion}
            >
              {({ values }) => (
                <Form className="mt-5 flex flex-col gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="question" className="text-lg font-semibold">
                      Question
                    </label>
                    <Field
                      id="question"
                      name="question"
                      as="textarea"
                      className="mt-2 h-20 rounded-md border border-gray-500 p-2"
                      placeholder="Please enter question"
                    ></Field>
                    <p className="text-sm text-gray-500">
                      Option must be at most 200 characters
                    </p>
                    <ErrorMessage
                      name="question"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="options" className="text-lg font-semibold">
                      Options
                    </label>
                    {values.options.map((_, index) => (
                      <div key={index} className="mt-2 flex flex-col gap-2">
                        <label
                          htmlFor={`option [${index}]`}
                          className="text-sm text-gray-500"
                        >
                          Option {String.fromCharCode(97 + index)}
                        </label>
                        <Field
                          name={`options[${index}]`}
                          as="textarea"
                          className="h-20 rounded-md border border-gray-500 p-2"
                          placeholder={`Please enter option ${String.fromCharCode(97 + index)}`}
                        />
                        <ErrorMessage
                          name={`options[${index}]`}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="correctAnswer"
                      className="text-lg font-semibold"
                    >
                      Correct Option
                    </label>
                    <Field
                      id="correctAnswer"
                      name="correctAnswer"
                      as="input"
                      className="mt-2 rounded-md border border-gray-500 p-2"
                      placeholder="Please enter the correct option: a, b, c, or d"
                    />
                    <ErrorMessage
                      name="correctAnswer"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="confirmation"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                      className="size-4"
                    />
                    <label htmlFor="confirmation" className="ml-2">
                      Please check and confirm that all the inputs are correct.{" "}
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isEditing || !isChecked}
                      className="rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/50"
                    >
                      {isEditing ? "Editing..." : "Edit Question"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
