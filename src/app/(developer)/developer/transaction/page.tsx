import DeveloperSideBar from "@/components/developer/developerSideBar";
import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import DateFormatter from "@/helpers/dateFormatter";
import { getTransactions } from "@/libs/transaction";
import { ITransaction } from "@/types/types";

export default async function TransactionList() {
  const transactions: ITransaction[] = await getTransactions();

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-full overflow-x-auto p-5 md:p-10">
        <h1 className="border-b border-gray-500 pb-5 text-3xl font-bold text-primary">
          Transaction List
        </h1>

        <div className="mt-10 max-w-full overflow-x-auto rounded-lg border border-gray-500">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary/10">
              <tr>
                <th className="table-head border-b border-r border-gray-300">
                  Transaction ID
                </th>
                <th className="table-head border-b border-r border-gray-300">
                  User Email
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
                  Created At
                </th>
                <th className="table-head border-b border-gray-300">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="table-data">{transaction.id}</td>
                  <td className="table-data">{transaction.user.email}</td>
                  <td className="table-data">
                    {transaction.subscription.category === "professional"
                      ? "Professional"
                      : "Standard"}
                  </td>
                  <td className="table-data">
                    {CurrencyFormatter(transaction.amount)}
                  </td>
                  <td className="border-r px-4 py-2">
                    <span
                      className={`rounded-full px-3 py-1 text-left text-sm tracking-wide text-primary ${transaction.status === "pending" ? "bg-yellow-200" : transaction.status === "settlement" ? "bg-green-200" : "bg-red-200"} `}
                    >
                      {transaction.status === "pending"
                        ? "Pending"
                        : transaction.status === "settlement"
                          ? "Settlement"
                          : "Cancel"}
                    </span>
                  </td>
                  <td className="table-data">
                    {DateFormatter(transaction.createdAt)}
                  </td>
                  <td className="table-data">
                    {DateFormatter(transaction.updatedAt)}
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
