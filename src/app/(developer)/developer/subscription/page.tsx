import CreateSubscription from "@/components/developer/createSubscription";
import DeleteSubscription from "@/components/developer/deleteSubscription";
import DeveloperSideBar from "@/components/developer/developerSideBar";
import EditSubscription from "@/components/developer/editSubscription";
import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import { stringToArray } from "@/helpers/stringToArray";
import { getSubscriptions } from "@/libs/subscription";
import { ISubscription } from "@/types/types";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";

export default async function Subscription() {
  const subscriptions: ISubscription[] = await getSubscriptions();

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-screen p-5 md:bg-gray-50 md:p-10">
        <div className="flex flex-col gap-2 border-b border-gray-300 pb-5 md:flex-row md:items-center md:justify-between">
          <h1 className="w-full text-3xl font-bold text-primary">
            Subscription Plan
          </h1>
          <div>
            <CreateSubscription />
          </div>
        </div>

        <div className="mt-10">
          {subscriptions.length === 0 ? (
            <div>
              <p className="text-xl text-primary">
                There is no Subscription Plan yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-5">
              {subscriptions.map((subscription, index) => {
                const activeUserCount = subscription.UserSubscription
                  ? subscription.UserSubscription.filter(
                      (user) => user.isActive,
                    ).length
                  : 0;

                return (
                  <div
                    key={index}
                    className="flex min-h-80 w-full flex-col justify-between rounded-xl border border-gray-300 bg-white p-5 shadow-md md:w-80"
                  >
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-baseline gap-2">
                        <h1 className="text-3xl font-bold text-primary">
                          {subscription.category === "professional"
                            ? "Professional"
                            : "Standard"}
                        </h1>
                        <p className="text-primary">ID: {subscription.id}</p>
                      </div>

                      <p className="text-xl font-medium">
                        {CurrencyFormatter(subscription.price)}{" "}
                        <span className="text-base font-normal">
                          for 30 days
                        </span>
                      </p>
                      <p className="text-xl font-medium">
                        Active users: {activeUserCount}
                      </p>
                      <div className="text-lg">
                        Features:
                        {stringToArray(subscription.feature).map(
                          (feature, index) => (
                            <ol key={index} className="pl-4 text-lg">
                              <li className="list-disc">{feature}</li>
                            </ol>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="mt-5 flex flex-col gap-2.5">
                      <Link
                        href={`/developer/subscription/${subscription.id}/users`}
                        className="flex items-center justify-center gap-2 rounded-md border-2 border-accent bg-accent py-2 text-center font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-accent/80"
                      >
                        <FaUsers size={20} />
                        Users
                      </Link>
                      <EditSubscription subscriptionId={subscription.id} />
                      <DeleteSubscription subscriptionId={subscription.id} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
