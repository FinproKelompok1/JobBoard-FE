"use client";

import LoadingPage from "@/components/loading";
import { toastErrAxios } from "@/helpers/toast";
import { getUserProfile } from "@/libs/auth";
import { UserProfile } from "@/types/profile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessTransaction() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data } = await getUserProfile();
      setUser(data);
    } catch (error) {
      toastErrAxios(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchUserProfile();
    }
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-5 text-center md:p-10">
      <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <svg
          className="mx-auto mb-4 h-16 w-16 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800">
          Transaction Successful!
        </h1>
        <p className="mt-2 text-gray-600">
          Thank you for your transaction. You can now enjoy special features.
        </p>
        <Link
          href={`/subscription/${user?.username}`}
          className="mt-6 inline-block rounded-lg bg-accent px-6 py-2 font-medium text-white transition hover:bg-accent/80"
        >
          Go to My Subscription
        </Link>
      </div>
    </main>
  );
}
