"use client";

import DeveloperSideBar from "@/components/developer/developerSideBar";
import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import { stringToArray } from "@/helpers/stringToArray";
import { deleteSubscription, getSubscriptions } from "@/libs/subscription";
import { ISubscription } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditSubscription() {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const subscriptions = await getSubscriptions();
        setSubscriptions(subscriptions);
      } catch (error) {
        console.log("Error get subscription:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleDeleteSubscription = async () => {
    if (!subscriptionId) return;

    try {
      setIsDeleting(true);
      await deleteSubscription(subscriptionId);

      toast.success(`Subscription ID ${subscriptionId} deleted successfully`);
      setSubscriptions((prev) =>
        prev.filter((subscription) => subscription.id !== subscriptionId),
      );
    } catch (error) {
      console.log("Error delete subscription:", error);
      toast.error("Error delete subscription");
    } finally {
      setIsDeleting(false);
      setSubscriptionId(null);
    }
  };

  if (isLoading) {
    return (
      <main className="flex">
        <DeveloperSideBar />
        <div className="w-screen p-5 md:p-10">
          <h1 className="text-primary w-full text-3xl font-bold">Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-screen p-5 md:p-10">
        <h1 className="text-primary text-3xl font-bold">Edit Subscription</h1>

        <div className="mt-5">
          {subscriptions.length === 0 ? (
            <div>
              <p className="text-primary text-xl">
                There is no subscription package yet, please create a
                subscription{" "}
                <Link
                  href="/developer/subscription/create"
                  className="text-accent underline underline-offset-2"
                >
                  here
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-5">
              {subscriptions.map((subscription, index) => (
                <div
                  key={index}
                  className="border-primary/20 flex min-h-[360px] w-full flex-col justify-between rounded-lg border p-5 shadow-md md:w-80"
                >
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-baseline gap-2">
                      <h1 className="text-accent text-3xl font-bold">
                        {subscription.category === "professional"
                          ? "Professional"
                          : "Standard"}
                      </h1>
                      <p className="text-accent">ID: {subscription.id}</p>
                    </div>

                    <p className="text-primary text-2xl font-medium">
                      {CurrencyFormatter(subscription.price)}{" "}
                      <span className="text-base font-normal">for 30 days</span>
                    </p>
                    <div className="text-primary text-lg">
                      Features:
                      {stringToArray(subscription.feature).map(
                        (feature, index) => (
                          <ol key={index} className="text-primary pl-4 text-lg">
                            <li className="list-disc">{feature}</li>
                          </ol>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-3">
                    <Link
                      href={`/developer/subscription/edit/${subscription.id}`}
                      className="border-primary hover:bg-primary/80 bg-primary rounded-md border py-2 text-center font-semibold tracking-wide text-white transition-all duration-300 ease-in-out"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setSubscriptionId(subscription.id)}
                      className="rounded-md border border-red-600 py-2 text-center font-semibold tracking-wide text-red-500 transition-all duration-300 ease-in-out hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {subscriptionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[500px] rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-lg font-bold">
              Are you sure you want to delete subscription ID {subscriptionId} ?
            </h2>
            <div className="mt-4 flex flex-col justify-center gap-3">
              <button
                onClick={() => setSubscriptionId(null)}
                className="border-primary bg-primary hover:bg-primary/80 rounded-md border py-2 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out"
              >
                No, Cancel
              </button>
              <button
                onClick={handleDeleteSubscription}
                className="rounded-md border border-red-600 py-2 font-semibold tracking-wide text-red-500 transition-all duration-300 ease-in-out hover:bg-red-600 hover:text-white"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
