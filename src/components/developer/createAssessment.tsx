"use client";

import axios from "@/helpers/axios";
import { IAssessmentForm } from "@/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const initialValues: IAssessmentForm = {
  title: "",
  description: "",
};

const validationSchema = Yup.object({
  title: Yup.string()
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  description: Yup.string()
    .max(200, "Description must be at most 200 characters")
    .required("Description is required"),
});

export default function CreateAssessment() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleCreateAssessment = async (
    values: IAssessmentForm,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/assessments", values);

      toast.success(data.message);
      resetForm();
      router.push(`/developer/assessment/${data.assessmentId}/question`);
      router.refresh();
    } catch (error) {
      toast.error("Error create assessment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 whitespace-nowrap rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80"
      >
        <FaPlus size={18} />
        Create Assessment
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-lg">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold text-primary">
                Create Assessment
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
              onSubmit={handleCreateAssessment}
            >
              <Form className="mt-5 flex flex-col gap-5">
                <div className="flex flex-col">
                  <label htmlFor="title" className="text-lg font-semibold">
                    Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    as="input"
                    className="mt-2 rounded-md border border-gray-500 p-2"
                    placeholder="Please enter assessment's title"
                  ></Field>
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="text-lg font-semibold"
                  >
                    Description
                  </label>
                  <Field
                    id="description"
                    name="description"
                    as="textarea"
                    className="mt-2 h-40 rounded-md border border-gray-500 p-2"
                    placeholder="Please enter assessment's description"
                  />
                  <p className="text-sm text-gray-500">
                    Description must be at most 200 characters
                  </p>
                  <ErrorMessage
                    name="description"
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
                    disabled={isLoading || !isChecked}
                    className="rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/80"
                  >
                    {isLoading ? "Creating..." : "Create Assessment"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
