"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CertificateVerification() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [certificateId, setCertificateId] = useState<string>("");

  const handleVerify = () => {
    const splitinput = certificateId.split("-");
    const userAssessmentId = splitinput.pop();

    if (userAssessmentId && !isNaN(Number(userAssessmentId))) {
      setLoading(true);
      router.push(`/certificate-verification/${certificateId}`);
    } else {
      toast.error(
        "Invalid certificate ID Format. Please enter a valid certificate ID",
      );
    }
  };

  return (
    <main className="min-h-screen md:bg-gray-50">
      <div className="mt-5 w-screen p-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold text-primary">
            Certificate Verification{" "}
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white p-5 md:w-96 md:shadow-lg">
          <div className="flex w-96 flex-col gap-5">
            <p className="text-lg font-medium">
              Please enter certificate ID to verify
            </p>
            <input
              type="text"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              className="rounded-lg border border-gray-500 p-2"
              placeholder="Please enter certificate ID here"
            />
            <button
              onClick={handleVerify}
              className="rounded-lg bg-accent px-4 py-2 font-semibold tracking-widest text-white"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
