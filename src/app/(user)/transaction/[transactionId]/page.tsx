"use client";

import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import DateFormatter from "@/helpers/dateFormatter";
import { getTransactionsById, getTransactionToken } from "@/libs/transaction";
import { ITransaction } from "@/types/types";
import { useEffect, useState } from "react";

export default function TransactionDetail({
  params,
}: {
  params: { transactionId: string };
}) {
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const transaction = await getTransactionsById(params.transactionId);
        setTransaction(transaction);

        if (transaction?.status !== "settlement") {
          const expirationTime =
            new Date(transaction.createdAt).getTime() + 24 * 60 * 60 * 1000;
          const updateCountdown = () => {
            const now = new Date().getTime();
            const remainingTime = expirationTime - now;

            if (remainingTime > 0) {
              const hours = Math.floor(remainingTime / (1000 * 60 * 60));
              const minutes = Math.floor(
                (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
              );
              const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
              setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
            } else {
              setTimeLeft("Expired");
            }
          };

          updateCountdown();
          const interval = setInterval(updateCountdown, 1000);

          return () => clearInterval(interval);
        }
      } catch (error) {
        console.log("Error get transaction:", error);
      }
    };

    fetchTransaction();
  }, []);

  const handlePaySubscribe = async () => {
    try {
      setIsLoading(true);
      const transactionToken = await getTransactionToken(
        transaction?.id!,
        transaction?.amount!,
      );
      if (transactionToken) {
        window.snap.pay(transactionToken);
      }
    } catch (error) {
      console.log("Error get transaction token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex w-screen flex-col items-center p-5 md:p-10">
        <h1 className="w-full text-center text-3xl font-bold text-primary">
          Transaction Detail
        </h1>{" "}
        {transaction && (
          <div className="mt-5 w-screen overflow-x-auto rounded-xl border bg-white p-5 shadow-lg sm:w-fit">
            <table>
              <tbody>
                <tr>
                  <th className="pr-2 text-left">Created At</th>
                  <td>: {DateFormatter(transaction.createdAt)}</td>
                </tr>
                <tr>
                  <th className="pr-2 text-left">Transaction ID</th>
                  <td>: {transaction.id}</td>
                </tr>
                <tr>
                  <th className="pr-2 text-left">User Email</th>
                  <td>: {transaction.user.email}</td>
                </tr>
                <tr>
                  <th className="pr-2 text-left">Subscription</th>
                  <td className="font-semibold">
                    {transaction.subscription.category === "professional"
                      ? ": Professional"
                      : ": Standard"}{" "}
                    Plan
                  </td>
                </tr>
                <tr>
                  <th className="pr-2 text-left">Status</th>
                  <td
                    className={`font-bold ${
                      transaction.status === "pending"
                        ? "font-bold text-yellow-500"
                        : transaction.status === "settlement"
                          ? "text-green-600"
                          : "text-red-500"
                    }`}
                  >
                    {" "}
                    {transaction.status === "pending"
                      ? ": Unpaid"
                      : transaction.status === "settlement"
                        ? ": Paid"
                        : ": Canceled"}
                  </td>
                </tr>
                <tr>
                  <th className="pr-2 text-left">Price</th>
                  <td className="font-bold">
                    : {CurrencyFormatter(transaction.amount)}
                  </td>
                </tr>
              </tbody>
            </table>

            {transaction.status !== "settlement" && timeLeft && (
              <div className="mt-5 text-center font-medium text-red-500">
                {timeLeft === "Expired"
                  ? "Transaction expired"
                  : `Expires in: ${timeLeft}`}
              </div>
            )}
            {transaction.status !== "settlement" && timeLeft !== "Expired" && (
              <button
                onClick={handlePaySubscribe}
                disabled={isLoading}
                className="mt-1 w-full rounded-md bg-accent px-4 py-2 text-center font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-accent/80 hover:text-white disabled:cursor-not-allowed disabled:bg-accent/70"
              >
                {isLoading ? "Loading..." : "Pay Subscription"}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
