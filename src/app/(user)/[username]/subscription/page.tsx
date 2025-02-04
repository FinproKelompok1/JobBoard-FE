"use client";

import DateFormatter from "@/helpers/dateFormatter";
import { getUserSubscription } from "@/libs/userSubscription";
import { IUserSubscription } from "@/types/types";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/helpers/axios";
import { toast } from "react-toastify";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function UserSubscription({
  params,
}: {
  params: { username: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSubscription, setUserSubscription] = useState<
    IUserSubscription[] | null
  >(null);

  useEffect(() => {
    const fetchUserSubscription = async () => {
      const data = await getUserSubscription(params.username);
      setUserSubscription(data);
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
    <main>
      <div className="flex flex-col items-center justify-center p-5 md:p-10">
        <h1 className="w-full text-center text-3xl font-bold text-primary">
          My Subscription
        </h1>

        {userSubscription &&
          userSubscription.map((item, index) => {
            const endDate = dayjs(item.endDate);
            const dayBeforeEndDate = endDate.subtract(1, "day").startOf("day");

            const isRenew =
              today.isSameOrAfter(dayBeforeEndDate) &&
              today.isSameOrBefore(endDate);

            return (
              <div
                key={index}
                className="mt-10 w-96 rounded-lg border border-gray-200 p-5 shadow-lg"
              >
                <div className="flex items-center justify-between gap-5">
                  <h1 className="text-3xl font-bold text-primary">
                    {item.subscription?.category === "professional"
                      ? "Professional"
                      : "Standard"}
                  </h1>
                  <p
                    className={`${item.isActive ? "bg-green-500" : "bg-red-500"} w-fit rounded-lg px-2 py-1 font-medium tracking-wide text-white`}
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
                    Skill Assessment remaining:{" "}
                    {item.subscription.category === "professional" ? (
                      <span className="font-medium text-accent">Unlimited</span>
                    ) : (
                      `${2 - Number(item.assessmentCount)}`
                    )}
                  </p>
                  {item.subscription.category === "standard" &&
                    Number(item.assessmentCount) >= 2 && (
                      <p className="text-sm text-red-500">
                        You've reached the maximum Skill Assessment attempts.
                      </p>
                    )}
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <button
                    onClick={() => router.push("/assessment")}
                    disabled={
                      item.subscription.category === "standard" &&
                      Number(item.assessmentCount) >= 2
                    }
                    className={`rounded-md py-2 text-center font-medium transition duration-300 ease-in-out ${
                      item.subscription.category === "standard" &&
                      Number(item.assessmentCount) >= 2
                        ? "cursor-not-allowed bg-primary/50 text-white"
                        : "border border-primary text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    Take Skill Assessment
                  </button>

                  <button
                    onClick={() => router.push("/cv")}
                    className="rounded-md border border-primary py-2 text-center font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-white"
                  >
                    Create Professional CV
                  </button>

                  {isRenew && (
                    <button
                      onClick={() => handleSubscribe()}
                      disabled={isLoading}
                      className="rounded-md border border-accent bg-accent py-2 text-center font-medium text-white transition duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/80"
                    >
                      {isLoading ? "Loading..." : "Renew Subscription"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
