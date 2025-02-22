"use client";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { useState } from "react";
import axios from "@/helpers/axios";
import { toast } from "react-toastify";
import { toastErrAxios } from "@/helpers/toast";
import { IoClose } from "react-icons/io5";
import { IReviewForm } from "@/types/types";

const initialValues: IReviewForm = {
  review: "",
  CultureRating: 0,
  balanceRating: 0,
  facilityRating: 0,
  careerRating: 0,
  salary: 0,
};

const validationSchema = Yup.object({
  review: Yup.string().required("Review is required"),
  CultureRating: Yup.number()
    .min(1, "Culture rating is required")
    .max(5, "Culture rating is required")
    .required("Culture rating is required"),
  balanceRating: Yup.number()
    .min(1, "Work-life balance rating is required")
    .max(5, "Work-life balance rating is required")
    .required("Work-life balance rating is required"),
  facilityRating: Yup.number()
    .min(1, "Facility rating is required")
    .max(5, "Facility rating is required")
    .required("Facility rating is required"),
  careerRating: Yup.number()
    .min(1, "Career rating is required")
    .max(5, "Career rating is required")
    .required("Career rating is required"),
  salary: Yup.number()
    .min(1, "Salary salary must be greater than 0")
    .required("Salary is required"),
});

export default function CreateReview({ jobId }: { jobId: string }) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreateReview = async (
    values: IReviewForm,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      setIsSubmitting(true);
      const { data } = await axios.post(`/reviews/${jobId}`, values);
      toast.success(data.message);
      resetForm();
      setIsChecked(false);
      await window.location.reload();
    } catch (error) {
      toastErrAxios(error);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full whitespace-nowrap rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80"
      >
        Review
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-lg">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold text-primary">Submit Review</h1>
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
              onSubmit={handleCreateReview}
            >
              <Form className="mt-5 flex flex-col gap-5">
                <div className="flex flex-col">
                  <label htmlFor="review" className="text-lg font-semibold">
                    Review
                  </label>
                  <Field
                    name="review"
                    as="textarea"
                    className="mt-2 rounded-md border border-gray-300 p-2"
                    placeholder="Please enter review"
                  ></Field>
                  <ErrorMessage
                    name="review"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="CultureRating"
                    className="text-lg font-semibold"
                  >
                    Culture Rating
                  </label>
                  <Field name="CultureRating">
                    {({ field, form }: FieldProps) => (
                      <div className="flex items-baseline gap-3">
                        <p className="text-sm">Bad</p>
                        <div className="mt-2 flex gap-2">
                          {[1, 2, 3, 4, 5].map((number) => (
                            <button
                              key={number}
                              type="button"
                              onClick={() =>
                                form.setFieldValue("CultureRating", number)
                              }
                              className={`flex h-10 w-10 items-center justify-center rounded-md border transition-all duration-300 ease-in-out ${
                                field.value === number
                                  ? "bg-accent text-white"
                                  : "bg-gray-100 text-black hover:bg-accent hover:text-white"
                              }`}
                            >
                              {number}
                            </button>
                          ))}
                        </div>
                        <p className="text-sm">Good</p>
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="CultureRating"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="balanceRating"
                    className="text-lg font-semibold"
                  >
                    Work-Life Balance Rating
                  </label>
                  <Field name="balanceRating">
                    {({ field, form }: FieldProps) => (
                      <div className="flex items-baseline gap-3">
                        <p className="text-sm">Bad</p>
                        <div className="mt-2 flex gap-2">
                          {[1, 2, 3, 4, 5].map((number) => (
                            <button
                              key={number}
                              type="button"
                              onClick={() =>
                                form.setFieldValue("balanceRating", number)
                              }
                              className={`flex h-10 w-10 items-center justify-center rounded-md border transition-all duration-300 ease-in-out ${
                                field.value === number
                                  ? "bg-accent text-white"
                                  : "bg-gray-100 text-black hover:bg-accent hover:text-white"
                              }`}
                            >
                              {number}
                            </button>
                          ))}
                        </div>
                        <p className="text-sm">Good</p>
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="balanceRating"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="facilityRating"
                    className="text-lg font-semibold"
                  >
                    Facility Rating
                  </label>
                  <Field name="facilityRating">
                    {({ field, form }: FieldProps) => (
                      <div className="flex items-baseline gap-3">
                        <p className="text-sm">Bad</p>
                        <div className="mt-2 flex gap-2">
                          {[1, 2, 3, 4, 5].map((number) => (
                            <button
                              key={number}
                              type="button"
                              onClick={() =>
                                form.setFieldValue("facilityRating", number)
                              }
                              className={`flex h-10 w-10 items-center justify-center rounded-md border transition-all duration-300 ease-in-out ${
                                field.value === number
                                  ? "bg-accent text-white"
                                  : "bg-gray-100 text-black hover:bg-accent hover:text-white"
                              }`}
                            >
                              {number}
                            </button>
                          ))}
                        </div>
                        <p className="text-sm">Good</p>
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="facilityRating"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="careerRating"
                    className="text-lg font-semibold"
                  >
                    Career Rating
                  </label>
                  <Field name="careerRating">
                    {({ field, form }: FieldProps) => (
                      <div className="flex items-baseline gap-3">
                        <p className="text-sm">Bad</p>
                        <div className="mt-2 flex gap-2">
                          {[1, 2, 3, 4, 5].map((number) => (
                            <button
                              key={number}
                              type="button"
                              onClick={() =>
                                form.setFieldValue("careerRating", number)
                              }
                              className={`flex h-10 w-10 items-center justify-center rounded-md border transition-all duration-300 ease-in-out ${
                                field.value === number
                                  ? "bg-accent text-white"
                                  : "bg-gray-100 text-black hover:bg-accent hover:text-white"
                              }`}
                            >
                              {number}
                            </button>
                          ))}
                        </div>
                        <p className="text-sm">Good</p>
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="careerRating"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="salary" className="text-lg font-semibold">
                    Estimated or Actual Salary
                  </label>
                  <Field
                    name="salary"
                    as="input"
                    type="number"
                    className="mt-2 rounded-md border border-gray-300 p-2"
                    placeholder="Please enter your estimated or actual salary"
                  ></Field>
                  <ErrorMessage
                    name="salary"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mt-5 flex items-center">
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
                    disabled={isSubmitting || !isChecked}
                    className="rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/70"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
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
