"use client";

import CreateReview from "@/components/review/createReview";
import StarRating from "@/components/review/starRating";
import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import { getUserProfile } from "@/libs/auth";
import { UserProfile } from "@/types/profile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CompanyReview() {
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await getUserProfile();
        setUserData(data);
      } catch (error) {
        console.error("Failed get user data", error);
      }
    };

    fetchUserData();
  }, []);

  const acceptedJobs = userData?.JobApplication.filter(
    (job) => job.status === "accepted",
  );

  const userReview = userData?.Review;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center p-5">
        <h1 className="w-full text-center text-3xl font-bold text-primary">
          Company Review
        </h1>
        <p className="mt-3 text-center text-lg font-medium md:text-start">
          Please provide a review for the company you work for.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-5 shadow-lg md:w-[450px]">
          {acceptedJobs?.map((data, index) => {
            return (
              <div key={index} className="flex flex-col justify-between gap-3">
                <h1 className="text-2xl font-bold">
                  Company: {data.job.admin.companyName}
                </h1>
                {userReview?.length === 0 ? (
                  <div>
                    <p className="mb-2 text-lg font-medium">
                      Review as {data.job.title} at this company
                    </p>
                    <CreateReview jobId={data.jobId} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-semibold text-accent">
                      You have reviewed this company
                    </p>
                    <Link
                      href={`/review/company/${data.job.admin.id}`}
                      className="font-medium text-accent underline"
                    >
                      View company reviews
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
          <div className="mt-3">
            {userReview?.map((data, index) => {
              return (
                <div key={index} className="flex flex-col gap-3">
                  <p className="text-xl font-medium">"{data.review}"</p>
                  <div className="space-y-1">
                    <div className="flex justify-between border-b">
                      <p className="font-medium">Culture rating</p>
                      <StarRating rating={data.CultureRating} />
                    </div>
                    <div className="flex justify-between border-b">
                      <p className="font-medium">Work-life balance rating</p>
                      <StarRating rating={data.balanceRating} />
                    </div>
                    <div className="flex justify-between border-b">
                      <p className="font-medium">Career rating</p>
                      <StarRating rating={data.careerRating} />
                    </div>
                    <div className="flex justify-between border-b">
                      <p className="font-medium">Facility rating</p>
                      <StarRating rating={data.facilityRating} />{" "}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Estimated salary</p>
                    <p className="font-semibold">
                      {CurrencyFormatter(data.salary)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
