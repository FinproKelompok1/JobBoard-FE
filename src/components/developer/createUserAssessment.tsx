"use client";

import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateUserAssessment({
  username,
  assessmentId,
  disabled,
}: {
  username: string;
  assessmentId: number;
  disabled: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const router = useRouter();

  const handleCreateUserAssessment = async () => {
    try {
      setIsCreating(true);
      const { data } = await axios.post(`/user-assessments/${assessmentId}`);

      router.push(`/${username}/assessment/${data.userAssessmentId}`);
    } catch (error) {
      console.error("Error creating user assessment:", error);
      toastErrAxios(error);
    } finally {
      setIsCreating(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
        className="rounded-md border-2 border-accent bg-accent px-4 py-2 text-center font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 hover:text-white disabled:cursor-not-allowed disabled:bg-accent/70"
      >
        Start assessment
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-56 w-[400px] flex-col justify-between rounded-xl bg-white p-5">
            <h1 className="text-3xl font-bold text-primary">Are you ready?</h1>

            <div>
              <p className="text-xl">
                This assessment has{" "}
                <span className="font-bold">25 questions</span>.
              </p>
              <p className="text-xl">
                You will have <span className="font-bold"> 30 minutes</span> to
                complete it.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md border-2 border-accent px-4 py-2 text-center font-semibold text-accent transition-all duration-300 ease-in-out hover:bg-accent hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCreateUserAssessment()}
                disabled={isCreating}
                className="rounded-md border-2 border-accent bg-accent px-4 py-2 text-center font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/80 hover:text-white disabled:cursor-not-allowed disabled:bg-accent/80"
              >
                {isCreating ? "Starting..." : "Start Assessment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
