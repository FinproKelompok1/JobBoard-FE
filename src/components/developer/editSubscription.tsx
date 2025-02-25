"use client";

import axios from "@/helpers/axios";
import { getSubscriptionById } from "@/libs/subscription";
import { ISubscriptionForm } from "@/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";

const validationSchema = Yup.object({
  category: Yup.string(),
  price: Yup.number().min(1, "Price must be greater than 0"),
  feature: Yup.string(),
});

export default function EditSubscription({
  subscriptionId,
}: {
  subscriptionId: number;
}) {
  const [subscription, setSubscription] = useState<ISubscriptionForm | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const subscription = await getSubscriptionById(subscriptionId);
        setSubscription(subscription);
      } catch (error) {
        console.log("Error get subscription:", error);
      } finally {
        setIsEditing(false);
      }
    };

    fetchSubscription();
  }, []);

  const initialValues: ISubscriptionForm = {
    category: subscription?.category || "",
    price: subscription?.price || 0,
    feature: subscription?.feature || "",
  };

  const handleEditSubscription = async (values: ISubscriptionForm) => {
    try {
      const response = await axios.patch(
        `/subscriptions/${subscriptionId}`,
        values,
      );

      toast.success(response.data.message);
      router.push("/developer/subscription");
      router.refresh();
    } catch  {
      toast.error("Error edit subscription");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 rounded-md border-2 border-accent py-2 text-center font-semibold tracking-wide text-accent transition-all duration-300 ease-in-out hover:bg-accent hover:text-white"
      >
        <FaEdit size={18} />
        Edit
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-xl rounded-lg bg-white p-5 shadow-lg">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold text-primary">
                Edit Subscription
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
              onSubmit={handleEditSubscription}
            >
              <Form className="mt-5 flex w-full flex-col gap-5">
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
                    <option value="standard" label="Standard" />
                    <option value="professional" label="Professional" />
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="text-red-500"
                  ></ErrorMessage>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="price" className="text-lg font-semibold">
                    Price (IDR){" "}
                    <span className="text-sm text-gray-500">for 30 days</span>
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
                    className="mt-2 h-40 rounded-md border border-gray-500 p-2"
                    placeholder="Please seperate feature with comma"
                  />
                  <ErrorMessage
                    name="feature"
                    component="p"
                    className="text-red-500"
                  />
                  <p className="text-gray-500">
                    If there are multiple features, separate with commas without
                    spaces.
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
                    Please check and confirm that all the inputs are correct.{" "}
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isEditing}
                    className="mt-2 rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed"
                  >
                    {isEditing ? "Editing..." : "Edit Subscription"}
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
