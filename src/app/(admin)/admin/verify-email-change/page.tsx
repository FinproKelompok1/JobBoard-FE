"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";

export default function VerifyEmailChangePage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    setToken(tokenFromUrl);
  }, []);

  useEffect(() => {
    const verifyEmailChange = async () => {
      try {
        if (!token) {
          if (token === null) return;
          
          toast.error("Verification token is missing");
          setStatus("Failed: Token missing");
          return;
        }

        const decoded = JSON.parse(atob(token.split(".")[1]));

        const endpoint = decoded.adminId
          ? "/auth/admin/verify-email-change"
          : "/auth/verify-email-change";

        const redirectPath = decoded.adminId ? "/admin/profile" : "/profile";

        await axios.get(`${endpoint}?token=${token}`);
        setStatus("Success: Email verified");
        toast.success("Email changed successfully!");

        setTimeout(() => {
          window.location.href = redirectPath;
        }, 2000);
      } catch (error) {
        if (isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message || "Email change verification failed";
          setStatus(`Failed: ${errorMessage}`);
          toast.error(errorMessage);
        } else {
          setStatus("Failed: Unknown error");
          toast.error("Email change verification failed");
        }

        setTimeout(() => {
          router.push("/profile");
        }, 3000);
      }
    };

    verifyEmailChange();
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-[#0D3880]">
          Verifying Email Change
        </h2>
        <p className="mb-4 text-gray-600">{status}</p>
        <p className="text-sm text-gray-500">
          You will be redirected to your profile page shortly.
        </p>
      </div>
    </div>
  );
}