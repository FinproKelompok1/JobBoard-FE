"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function VerifyCertificate() {
  const router = useRouter();
  const [certificateInput, setCertificateInput] = useState<string>("");

  const handleVerify = () => {
    const splitinput = certificateInput.split("-");
    const userAssessmentId = splitinput.pop();

    if (userAssessmentId && !isNaN(Number(userAssessmentId))) {
      router.push(`/verify-certificate/${certificateInput}`);
    } else {
      toast.error(
        "Invalid certificate ID Format. Please enter a valid certificate ID",
      );
    }
  };

  return (
    <div>
      <h1>Verify Certificate</h1>
      <p>Please insert certificate ID to verify</p>
      <input
        type="text"
        value={certificateInput}
        onChange={(e) => setCertificateInput(e.target.value)}
        className="border border-black"
      />
      <button
        onClick={handleVerify}
        className="rounded-lg bg-accent px-4 py-2 text-white"
      >
        Verify
      </button>
    </div>
  );
}
