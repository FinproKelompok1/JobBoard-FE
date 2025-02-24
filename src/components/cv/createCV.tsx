"use client";

import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { ICvForm } from "@/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Award, BriefcaseIcon, GraduationCap, RadioTower } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import WorkExperienceForm from "./workExperienceForm";
import EducationForm from "./educationForm";

const initialValues: ICvForm = {
  summary: "",
  experience: "",
  skill: "",
  education: "",
};

const validationSchema = Yup.object({
  summary: Yup.string().required("Summary is required"),
  experience: Yup.string().required("Work Experience is required"),
  skill: Yup.string().required("Skills is required"),
  education: Yup.string().required("Education is required"),
});

export default function CreateCV({
  setIsCreating,
}: {
  setIsCreating: (value: boolean) => void;
}) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCreateCv = async (
    values: ICvForm,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      setIsSubmitting(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const { data } = await axios.post("/cv", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(data.message);
      resetForm();
      window.location.reload();
    } catch (error) {
      console.log("Error create CV:", error);
      toastErrAxios(error);
    } finally {
      setIsCreating(false);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreateCv}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <RadioTower className="h-4 w-4 text-[#0D3880]" />
                <label className="font-medium text-gray-700">Summary</label>
              </div>
              <Field
                name="summary"
                as="textarea"
                className="h-36 w-full rounded-lg border bg-gray-50 p-3 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
                placeholder="Please write a summary about yourself..."
              ></Field>
              <ErrorMessage
                name="summary"
                component={"div"}
                className="text-red-500"
              ></ErrorMessage>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <BriefcaseIcon className="h-4 w-4 text-[#E60278]" />
                <label className="font-medium text-gray-700">
                  Work Experience
                </label>
              </div>
              <WorkExperienceForm
                onSave={(formattedExperience) => {
                  setFieldValue("experience", formattedExperience);
                }}
              />
              <ErrorMessage
                name="experience"
                component={"div"}
                className="text-red-500"
              ></ErrorMessage>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-green-600" />
                <label className="font-medium text-gray-700">Education</label>
              </div>
              <EducationForm
                onSave={(formattedEducation) => {
                  setFieldValue("education", formattedEducation);
                }}
              />
              <ErrorMessage
                name="education"
                component={"div"}
                className="text-red-500"
              ></ErrorMessage>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-600" />
                <label className="font-medium text-gray-700">Skills</label>
              </div>
              <p className="text-sm text-gray-700">
                Format: Skill 1 , Skill 2 , Skill 3 , etc
              </p>
              <Field
                name="skill"
                as="textarea"
                className="h-36 w-full rounded-lg border bg-gray-50 p-3 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
                placeholder="Please write your skills..."
              ></Field>
              <p className="text-sm text-gray-700">
                Seperate each skill with commas (,)
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

            <div className="flex justify-end gap-5">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="rounded-lg border border-accent px-4 py-2 font-medium text-accent transition-all duration-300 ease-in-out hover:bg-accent hover:text-white"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isChecked}
                className="w-full rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/50 md:w-fit"
              >
                {isSubmitting ? "Creating..." : "Create CV"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
