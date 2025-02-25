"use client";

import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function StatusToggle({
  assessmentId,
  assessmentStatus,
  assessmentQuestion,
}: {
  assessmentId: number;
  assessmentStatus: boolean;
  assessmentQuestion: number;
}) {
  const router = useRouter();

  const handleToggle = async () => {
    try {
      if (assessmentQuestion !== 25) {
        toast.error("Assessment must have 25 questions to activate.");
        return;
      }

      const newStatus = !assessmentStatus;

      const response = await axios.patch(`/assessments/${assessmentId}`, {
        isActive: newStatus,
      });

      toast.success(response.data.message);
      router.refresh();
    } catch (error) {
      toastErrAxios(error);
    }
  };

  return (
    <label className="relative flex w-fit cursor-pointer items-center">
      <div>
        <input
          type="checkbox"
          checked={assessmentStatus}
          onChange={handleToggle}
          className="sr-only"
        />
        <div
          className={`h-6 w-24 rounded-full transition-colors ${
            assessmentStatus ? "bg-green-600 pl-2" : "bg-gray-500 pr-2 text-end"
          }`}
        >
          <span className="font-medium text-white">
            {assessmentStatus ? "Active" : "Inactive"}
          </span>
        </div>
        <div
          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
            assessmentStatus ? "translate-x-[72px]" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );
}
