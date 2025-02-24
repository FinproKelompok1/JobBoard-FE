import { useState } from "react";
import { applyJob } from "@/libs/jobdis";
import { toast } from "react-toastify";

export const useApplyForm = (jobId: string) => {
  const [expectedSalary, setExpectedSalary] = useState<string>("");
  const [formattedSalary, setFormattedSalary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const formatToRupiah = (value: string) => {
    const number = value.replace(/[^\d]/g, "");
    const formatted = new Intl.NumberFormat("id-ID").format(Number(number));
    return `Rp ${formatted}`;
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setExpectedSalary(Number(value).toString());
    setFormattedSalary(formatToRupiah(value));
  };

  const handleSubmit = async (e: React.FormEvent, resume: File | null) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    const salary = parseInt(expectedSalary);
    if (!salary || salary <= 0) {
      toast.error("Please enter a valid salary amount");
      return;
    }

    setIsLoading(true);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        toast.error("Session expired");
        return;
      }

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("expectedSalary", expectedSalary);

      await applyJob(jobId, formData, token);
      toast.success("Application submitted successfully");
    } catch (error: unknown) {
      console.error("Submit error:", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response?.data?.message === "string"
      ) {
        toast.error(
          (error as { response: { data: { message: string } } }).response.data
            .message,
        );
      } else {
        toast.error("Failed to submit application");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formattedSalary,
    isLoading,
    handleSalaryChange,
    handleSubmit,
  };
};
