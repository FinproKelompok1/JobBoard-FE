import DeveloperSideBar from "@/components/developer/developerSideBar";
import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import { stringToArray } from "@/helpers/stringToArray";
import { getSubscriptions } from "@/libs/subscription";
import { ISubscription } from "@/types/types";
import Link from "next/link";

export default async function SubscriptionList() {
  const subscriptions: ISubscription[] = await getSubscriptions();

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-screen p-5 md:p-10">
        <h1 className="w-full text-3xl font-bold text-primary">
          Subscription List
        </h1>

        <div className="mt-5">
          {subscriptions.length === 0 ? (
            <div>
              <p className="text-xl text-primary">
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
                  className="flex min-h-80 w-full flex-col justify-between rounded-lg border border-primary/20 p-5 shadow-md md:w-80"
                >
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-baseline gap-2">
                      <h1 className="text-3xl font-bold text-accent">
                        {subscription.category === "professional"
                          ? "Professional"
                          : "Standard"}
                      </h1>
                      <p className="text-accent">ID: {subscription.id}</p>
                    </div>

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

                  <Link
                    href={`/developer/subscription/${subscription.id}`}
                    className="rounded-md border border-primary bg-primary py-2 text-center font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-primary/80"
                  >
                    Users
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
