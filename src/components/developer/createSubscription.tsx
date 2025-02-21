"use client";

import axios from "@/helpers/axios";
import { ISubscriptionForm } from "@/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FaPlus } from "react-icons/fa";
import { toastErrAxios } from "@/helpers/toast";

const initialValues: ISubscriptionForm = {
  category: "",
  price: 0,
  feature: "",
};

const validationSchema = Yup.object({
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be greater than 0"),
  feature: Yup.string().required("Feature is required"),
});

export default function CreateSubscription() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleCreateSubscription = async (
    values: ISubscriptionForm,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      setIsCreating(true);
      const { data } = await axios.post("/subscriptions", values);

      toast.success(data.message);
      resetForm();
      router.refresh();
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
        className="flex items-center gap-2 whitespace-nowrap rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80"
      >
        <FaPlus size={18} />
        Create Subscription
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-lg">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold text-primary">
                Create Subscription
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
              onSubmit={handleCreateSubscription}
            >
              <Form className="mt-5 flex flex-col gap-5">
                <div className="flex flex-col">
                  <label htmlFor="category" className="text-lg font-semibold">
                    Category
                  </label>
                  <Field
                    id="category"
                    name="category"
                    as="select"
                    className="mt-2 rounded-md border border-gray-500 p-2"
                  >
                    <option value="" label="Select Category" />
                    <option value="standard" label="Standard" />
                    <option value="professional" label="Professional" />
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="price" className="text-lg font-semibold">
                    Price (IDR){" "}
                    <span className="text-sm font-medium text-gray-500">
                      for 30 days
                    </span>
                  </label>
                  <Field
                    id="price"
                    name="price"
                    as="input"
                    type="number"
                    className="mt-2 rounded-md border border-gray-500 p-2"
                  />
                  <ErrorMessage
                    name="price"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="feature" className="text-lg font-semibold">
                    Feature
                  </label>
                  <Field
                    id="feature"
                    name="feature"
                    as="textarea"
                    placeholder="Enter subscription features"
                    className="mt-2 h-32 rounded-md border border-gray-500 p-2"
                  />
                  <ErrorMessage
                    name="feature"
                    component="p"
                    className="text-red-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate multiple features with commas (,)
                  </p>
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
                    Confirm that all inputs are correct.
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-md border border-gray-500 px-4 py-2 font-semibold text-gray-600 transition-all duration-300 ease-in-out hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating || !isChecked}
                    className="rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/80"
                  >
                    {isCreating ? "Creating..." : "Create Subscription"}
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
