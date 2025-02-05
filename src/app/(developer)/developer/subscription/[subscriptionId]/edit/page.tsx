"use client";

import DeveloperSideBar from "@/components/developer/developerSideBar";
import axios from "@/helpers/axios";
import { getSubscriptionById } from "@/libs/subscription";
import { ISubscription, ISubscriptionForm } from "@/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  category: Yup.string(),
  price: Yup.number().min(1, "Price must be greater than 0"),
  feature: Yup.string(),
});

export default function EditSubscription({
  params,
}: {
  params: { subscriptionId: number };
}) {
  const [subscription, setSubscription] = useState<ISubscriptionForm | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const subscription = await getSubscriptionById(params.subscriptionId);
        setSubscription(subscription);
      } catch (error) {
        console.log("Error get subscription:", error);
      } finally {
        setIsLoading(false);
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
        `/subscriptions/${params.subscriptionId}`,
        values,
      );

      toast.success(response.data.message);
      router.push("/developer/subscription");
      router.refresh();
    } catch (error) {
      console.log("Error edit subscription:", error);
      toast.error("Error edit subscription");
    }
  };

  if (isLoading) {
    return (
      <main className="flex">
        <DeveloperSideBar />
        <div className="w-4/5 border p-10">
          <h1 className="w-full text-3xl font-bold text-primary">Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-screen p-5 md:p-10">
        <h1 className="w-full text-3xl font-bold text-primary">
          Edit Subscription ID {params.subscriptionId}
        </h1>

        <div className="mt-5">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleEditSubscription}
          >
            {({ values }) => (
              <Form className="mt-5 flex w-full flex-col gap-5 rounded-lg border border-primary/20 p-5 shadow-md md:w-96">
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
                    className="mt-2 rounded-md border p-2"
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
