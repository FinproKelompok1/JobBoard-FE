"use client";

import DateFormatter from "@/helpers/dateFormatter";
import { IUserSubscription } from "@/types/types";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/helpers/axios";
import { toast } from "react-toastify";
import { getUserSubscription } from "@/libs/subscription";
import Link from "next/link";
import LoadingPage from "@/components/loading";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function UserSubscription({
  params,
}: {
  params: { username: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [userSubscription, setUserSubscription] = useState<IUserSubscription[]>(
    [],
  );

  useEffect(() => {
    const fetchUserSubscription = async () => {
      setIsFetching(true);
      try {
        const data = await getUserSubscription(params.username);
        setUserSubscription(data);
      } catch (error) {
        console.error("Error fetching user subscription:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchUserSubscription();
  }, [params.username]);

  const today = dayjs();

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/transactions", {
        subscriptionId: userSubscription && userSubscription[0].subscriptionId,
        amount: userSubscription && userSubscription[0].subscription.price,
      });

      toast.success(data.message);
      router.push(`/transaction/${data.transactionId}`);
    } catch (error) {
      console.log("Error renew subscription:", error);
      toast.error("Error renew subscription");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center p-5 md:p-10">
        <h1 className="w-full pb-5 text-center text-3xl font-bold text-primary">
          My Subscription
        </h1>

        {isFetching ? (
          <LoadingPage />
        ) : !userSubscription ? (
          <p className="text-lg font-medium">
            You don't have a subscription yet. Please go to the{" "}
            <span className="text-accent">
              <Link href={"/subscription"}>subscription page</Link>
            </span>{" "}
            to start a subscription.
          </p>
        ) : (
          userSubscription.map((item, index) => {
            const endDate = dayjs(item.endDate);
            const dayBeforeEndDate = endDate.subtract(1, "day").startOf("day");

            const isRenew =
              today.isSameOrAfter(dayBeforeEndDate) &&
              today.isSameOrBefore(endDate);

            return (
              <div
                key={index}
                className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-lg md:w-[400px] md:border"
              >
                <div className="flex items-center justify-between gap-5">
                  <h1 className="text-2xl font-bold text-primary">
                    {item.subscription?.category === "professional"
                      ? "Professional"
                      : "Standard"}{" "}
                    Plan
                  </h1>
                  <p
                    className={`${item.isActive ? "bg-green-500" : "bg-red-500"} w-fit rounded-lg px-2 py-1 font-semibold tracking-wide text-white`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </p>
                </div>

                <p className="mt-5 font-medium">
                  Ends on{"  "}
                  <span className="font-bold">
                    {DateFormatter(item.endDate)}
                  </span>
                </p>

                <div className="mt-2">
                  <p className="">
                    Skill Assessment Attempts Remaining:{" "}
                    {item.subscription.category === "professional" ? (
                      <span className="font-medium text-accent">Unlimited</span>
                    ) : (
                      <span className="font-semibold">
                        {2 - Number(item.assessmentCount)}
                      </span>
                    )}
                  </p>
                  {item.subscription.category === "standard" &&
                    Number(item.assessmentCount) >= 2 && (
                      <>
                        <p className="text-sm text-red-500">
                          You have used all available Skill Assessment attempts.
                        </p>
                        <p className="text-sm text-red-500">
                          Please Upgrade to the{" "}
                          <span className="font-semibold">Professional</span>{" "}
                          plan for unlimited access.
                        </p>
                      </>
                    )}
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  {item.isActive ? (
                    <>
                      <button
                        onClick={() => router.push(`/assessment`)}
                        disabled={
                          item.subscription.category === "standard" &&
                          Number(item.assessmentCount) >= 2
                        }
                        className={`rounded-md py-2 text-center font-medium transition duration-300 ease-in-out ${
                          item.subscription.category === "standard" &&
                          Number(item.assessmentCount) >= 2
                            ? "cursor-not-allowed bg-accent/50 text-white"
                            : "bg-accent text-white hover:bg-accent/80"
                        }`}
                      >
                        Take Skill Assessment
                      </button>

                      <button
                        onClick={() => router.push(`/cv/${params.username}`)}
                        className="rounded-md bg-accent py-2 text-center font-medium text-white transition duration-300 ease-in-out hover:bg-accent/80"
                      >
                        Generate Curriculum Vitae
                      </button>

                      {isRenew && (
                        <div className="w-full">
                          <p className="mb-0.5 text-center text-sm font-medium text-accent">
                            Your subscription almost expires
                          </p>
                          <button
                            onClick={() => handleSubscribe()}
                            disabled={isLoading}
                            className="w-full rounded-md bg-primary py-2 text-center font-medium text-white transition duration-300 ease-in-out hover:bg-primary/80 disabled:cursor-not-allowed disabled:bg-primary/80"
                          >
                            {isLoading ? "Renewing..." : "Renew Subscription"}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleSubscribe()}
                      disabled={isLoading}
                      className="rounded-md bg-accent py-2 text-center font-medium text-white transition duration-300 ease-in-out hover:bg-accent disabled:cursor-not-allowed disabled:bg-red-300"
                    >
                      {isLoading
                        ? "Activating..."
                        : "Activate Your Subscription"}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
