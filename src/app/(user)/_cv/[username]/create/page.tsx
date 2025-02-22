"use client";

import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { ICvForm } from "@/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const initialValues: ICvForm = {
  summary: "",
  experience: "",
  skill: "",
  education: "",
};

const validationSchema = Yup.object({
  summary: Yup.string().required("Summary is required"),
  experience: Yup.string().required("Experience is required"),
  skill: Yup.string().required("Skills is required"),
  education: Yup.string().required("Education is required"),
});

export default function CreateCv({ params }: { params: { username: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const router = useRouter();

  const handleCreateCv = async (
    values: ICvForm,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/cv", values);
      toast.success(data.message);
      resetForm();
      router.push(`/${params.username}/cv`);
      router.refresh();
    } catch (error) {
      console.log("Error create CV:", error);
      toastErrAxios(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-100">
      <div className="flex items-center justify-center md:p-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateCv}
        >
          <Form className="flex w-[750px] flex-col gap-5 rounded-xl bg-white p-5 md:border md:shadow-lg">
            <div className="">
              <h1 className="text-3xl font-bold text-primary">
                Create Curriculum Vitae
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="summary" className="text-xl font-bold">
                Summary
              </label>
              <Field
                name="summary"
                as="textarea"
                className="h-40 rounded-md border border-gray-500 p-2"
                placeholder="Please enter your summary"
              ></Field>
              <ErrorMessage
                name="summary"
                component={"div"}
                className="text-red-500"
              ></ErrorMessage>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="experience" className="text-xl font-bold">
                Work Experience
              </label>
              <p className="text-sm text-gray-700">
                Format: Company Name, Position, Start Date, End Date,
                Description ;
              </p>
              <Field
                name="experience"
                as="textarea"
                className="h-40 rounded-md border border-gray-500 p-2"
                placeholder="Please enter your experiences"
              ></Field>
              <p className="text-sm text-gray-700">
                If you have multiple experiences, separate them with a semicolon
                (;) and list them from latest to oldest.
              </p>
              <ErrorMessage
                name="experience"
                component={"div"}
                className="text-red-500"
              ></ErrorMessage>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="education" className="text-xl font-bold">
                Education
              </label>
              <p className="text-sm text-gray-700">
                Format: School Name, Degree, Field of Study, Start Date, End
                Date ; etc
              </p>
              <Field
                name="education"
                as="textarea"
                className="h-40 rounded-md border border-gray-700 p-2"
                placeholder="Please enter your educations"
              ></Field>
              <p className="text-sm text-gray-700">
                If you have multiple education, separate them with a semicolon
                (;) and list them from latest to oldest.
              </p>
              <ErrorMessage
                name="education"
                component={"div"}
                className="text-red-500"
              ></ErrorMessage>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="skill" className="text-xl font-bold">
                Skill
              </label>
              <p className="text-sm text-gray-700">
                Format: Skill 1 ; Skill 2 ; Skill 3 ; etc
              </p>
              <Field
                name="skill"
                as="textarea"
                className="h-40 rounded-md border border-gray-500 p-2"
                placeholder="Please enter your skills"
              ></Field>
              <p className="text-sm text-gray-700">
                Seperate each skill with a semicolon (;)
              </p>
              <ErrorMessage
                name="skill"
                component={"div"}
                className="text-red-500"
              ></ErrorMessage>
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
                className="w-full rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/80 md:w-fit"
              >
                {isLoading ? "Creating..." : "Create CV"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
