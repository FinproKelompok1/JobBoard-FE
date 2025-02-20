"use client";

import axios from "@/helpers/axios";
import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import { stringToArray } from "@/helpers/stringToArray";
import { toastErrAxios } from "@/helpers/toast";
import { getSubscriptions } from "@/libs/subscription";
import { ISubscription } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Subscription() {
  const [isSubscribingId, setIsSubscribingId] = useState<number | null>(null);
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const subscriptions = await getSubscriptions();
        setSubscriptions(subscriptions);
      } catch (error) {
        console.log("Error get subscription:", error);
      }
    };

    fetchSubs();
  }, []);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const handleSubscribe = async (subscriptionId: number, amount: number) => {
    try {
      setIsSubscribingId(subscriptionId);
      const { data } = await axios.post(
        "/transactions",
        {
          subscriptionId,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
      router.push(`/transaction/${data.username}/${data.transactionId}`);
    } catch (error) {
      console.log("Error subscribe:", error);
      toastErrAxios(error);
    } finally {
      setIsSubscribingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex w-screen flex-col items-center p-5 md:p-10">
        <h1 className="w-full text-center text-3xl font-bold text-primary">
          Subscription Plan
        </h1>

        <div className="mt-5 flex flex-col items-start justify-center text-gray-700 md:items-center">
          <p className="text-left text-lg md:text-center md:text-xl">
            Take your career to the next level with the right plan!
          </p>
          <p className="text-left text-lg md:text-center md:text-xl">
            Unlock exclusive features for 30 days and gain a competitive edge.
          </p>
          <p className="mt-1 text-left text-lg font-semibold text-primary md:text-center md:text-xl">
            Get started today—your future awaits!{" "}
          </p>
        </div>

        <div className="my-10">
          <div className="flex flex-wrap gap-5">
            {subscriptions.map((subscription, index) => (
              <div
                key={index}
                className="flex min-h-[300px] w-full flex-col justify-between rounded-xl border bg-white p-5 shadow-md md:w-80"
              >
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-3xl font-bold text-accent">
                    {subscription.category === "professional"
                      ? "Professional"
                      : "Standard"}{" "}
                    Plan
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
                    onClick={() =>
                      handleSubscribe(subscription.id, subscription.price)
                    }
                    disabled={isSubscribingId === subscription.id}
                    className="rounded-md bg-accent py-2 text-center font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-accent/80 hover:text-white"
                  >
                    {isSubscribingId === subscription.id
                      ? "Subscribing..."
                      : "Subscribe"}
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
