"use client";

import DeveloperSideBar from "@/components/developer/developerSideBar";
import axios from "@/helpers/axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface ISubscription {
  category: string;
  price: number;
  feature: string;
}

export default function CreateSubscription() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: ISubscription = {
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

  const handleCreateSubscription = async (
    values: ISubscription,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/subscriptions", values);

      toast.success(data.message);
      resetForm();
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

      <div className="p-10">
        <h1 className="text-primary text-3xl font-bold">Create Subscription</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateSubscription}
        >
          <Form className="mt-5 flex w-96 flex-col gap-5 rounded-lg border p-5 shadow-md">
            <div className="flex flex-col">
              <label htmlFor="category" className="text-lg font-semibold">
                Category
              </label>
              <Field
                as="select"
                name="category"
                id="category"
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
                Price
              </label>
              <Field
                as="input"
                type="number"
                name="price"
                id="price"
                className="mt-2 rounded-md border p-2"
                placeholder="Please input subscription's price"
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
                as="input"
                name="feature"
                id="feature"
                className="mt-2 rounded-md border p-2"
                placeholder="Please seperate feature with comma"
              />
              <ErrorMessage
                name="feature"
                component="p"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-accent hover:bg-accent/80 mt-5 rounded-md px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Create Subscription"}
            </button>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
