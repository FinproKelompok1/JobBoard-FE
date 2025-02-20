import { getUserAssessmentById } from "@/libs/assessment";
import { IUserAssessment } from "@/types/types";
import Link from "next/link";

export default async function UserAssessmentResult({
  params,
}: {
  params: { userAssessmentId: number };
}) {
  const userAssessment: IUserAssessment = await getUserAssessmentById(
    params.userAssessmentId,
  );

  return (
    <main>
      <div className="w-screen p-5 md:p-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold text-primary">
            {userAssessment.assessment.title} - Assessment Result
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center">
          <span
            className={`${userAssessment.status === "failed" ? "bg-red-500" : "bg-green-500"} rounded-md px-4 py-2 text-3xl font-bold text-white`}
          >
            {userAssessment.status === "failed" ? "Failed" : "Passed"}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xl font-medium">Your score: </p>
          <span
            className={`${userAssessment.status === "failed" ? "text-red-500" : "text-green-500"} text-3xl font-bold`}
          >
            {userAssessment.score}
          </span>
        </div>

        <div className="flex flex-col items-center">
          {userAssessment.status === "failed" ? (
            <>
              <p className="text-lg">
                Don't worry! You have the opportunity to try again and improve
                your score.{" "}
              </p>
              <p className="text-lg">
                Keep going, each attempt brings you closer to success!{" "}
              </p>
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-accent">
                Congratulations on passing!
              </p>
              <p className="text-lg">
                You can now view and download your certificate as a testament to
                your achievement.
              </p>
            </>
          )}
        </div>

        <div className="flex items-center justify-center">
          {userAssessment.status === "failed" ? (
            <Link
              href={`/subscription/${userAssessment.User.username}`}
              className="rounded-lg bg-accent px-4 py-2 font-semibold text-white"
            >
              Try again
            </Link>
          ) : (
            <Link
              href={`/assessment/${userAssessment.User.username}/${userAssessment.id}/certificate`}
              className="rounded-lg bg-accent px-4 py-2 font-semibold text-white"
            >
              View certificate
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
