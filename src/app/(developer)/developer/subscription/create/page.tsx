"use client";

import DeveloperSideBar from "@/components/developer/developerSideBar";
import axios from "@/helpers/axios";
import { ISubscriptionForm } from "@/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCreateSubscription = async (
    values: ISubscriptionForm,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/subscriptions", values);

      toast.success(data.message);
      resetForm();
      router.push("/developer/subscription");
      router.refresh();
    } catch (error) {
      console.log("Error create subscription:", error);
      toast.error("Error create subscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-screen p-5 md:p-10">
        <h1 className="text-primary text-3xl font-bold">Create Subscription</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateSubscription}
        >
          <Form className="border-primary/20 mt-5 flex w-full flex-col gap-5 rounded-lg border p-5 shadow-md md:w-96">
            <div className="flex flex-col">
              <label htmlFor="category" className="text-lg font-semibold">
                Category
              </label>
              <Field
                id="category"
                name="category"
                as="select"
                className="mt-2 rounded-md border p-2"
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
                className="mt-2 rounded-md border p-2"
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
                placeholder="Enter feature"
                className="mt-2 rounded-md border p-2"
              />
              <ErrorMessage
                name="feature"
                component="p"
                className="text-red-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                If there are multiple features, separate with commas without
                spaces.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-accent hover:bg-accent/80 mt-2 rounded-md px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Create Subscription"}
            </button>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
