"use client";

import axios from "@/helpers/axios";
import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import { stringToArray } from "@/helpers/stringToArray";
import { getSubscriptions } from "@/libs/subscription";
import { ISubscription } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  const [subscriptionPrice, setSubcriprionPrice] = useState<number | null>(
    null,
  );
  const router = useRouter();

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

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/transactions", {
        subscriptionId: subscriptionId,
        amount: subscriptionPrice,
      });

      toast.success(data.message);
      router.push(`/transaction/${data.transactionId}`);
    } catch (error) {
      console.log("Error subscribe:", error);
      toast.error("Error subscribe");
    }
  };

  return (
    <main className="flex">
      <div className="flex w-screen flex-col items-center p-5 md:p-10">
        <h1 className="w-full text-center text-3xl font-bold text-primary">
          Subscription List
        </h1>

        <div className="mt-5 flex flex-col items-start justify-center text-gray-700 md:items-center">
          <p className="text-left text-lg md:text-center md:text-xl">
            Take your career to the next level with the right plan!
          </p>
          <p className="mt-2 text-left text-lg md:text-center md:text-xl">
            Unlock exclusive features for 30 days and gain a competitive edge.
          </p>
          <p className="mt-3 text-left text-lg font-semibold md:text-center md:text-xl">
            Get started today—your future awaits!{" "}
          </p>
        </div>

        <div className="mt-7">
          <div className="flex flex-wrap gap-5">
            {subscriptions.map((subscription, index) => (
              <div
                key={index}
                className="flex min-h-[300px] w-full flex-col justify-between rounded-lg border border-primary/20 p-5 shadow-md md:w-80"
              >
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-3xl font-bold text-accent">
                    {subscription.category === "professional"
                      ? "Professional"
                      : "Standard"}
                  </h1>

                  <p className="text-2xl font-medium text-primary">
                    {CurrencyFormatter(subscription.price)}{" "}
                    <span className="text-base font-normal">for 30 days</span>
                  </p>
                  <div className="text-lg text-primary">
                    Features:
                    {stringToArray(subscription.feature).map(
                      (feature, index) => (
                        <ol key={index} className="pl-4 text-lg text-primary">
                          <li className="list-disc">{feature}</li>
                        </ol>
                      ),
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setSubscriptionId(subscription.id);
                      setSubcriprionPrice(subscription.price);
                      handleSubscribe();
                    }}
                    className="rounded-md bg-accent py-2 text-center font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-accent/80 hover:text-white"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
