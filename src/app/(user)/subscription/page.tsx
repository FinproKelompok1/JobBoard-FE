import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import { stringToArray } from "@/helpers/stringToArray";
import { getSubscriptions } from "@/libs/subscription";
import { ISubscription } from "@/types/types";
import Link from "next/link";

export default async function SubscriptionPage() {
  const subscriptions: ISubscription[] = await getSubscriptions();

  return (
    <main className="flex">
      <div className="flex w-screen flex-col items-center p-5 md:p-10">
        <h1 className="w-full text-center text-3xl font-bold text-primary">
          Subscription List
        </h1>

        <div className="mt-5 flex flex-col items-start justify-center text-gray-700 md:items-center">
          <p className="text-left text-xl md:text-center">
            Boost your career with the right subscription!
          </p>
          <p className="mt-2 text-left text-lg md:text-center">
            Choose a plan and unlock 30 days of powerful tools. Get features
            tailored for success.
          </p>
          <p className="mt-3 text-left text-xl font-semibold md:text-center">
            Subscribe now and level up!
          </p>
        </div>

        <div className="mt-7">
          <div className="flex flex-wrap gap-5">
            {subscriptions.map((subscription, index) => (
              <div
                key={index}
                className="flex h-[300px] w-full flex-col justify-between rounded-lg border border-primary/20 p-5 shadow-md md:w-80"
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
                  <Link
                    href={`/subscription/${subscription.id}`}
                    className="rounded-md bg-accent py-2 text-center font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-accent/80 hover:text-white"
                  >
                    Subscribe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
