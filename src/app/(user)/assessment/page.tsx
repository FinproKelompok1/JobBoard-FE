"use client";

import CreateUserAssessment from "@/components/assessment/createUserAssessment";
import LoadingPage from "@/components/loading";
import { getAssessments } from "@/libs/assessment";
import { getUserProfile } from "@/libs/auth";
import { getUserSubscription } from "@/libs/subscription";
import { UserProfile } from "@/types/profile";
import { IAssessment, IUserSubscription } from "@/types/types";
import { useEffect, useState } from "react";

export default function SkillAssessment() {
  const [assessments, setAssessments] = useState<IAssessment[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userSubscription, setUserSubscription] = useState<IUserSubscription[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const assessmentsData = await getAssessments();
        const userData = await getUserProfile();
        const userSubscriptionData = await getUserSubscription(
          userData.data.username,
        );

        setAssessments(assessmentsData);
        setUser(userData.data);
        setUserSubscription(userSubscriptionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-red-500">
          Failed to load user data.
        </p>
      </main>
    );
  }

  const isAssessmentLimit = userSubscription.some(
    (userSubs) =>
      userSubs.subscription.category === "standard" &&
      userSubs.assessmentCount >= 2,
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="w-screen p-5 md:p-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold text-primary">Skill Assessment</h1>
        </div>

        {isAssessmentLimit && (
          <div className="mt-5 flex flex-col items-center justify-center">
            <p className="text-xl font-semibold text-red-500">
              You have reached your assessment attempt limit.
            </p>
            <p className="text-lg font-medium">
              Please upgrade to <span className="font-bold">Profesional</span>{" "}
              plan for unlimited assessment attempts.
            </p>
          </div>
        )}

        <div className="mt-5">
          {assessments.filter((assessment) => assessment.isActive).length ===
          0 ? (
            <div className="flex flex-col items-center justify-center text-lg">
              <p>There are no active Skill Assessments at the moment.</p>
              <p>Please check back later.</p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-5">
              {assessments
                .filter((assessment) => assessment.isActive)
                .map((assessment, index) => {
                  return (
                    <div
                      key={index}
                      className="flex min-h-56 w-full flex-col bg-white md:w-[600px] md:rounded-xl md:border md:p-5 md:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-primary">
                          {assessment.title}
                        </h1>
                      </div>

                      <p className="mt-4">{assessment.description}</p>

                      <div className="mt-5 flex gap-3 md:justify-end">
                        <CreateUserAssessment
                          username={user.username}
                          assessmentId={assessment.id}
                          disabled={isAssessmentLimit}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
