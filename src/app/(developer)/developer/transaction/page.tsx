import DeveloperSideBar from "@/components/developer/developerSideBar";
import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import { getTransactions } from "@/libs/transaction";

interface ITransaction {
  id: string;
  userId: number;
  subscriptionId: number;
  amount: number;
  status: string;
  createdAt: string;
}

export default async function TransactionList() {
  const transactions: ITransaction[] = await getTransactions();

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-screen p-5 md:p-10">
        <h1 className="text-primary text-3xl font-bold">Transaction List</h1>

        <div className="mt-5 w-full overflow-x-auto rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-primary/10">
              <tr>
                <th className="table-head border border-gray-300">
                  Transaction_ID
                </th>
                <th className="table-head border border-gray-300">User_ID</th>
                <th className="table-head border border-gray-300">
                  Subscription_ID
                </th>
                <th className="table-head border border-gray-300">Amount</th>
                <th className="table-head border border-gray-300">Status</th>
                <th className="table-head border border-gray-300">
                  Created_At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="text-primary whitespace-nowrap border border-gray-300 px-6 py-4 text-left text-sm">
                    {transaction.id}
                  </td>
                  <td className="text-primary whitespace-nowrap border border-gray-300 px-6 py-4 text-left text-sm">
                    {transaction.userId}
                  </td>
                  <td className="text-primary whitespace-nowrap border border-gray-300 px-6 py-4 text-left text-sm">
                    {transaction.subscriptionId}
                  </td>
                  <td className="text-primary whitespace-nowrap border border-gray-300 px-6 py-4 text-left text-sm">
                    {CurrencyFormatter(transaction.amount)}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    <span
                      className={`${transaction.status === "pending" ? "bg-yellow-500" : transaction.status === "settlement" ? "bg-green-500" : "bg-red-500"} rounded-lg px-3 py-2 text-left text-sm font-semibold text-white`}
                    >
                      {transaction.status === "pending"
                        ? "Pending"
                        : transaction.status === "settlement"
                          ? "Settlement"
                          : "Cancel"}
                    </span>
                  </td>
                  <td className="text-primary whitespace-nowrap border border-gray-300 px-6 py-4 text-sm">
                    {transaction.createdAt}
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
