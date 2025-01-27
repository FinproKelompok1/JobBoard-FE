import DeveloperSideBar from "@/components/developer/developerSideBar";
import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import { stringToArray } from "@/helpers/stringToArray";
import { getSubscriptions } from "@/libs/subscription";

type ISubscription = {
  id: number;
  category: string;
  price: number;
  feature: string;
};

export default async function SubscriptionList() {
  const subscriptions: ISubscription[] = await getSubscriptions();

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-screen p-5 md:p-10">
        <h1 className="text-primary w-full text-3xl font-bold">
          Subscription List
        </h1>

        <div className="mt-5">
          <div className="flex flex-wrap gap-5">
            {subscriptions.map((subscription, index) => (
              <div
                key={index}
                className="item-start border-primary/20 flex min-h-60 w-full flex-col gap-y-2 rounded-lg border p-5 shadow-md md:w-80"
              >
                <div className="flex items-baseline gap-2">
                  <h1 className="text-accent text-3xl font-bold">
                    {subscription.category === "professional"
                      ? "Professional"
                      : "Standard"}
                  </h1>
                  <p className="text-accent">ID: {subscription.id}</p>
                </div>

                <p className="text-primary text-xl font-medium">
                  {CurrencyFormatter(subscription.price)}{" "}
                  <span className="text-base font-normal">for 30 days</span>
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
