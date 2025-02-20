"use client";

import axios from "@/helpers/axios";
import DateFormatter from "@/helpers/dateFormatter";
import { toastErrAxios } from "@/helpers/toast";
import { getUserAssessmentById } from "@/libs/assessment";
import { IAssessmentQuestion, IUserAssessment } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserAssessmentForm({
  params,
}: {
  params: { userAssessmentId: number };
}) {
  const [userAssessment, setUserAssessment] = useState<IUserAssessment | null>(
    null,
  );
  const [assessmentQuestions, setAssessmentQuestions] = useState<
    IAssessmentQuestion[] | null
  >(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [answer, setAnswer] = useState<Record<number, string>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAssessment = await getUserAssessmentById(
          params.userAssessmentId,
        );

        setUserAssessment(userAssessment);
        setAssessmentQuestions(userAssessment.assessment.AssessmentQuestion);
      } catch (error) {
        console.error("Error fetch data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!userAssessment) return;

    const endTime = new Date(userAssessment.endTime).getTime();

    const updateCountDown = () => {
      const now = new Date().getTime();
      const different = endTime - now;

      if (different <= 0) {
        setTimeLeft("Time's up!");
        router.push(`/${userAssessment.User.username}/subscription`);
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

  const handleChange = (questionId: number, option: string) => {
    setAnswer((prev) => {
      const updatedAnswer = { ...prev, [questionId]: option };
      console.log("Selected answer:", updatedAnswer);
      return updatedAnswer;
    });
  };

  const handleSubmitAnswer = async () => {
    try {
      setIsSubmitting(true);

      if (!assessmentQuestions) return;
      if (!userAssessment) return;

      let correctCount = 0;

      assessmentQuestions.forEach((question) => {
        const selectedAnswer = answer[question.id];
        const correctAnswerIndex = question.correctAnswer;
        const correctAnswer = question.options[correctAnswerIndex];

        if (selectedAnswer === correctAnswer) {
          correctCount += 1;
        }
      });

      const score = correctCount * 4;

      await axios.patch(`/user-assessments/${params.userAssessmentId}`, {
        score: score,
      });

      toast.success("Answer submitted successfully");
      router.push(
        `/assessment/${userAssessment.User.username}/${params.userAssessmentId}/result`,
      );
    } catch (error) {
      console.error("Failed to submit answer:", error);
      toastErrAxios(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    userAssessment &&
    assessmentQuestions && (
      <main>
        <div className="sticky top-0 w-screen border-b border-gray-500 bg-white p-5">
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl font-bold text-primary">
              {userAssessment.assessment.title}
            </h1>
            <div className="flex flex-col md:items-center">
              <p className="text-lg">
                Please finish the assessment before{" "}
                <span className="font-semibold">
                  {DateFormatter(userAssessment.endTime)}
                </span>
              </p>
              <p className="text-lg font-semibold text-red-500">
                Time Remaining: {timeLeft}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-5 md:p-10">
          <div className="flex w-fit max-w-7xl flex-col gap-10">
            {assessmentQuestions.map((question, index) => (
              <div key={question.id}>
                <p className="text-lg font-bold">
                  {index + 1}. {question.question}
                </p>
                <form className="mt-2 space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex w-fit cursor-pointer gap-2 rounded-xl border px-2 py-1 ${answer[question.id] === option ? "bg-accent/90 font-medium text-white" : "hover:bg-accent/10"}`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={answer[question.id] === option}
                        onChange={() => handleChange(question.id, option)}
                      />
                      {option}
                    </label>
                  ))}
                </form>
              </div>
            ))}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="confirmation"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="size-4"
              />
              <label htmlFor="confirmation" className="ml-2 font-medium">
                Please check and confirm that all the answers are correct.{" "}
              </label>
            </div>

            <div className="mb-5 flex justify-end">
              <button
                onClick={handleSubmitAnswer}
                disabled={isSubmitting || !isChecked}
                className="w-full rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/70 md:w-fit"
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  );
}
