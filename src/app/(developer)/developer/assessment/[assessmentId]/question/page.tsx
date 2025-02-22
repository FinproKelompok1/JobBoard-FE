"use client";

import CreateAssessmentQuestion from "@/components/developer/createAssessmentQuestion";
import DeveloperSideBar from "@/components/developer/developerSideBar";
import EditQuestion from "@/components/developer/editAssessmentQuestion";
import { getAssessmentById, getAssessmentQuestions } from "@/libs/assessment";
import { IAssessment, IAssessmentQuestion } from "@/types/types";
import useSWR from "swr";

const fetcher = async ([url, id]: [string, number]) => {
  if (url.includes("assessment")) return await getAssessmentById(id);
  if (url.includes("questions")) return await getAssessmentQuestions(id);
  return null;
};

export default function AssessmentQuestion({
  params,
}: {
  params: { assessmentId: number };
}) {
  const { data: assessment } = useSWR<IAssessment>(
    [`assessment-%${params.assessmentId}`, params.assessmentId],
    fetcher,
  );

  const { data: assessmentQuestion, mutate } = useSWR<{
    questions: IAssessmentQuestion[];
    totalQuestions: number;
  }>([`questions-${params.assessmentId}`, params.assessmentId], fetcher);

  if (!assessment || !assessmentQuestion) {
    return (
      <main className="flex">
        <DeveloperSideBar />
        <div className="w-screen p-5 md:p-10">
          <h1 className="text-3xl font-bold text-primary">Loading...</h1>
        </div>
      </main>
    );
  }

  const isMaxQuestions = assessmentQuestion.totalQuestions >= 25;

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-screen p-5 md:p-10">
        <div className="flex flex-col gap-2 border-b border-gray-500 pb-5 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-primary">
            Assessment Questions
          </h1>
          <div>
            <CreateAssessmentQuestion
              assessmentId={params.assessmentId}
              mutate={mutate}
              disabled={isMaxQuestions}
            />
          </div>
        </div>

        <div className="mt-10 w-full">
          <div className="flex items-center gap-5">
            <h1 className="text-2xl font-semibold text-primary">
              {assessment?.title}
            </h1>
            <p
              className={`rounded-full px-3 py-1 text-sm font-medium text-white ${isMaxQuestions ? "bg-green-600" : "bg-gray-500"} `}
            >
              {isMaxQuestions ? "Completed: " : "Not Completed:"}
              {"   "}
              {assessmentQuestion.totalQuestions} / 25 question
            </p>
          </div>

          <p className="mt-2 max-w-3xl text-lg">{assessment?.description}</p>
        </div>

        <div className="mt-10 w-[1000px]">
          {assessmentQuestion &&
            (assessmentQuestion.totalQuestions === 0 ? (
              <div>
                <p className="text-xl text-primary">
                  There is no question yet. Please create 25 questions to
                  activate this assessment.
                </p>
              </div>
            ) : (
              assessmentQuestion.questions.map((question) => (
                <div key={question.id} className="mb-5">
                  <div className="flex items-center gap-5">
                    <p className="text-xl font-semibold">
                      {question.question} (ID: {question.id})
                    </p>
                    <EditQuestion question={question} mutate={mutate} />
                  </div>

                  <div className="ml-5 mt-2">
                    <ol className="list-lower-alpha text-lg">
                      {question.options.map((option, optionIndex) => (
                        <li
                          key={optionIndex}
                          className={`p-1 ${
                            optionIndex === question.correctAnswer
                              ? "font-semibold text-green-600"
                              : ""
                          }`}
                        >
                          {String.fromCharCode(97 + optionIndex)}. {option}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))
            ))}
        </div>
      </div>
    </main>
  );
}
