import { useState } from "react";
import { useRouter } from "next/navigation";
import { applyJob } from "@/libs/jobdis";
import { toast } from "react-toastify";
import { formatRupiahTanpaDesimal } from "@/helpers/formatCurrency";
import { getUserData, getCookie } from "@/helpers/cookies";

export const useApplyForm = (
  jobId: string,
  isMounted: React.MutableRefObject<boolean>,
) => {
  const router = useRouter();
  const [expectedSalary, setExpectedSalary] = useState<string>("");
  const [formattedSalary, setFormattedSalary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isMounted.current) return;
    const value = e.target.value.replace(/[^\d]/g, "");
    setExpectedSalary(value);
    setFormattedSalary(formatRupiahTanpaDesimal(Number(value)));
  };

  const handleSubmit = async (e: React.FormEvent, resume: File | null) => {
    e.preventDefault();
    if (!isMounted.current) return;

    const userData = getUserData();
    if (!userData) {
      toast.error("Please login first");
      router.push("/auth/login");
      return;
    }

    if (!resume || !expectedSalary) {
      if (!resume) toast.error("Please upload your resume");
      if (!expectedSalary) toast.error("Please enter your expected salary");
      return;
    }

    setIsLoading(true);

    try {
      const token = getCookie("token");
      if (!token) {
        toast.error("Session expired. Please login again");
        router.push("/auth/login");
        return;
      }

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("expectedSalary", expectedSalary);
      formData.append("userId", userData.id.toString());
      formData.append("jobId", jobId);

      await applyJob(jobId, formData, token);

      if (isMounted.current) {
        toast.success("Application submitted successfully");
        await new Promise((resolve) => setTimeout(resolve, 100));
        router.push("/jobs");
      }
    } catch (error: any) {
      if (!isMounted.current) return;

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        router.push("/auth/login");
      } else if (error.response?.status === 400) {
        toast.error(
          error.response.data?.message ||
            "Please check your application details",
        );
      } else {
        toast.error("Failed to submit application. Please try again");
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  return {
    formattedSalary,
    isLoading,
    handleSalaryChange,
    handleSubmit,
  };
};
