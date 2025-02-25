import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import DateFormatter from "@/helpers/dateFormatter";
import { getUserTransaction } from "@/libs/transaction";
import Link from "next/link";

interface IUserTransaction {
  id: string;
  userId: number;
  subscription: {
    category: string;
  };
  amount: number;
  status: string;
  createdAt: string;
}

export default async function UserTransaction({
  params,
}: {
  params: { username: string };
}) {
  const userTransactions: IUserTransaction[] = await getUserTransaction(
    params.username,
  );

  console.log("user transaction:", userTransactions);

  return (
    <main className="min-h-screen md:bg-gray-50">
      <div className="mt-5 md:mt-10">
        <h1 className="w-full text-center text-3xl font-bold text-primary">
          My Transactions
        </h1>
      </div>

      <div className="flex items-center justify-center p-5">
        <div className="max-w-full overflow-x-auto rounded-xl border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary/90">
              <tr>
                <th className="table-head border-b border-r border-gray-300">
                  Transaction ID
                </th>
                <th className="table-head border-b border-r border-gray-300">
                  Subscription
                </th>
                <th className="table-head border-b border-r border-gray-300">
                  Amount
                </th>

                <th className="table-head border-b border-r border-gray-300">
                  Status
                </th>
                <th className="table-head border-b border-r border-gray-300">
                  Action
                </th>
                <th className="table-head border-b border-r border-gray-300">
                  Created At
                </th>
                <th className="table-head border-b border-gray-300">
                  Expired At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {userTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="table-data">{transaction.id}</td>
                  <td className="table-data font-medium">
                    {transaction.subscription.category === "professional"
                      ? "Professional"
                      : "Standard"}
                  </td>
                  <td className="table-data font-bold">
                    {CurrencyFormatter(transaction.amount)}
                  </td>
                  <td className="table-data">
                    <span
                      className={`rounded-full px-3 py-1 text-left text-sm font-medium tracking-wide ${transaction.status === "pending" ? "bg-yellow-200" : transaction.status === "settlement" ? "bg-green-200" : "bg-red-200"} `}
                    >
                      {transaction.status === "pending"
                        ? "Pending"
                        : transaction.status === "settlement"
                          ? "Settlement"
                          : "Cancel"}
                    </span>
                  </td>
                  <td className="table-data w-full">
                    <Link
                      href={`/transaction/${params.username}/${transaction.id}`}
                      className="rounded-md bg-accent px-3 py-1.5 font-medium text-white hover:bg-accent/80"
                    >
                      {transaction.status === "pending" ? "Pay" : "Detail"}
                    </Link>
                  </td>
                  <td className="table-data">
                    {DateFormatter(transaction.createdAt)}
                  </td>
                  <td className="table-data">
                    {DateFormatter(
                      new Date(
                        new Date(transaction.createdAt).getTime() +
                          24 * 60 * 60 * 1000,
                      ).toISOString(),
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
