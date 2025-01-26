"use client";

import DeveloperSideBar from "@/components/developer/developerSideBar";
import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import { stringToArray } from "@/helpers/stringToArray";
import { getSubscriptions } from "@/libs/subscription";
import { useEffect, useState } from "react";

type Subscription = {
  category: string;
  price: number;
  feature: string;
};

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const subscriptions = await getSubscriptions();
        setSubscriptions(subscriptions);
      } catch (error) {
        console.log("Error get subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-4/5 border p-10">
        <h1 className="text-primary w-full text-3xl font-bold">
          Subscription List
        </h1>
        <div className="mt-5">
          <div className="flex flex-wrap gap-5">
            {subscriptions.map((subscription, index) => (
              <div
                key={index}
                className="item-start flex h-60 w-80 flex-col gap-y-2 rounded-md border p-5 shadow-md"
              >
                <h1 className="text-accent text-3xl font-bold">
                  {subscription.category === "professional"
                    ? "Professional"
                    : "Standard"}
                </h1>
                <p className="text-primary text-xl font-medium">
                  {CurrencyFormatter(subscription.price)} per month
                </p>
                <div className="text-primary text-lg">
                  Features:
                  {stringToArray(subscription.feature).map((feature, index) => (
                    <ol key={index} className="text-primary pl-4 text-lg">
                      <li className="list-disc">{feature}</li>
                    </ol>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
