"use client";

import DateFormatter from "@/helpers/dateFormatter";
import { getUserAssessmentById } from "@/libs/assessment";
import { IAssessmentQuestion, IUserAssessment } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserAssessment({
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
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [answer, setAnswer] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number>(0);
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
        router.push(`/${userAssessment.User.username}/assessment`);
        return;
      }

      const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((different % (1000 * 60)) / 1000);

      setTimeLeft(`${minutes} minutes ${seconds} seconds`);
    };

    updateCountDown();
    const interval = setInterval(updateCountDown, 1000);

    return () => clearInterval(interval);
  }, [userAssessment, router]);

  const handleChange = (questionId: number, option: string) => {
    setAnswer((prev) => {
      const updatedAnswer = { ...prev, [questionId]: option };
      console.log("Selected answer:", updatedAnswer);
      return updatedAnswer;
    });
  };

  const calculateScore = () => {
    if (!assessmentQuestions) return;

    let correctCount = 0;

    assessmentQuestions.forEach((question) => {
      const selectedAnswer = answer[question.id];
      const correctAnswerIndex = question.correctAnswer;
      const correctAnswer = question.options[correctAnswerIndex];

      if (selectedAnswer === correctAnswer) {
        correctCount += 1;
      }
    });

    const totalScore = correctCount * 4;
    setScore(totalScore);
    console.log("total score:", totalScore);
  };

  return (
    userAssessment &&
    assessmentQuestions && (
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
              <p className="text-xl font-medium text-red-500">
                Time Remaining: {timeLeft}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex w-fit max-w-7xl flex-col">
            {assessmentQuestions.map((question, index) => (
              <div key={index}>
                <p className="mt-5 text-lg font-bold">
                  {index + 1}. {question.question}
                </p>
                <form className="mt-2 space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex w-fit cursor-pointer gap-2 rounded-xl border p-2 ${answer[question.id] === option ? "bg-accent/90 font-medium text-white" : "hover:bg-accent/10"}`}
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

            <button onClick={calculateScore}>Submit</button>
          </div>
        </div>
      </main>
    )
  );
}
