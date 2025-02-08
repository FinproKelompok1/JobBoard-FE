import CreateAssessment from "@/components/developer/createAssessment";
import DeveloperSideBar from "@/components/developer/developerSideBar";
import StatusToggle from "@/components/developer/statusToggle";
import { getAssessments } from "@/libs/assessment";
import { IAssessment } from "@/types/types";
import Link from "next/link";

export default async function Assessment() {
  const assessments: IAssessment[] = await getAssessments();

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-screen p-5 md:p-10">
        <div className="flex flex-col gap-2 border-b border-gray-500 pb-5 md:flex-row md:items-center md:justify-between">
          <h1 className="w-full text-3xl font-bold text-primary">
            Skill Assessment
          </h1>
          <div>
            <CreateAssessment />
          </div>
        </div>

        <div className="mt-10">
          {assessments.length === 0 ? (
            <div>
              <p className="text-xl text-primary">
                There is no Skill Assessment yet.
              </p>
            </div>
          ) : (
            <div className="flex">
              {assessments.map((assessment, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-full flex-col rounded-xl border border-gray-500 p-5 shadow-md md:w-[700px]"
                  >
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold text-primary">
                        {assessment.title}
                      </h1>
                      <StatusToggle
                        assessmentId={assessment.id}
                        assessmentStatus={assessment.isActive}
                        assessmentQuestion={
                          assessment.AssessmentQuestion.length
                        }
                      />
                    </div>

                    <p className="mt-4 text-justify">
                      {assessment.description}
                    </p>

                    <div className="mt-5 flex gap-3">
                      <Link
                        href={`/developer/assessment/${assessment.id}/question`}
                        className="w-36 rounded-md border-2 border-accent bg-accent py-2 text-center font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 hover:text-white"
                      >
                        Questions: {assessment.AssessmentQuestion.length}
                      </Link>
                      <Link
                        href={`/developer/assessment/${assessment.id}/user`}
                        className="w-36 rounded-md border-2 border-accent py-2 text-center font-semibold text-accent transition-all duration-300 ease-in-out hover:bg-accent hover:text-white"
                      >
                        Users
                      </Link>
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
