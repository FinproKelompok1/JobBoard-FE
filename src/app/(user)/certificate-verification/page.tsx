"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CertificateVerification() {
  const router = useRouter();
  const [certificateInput, setCertificateInput] = useState<string>("");

  const handleVerify = () => {
    const splitinput = certificateInput.split("-");
    const userAssessmentId = splitinput.pop();

    if (userAssessmentId && !isNaN(Number(userAssessmentId))) {
      router.push(`/certificate-verification/${certificateInput}`);
    } else {
      toast.error(
        "Invalid certificate ID Format. Please enter a valid certificate ID",
      );
    }
  };

  return (
    <main className="min-h-screen md:bg-gray-50">
      <div className="w-screen p-5 md:p-10">
        <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-500 pb-5">
          <h1 className="text-3xl font-bold text-primary">
            Certificate Verification{" "}
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex w-full items-center justify-center rounded-xl bg-white p-5 md:w-96 md:shadow-lg">
          <div className="flex w-96 flex-col gap-5">
            <p className="text-lg font-medium">
              Please enter certificate ID to verify
            </p>
            <input
              type="text"
              value={certificateInput}
              onChange={(e) => setCertificateInput(e.target.value)}
              className="rounded-lg border border-gray-500 p-2"
              placeholder="Please enter certificate ID here"
            />
            <button
              onClick={handleVerify}
              className="rounded-lg bg-accent px-4 py-2 font-semibold tracking-widest text-white"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
