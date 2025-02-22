"use client";

import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { IAssessmentQuestionForm } from "@/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import * as Yup from "yup";

const initialValues: IAssessmentQuestionForm = {
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
};

const validationSchema = Yup.object({
  question: Yup.string()
    .required("Question is required")
    .max(200, "Question must be at most 200 characters"),
  correctAnswer: Yup.string()
    .required("Correct Answer is required")
    .matches(/^[a-d]$/, "Correct Answer must be a, b, c, or d"),
  options: Yup.array().of(
    Yup.string()
      .max(200, "Option must be at most 200 characters")

      .required("Options is required"),
  ),
});

export default function CreateAssessmentQuestion({
  assessmentId,
  mutate,
  disabled,
}: {
  assessmentId: number;
  mutate: () => void;
  disabled: boolean;
}) {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreateQuestion = async (
    values: IAssessmentQuestionForm,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      setIsCreating(true);

      const formattedValues = {
        ...values,
        options: values.options.map((option) => option.trim()),
      };

      const { data } = await axios.post(
        `/assessment-questions/${assessmentId}`,
        formattedValues,
      );

      toast.success(data.message);
      resetForm();
      setIsChecked(false);
      await mutate();
    } catch (error) {
      toastErrAxios(error);
    } finally {
      setIsCreating(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
        className="flex items-center gap-2 whitespace-nowrap rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/50"
      >
        <FaPlus size={18} />
        Create Question
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-lg">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold text-primary">
                Create Question
              </h1>
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
              onSubmit={handleCreateQuestion}
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
                      disabled={isCreating || !isChecked}
                      className="rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/50"
                    >
                      {isCreating ? "Creating..." : "Create Question"}
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
