"use client";

import DeveloperSideBar from "@/components/developer/developerSideBar";
import axios from "@/helpers/axios";
import { getSubscriptionById } from "@/libs/subscription";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface ISubscription {
  category: string;
  price: number;
  feature: string;
}

const validationSchema = Yup.object({
  category: Yup.string(),
  price: Yup.number().min(1, "Price must be greater than 0"),
  feature: Yup.string(),
});

export default function EditSubscriptionDetail({
  params,
}: {
  params: { id: number };
}) {
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const subscription = await getSubscriptionById(params.id);
        setSubscription(subscription);
      } catch (error) {
        console.log("Error get subscription:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [params.id]);

  const initialValues: ISubscription = {
    category: subscription?.category || "",
    price: subscription?.price || 0,
    feature: subscription?.feature || "",
  };

  const handleEditSubscription = async (values: ISubscription) => {
    try {
      const response = await axios.patch(`/subscriptions/${params.id}`, values);

      toast.success(response.data.message);
      router.push("/developer/subscription");
      router.refresh;
    } catch (error) {
      console.log("Error edit subscription:", error);
      toast.error("Error edit subscription");
    }
  };

  console.log("subscription", subscription);

  if (isLoading) {
    return (
      <main className="flex">
        <DeveloperSideBar />
        <div className="w-4/5 border p-10">
          <h1 className="text-primary w-full text-3xl font-bold">Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-screen p-5 md:p-10">
        <h1 className="text-primary w-full text-3xl font-bold">
          Edit Subscription ID {params.id}
        </h1>

        <div className="mt-5">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleEditSubscription}
          >
            {({ values }) => (
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
                    as="input"
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
                  className="bg-accent hover:bg-accent/80 mt-2 rounded-md px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out disabled:cursor-not-allowed"
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
