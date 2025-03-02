"use client";

import axios from "@/helpers/axios";
import { IUserAssessment } from "@/types/types";
import { useState } from "react";

export default function DownloadCertificate({
  userAssessment,
}: {
  userAssessment: IUserAssessment;
}) {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.get(
        `/user-assessments/download/${userAssessment.User.username}/${userAssessment.id}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Certificate ${userAssessment.assessment.title} - ${userAssessment.User.fullname}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading certificate:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="rounded-lg bg-accent px-4 py-2 font-medium text-white transition duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/80"
    >
      {isDownloading ? "Downloading..." : "Download Certificate"}
    </button>
  );
}
