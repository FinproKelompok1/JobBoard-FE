"use client";

import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import DateFormatter from "@/helpers/dateFormatter";
import { getUserProfile } from "@/libs/auth";
import { getUserTransaction } from "@/libs/transaction";
import { UserProfile } from "@/types/profile";
import { IUserTransaction } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";

export default function UserTransaction() {
  const [userTransactions, setUserTransactions] = useState<IUserTransaction[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortCreateAt, setSortCreateAt] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);

  const fetchUserProfile = async () => {
    try {
      const { data } = await getUserProfile();
      setUser(data);
    } catch {
      console.error("Error fetch user profile");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    async function fetchTransactions() {
      const { userTransactions, totalPages } = await getUserTransaction({
        page,
        status: statusFilter,
        order: sortCreateAt,
      });
      setUserTransactions(userTransactions);
      setTotalPages(totalPages);
    }

    fetchTransactions();
  }, [page, statusFilter, sortCreateAt]);

  const filteredTransactions = statusFilter
    ? userTransactions.filter(
        (transaction) => transaction.status === statusFilter,
      )
    : userTransactions;

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    return sortCreateAt === "asc"
      ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <main className="min-h-screen md:bg-gray-50">
      <div className="mt-5 md:mt-10">
        <h1 className="w-full text-center text-3xl font-bold text-primary">
          My Transactions
        </h1>
      </div>

      <div className="flex items-center justify-center gap-5">
        <div className="mt-5 flex items-center gap-2">
          <label htmlFor="status-filter" className="font-medium">
            Filter by status:
          </label>
          <select
            id="status-filter"
            className="rounded-md border border-gray-300 px-2 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="settlement">Settlement</option>
            <option value="cancel">Cancel</option>
          </select>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <label htmlFor="date-sorting" className="font-medium">
            Sort by date:
          </label>
          <select
            id="status-filter"
            className="rounded-md border border-gray-300 px-2 py-1"
            value={sortCreateAt}
            onChange={() =>
              setSortCreateAt(sortCreateAt === "asc" ? "desc" : "asc")
            }
          >
            <option value="asc">Oldest</option>
            <option value="desc">Newest</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-5">
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
                  <button
                    onClick={() =>
                      setSortCreateAt(sortCreateAt === "asc" ? "desc" : "asc")
                    }
                    className="flex items-center gap-2"
                  >
                    Created At{" "}
                    <span className="hover:text-accent">
                      {sortCreateAt === "asc" ? (
                        <FaSortAlphaDown className="size-5" />
                      ) : (
                        <FaSortAlphaDownAlt className="size-5" />
                      )}
                    </span>
                  </button>
                </th>
                <th className="table-head border-b border-gray-300">
                  Expired At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sortedTransactions.map((transaction, index) => (
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
                      href={`/transaction/${user?.username}/${transaction.id}`}
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
        <div className="mt-4 flex w-96 items-center justify-between">
          <button
            className={`rounded-lg px-4 py-2 font-medium ${
              page <= 1
                ? "cursor-not-allowed border border-accent text-accent"
                : "bg-accent text-white hover:bg-accent/80"
            }`}
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <p className="font-medium tracking-wide">
            Page {page} of {totalPages}
          </p>
          <button
            className={`rounded-lg px-4 py-2 font-medium ${
              page >= totalPages
                ? "cursor-not-allowed border border-accent text-accent"
                : "bg-accent text-white hover:bg-accent/80"
            }`}
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
