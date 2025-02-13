import CreateUserAssessment from "@/components/developer/createUserAssessment";
import { getAssessments } from "@/libs/assessment";
import { IAssessment } from "@/types/types";

export default async function UserAssessmentList({
  params,
}: {
  params: { username: string };
}) {
  const assessments: IAssessment[] = await getAssessments();

  return (
    <main>
      <div className="w-screen p-5 md:p-10">
        <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-500 pb-5">
          <h1 className="text-3xl font-bold text-primary">Skill Assessment</h1>
        </div>

        <div className="mt-10">
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
                      className="flex min-h-56 w-full flex-col rounded-xl border border-gray-500 p-5 shadow-md md:w-[700px]"
                    >
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-primary">
                          {assessment.title}
                        </h1>
                      </div>

                      <p className="mt-4">{assessment.description}</p>

                      <div className="mt-5 flex justify-end gap-3">
                        <CreateUserAssessment username={params.username} assessmentId={assessment.id} />
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
