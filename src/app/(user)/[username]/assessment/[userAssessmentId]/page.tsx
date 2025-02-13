"use client";

import DateFormatter from "@/helpers/dateFormatter";
import { getUserAssessmentById } from "@/libs/assessment";
import { IUserAssessment } from "@/types/types";
import { useEffect, useState } from "react";

export default function UserAssessment({
  params,
}: {
  params: { userAssessmentId: number };
}) {
  const [userAssessment, setUserAssessment] = useState<IUserAssessment | null>(
    null,
  );
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const fetchUserAssessment = async () => {
      try {
        const userAssessment = await getUserAssessmentById(
          params.userAssessmentId,
        );
        setUserAssessment(userAssessment);
      } catch (error) {
        console.error("Error get user assessment by ID:", error);
      }
    };

    fetchUserAssessment();
  }, []);

  useEffect(() => {
    if (!userAssessment) return;

    const endTime = new Date(userAssessment.endTime).getTime();

    const updateCountDown = () => {
      const now = new Date().getTime();
      const different = endTime - now;

      if (different <= 0) {
        setTimeLeft("Time's up!");
        return;
      }

      const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((different % (1000 * 60)) / 1000);

      setTimeLeft(`${minutes} minutes ${seconds} seconds`);
    };

    updateCountDown();
    const interval = setInterval(updateCountDown, 1000);

    return () => clearInterval(interval);
  }, [userAssessment]);

  return (
    userAssessment && (
      <main>
        <div className="w-screen p-5 md:p-10">
          <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-500 pb-5">
            <h1 className="text-3xl font-bold text-primary">
              {userAssessment.assessment.title} Assessment
            </h1>
            <div className="flex flex-col items-center">
              <p className="text-lg">
                Please finish the assessment before{" "}
                {DateFormatter(userAssessment.endTime)}
              </p>
              <p className="text-xl font-medium">Time Remaining: {timeLeft}</p>
            </div>
          </div>
        </div>
      </main>
    )
  );
}
