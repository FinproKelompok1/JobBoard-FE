"use client";

import axios from "@/helpers/axios";
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
      toast.error("Error create CV");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="flex items-center justify-center p-5 md:p-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateCv}
        >
          <Form className="w-[750px] rounded-xl border-gray-500 md:border md:p-5 md:shadow-lg">
            <div className="">
              <h1 className="text-3xl font-bold text-primary">
                Create Curriculum Vitae
              </h1>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="summary" className="text-xl font-bold">
                Summary
              </label>
              <Field
                name="summary"
                as="textarea"
                className="rounded-md border border-gray-500 p-2"
                placeholder="Enter your summary"
              ></Field>
              <ErrorMessage
                name="summary"
                component={"div"}
                className="text-red-500"
              ></ErrorMessage>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="experience" className="text-xl font-bold">
                Work Experience
              </label>
              <p className="text-sm">
                Format: Company Name, Position, Start Date, End Date,
                Description ;
              </p>
              <Field
                name="experience"
                as="textarea"
                className="rounded-md border border-gray-500 p-2"
                placeholder="Enter your experiences"
              ></Field>
              <p className="text-sm">
                If you have multiple experiences, separate them with a semicolon
                (;) and list them from latest to oldest.
              </p>
              <ErrorMessage
                name="experience"
                component={"div"}
                className="text-red-500"
              ></ErrorMessage>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="education" className="text-xl font-bold">
                Education
              </label>
              <p className="text-sm">
                Format: School Name, Degree, Field of Study, Start Date, End
                Date ;{" "}
              </p>
              <Field
                name="education"
                as="textarea"
                className="rounded-md border border-gray-500 p-2"
                placeholder="Enter your educations"
              ></Field>
              <p className="text-sm">
                If you have multiple education, separate them with a semicolon
                (;) and list them from latest to oldest.
              </p>
              <ErrorMessage
                name="education"
                component={"div"}
                className="text-red-500"
              ></ErrorMessage>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="skill" className="text-xl font-bold">
                Skill
              </label>
              <Field
                name="skill"
                as="textarea"
                className="rounded-md border border-gray-500 p-2"
                placeholder="Enter your skills"
              ></Field>
              <ErrorMessage
                name="skill"
                component={"div"}
                className="text-red-500"
              ></ErrorMessage>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed md:w-fit"
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
