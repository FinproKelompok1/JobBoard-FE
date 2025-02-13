"use client";

import CreateAssessmentQuestion from "@/components/developer/createAssessmentQuestion";
import DeveloperSideBar from "@/components/developer/developerSideBar";
import EditQuestion from "@/components/developer/editAssessmentQuestion";
import { getAssessmentById, getAssessmentQuestions } from "@/libs/assessment";
import { IAssessment, IAssessmentQuestion } from "@/types/types";
import { useState } from "react";
import useSWR from "swr";

const fetcher = async ([url, id, page, limit]: [
  string,
  number,
  number,
  number,
]) => {
  if (url.includes("assessment")) return await getAssessmentById(id);
  if (url.includes("questions"))
    return await getAssessmentQuestions(id, page, limit);
  return null;
};

export default function AssessmentQuestion({
  params,
}: {
  params: { assessmentId: number };
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const questionsPerPage = 5;
  const { data: assessment } = useSWR<IAssessment>(
    [`assessment-%${params.assessmentId}`, params.assessmentId],
    fetcher,
  );

  const { data: assessmentQuestion, mutate } = useSWR<{
    questions: IAssessmentQuestion[];
    totalQuestions: number;
    totalPages: number;
    currentPage: number;
  }>(
    [
      `questions-${params.assessmentId}`,
      params.assessmentId,
      currentPage,
      questionsPerPage,
    ],
    fetcher,
  );

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

  const totalPages = Math.ceil(
    assessmentQuestion.totalQuestions / questionsPerPage,
  );
  const startIndex = (currentPage - 1) * questionsPerPage;
  const paginatedQuestions = assessmentQuestion.questions.slice(
    startIndex,
    startIndex + questionsPerPage,
  );

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
              assessmentQuestion.questions.map((question, index) => (
                <div key={question.id} className="mb-5">
                  <div className="flex items-center gap-5">
                    <p className="text-xl font-semibold">
                      {question.id}. {question.question}
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

        <div className="mt-5 flex justify-end">
          <div className="flex w-fit items-center justify-between gap-5">
            <button
              className="rounded-md bg-accent px-4 py-2 text-white disabled:bg-gray-400"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <p className="text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </p>
            <button
              className="rounded-md bg-accent px-4 py-2 text-white disabled:bg-gray-400"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
