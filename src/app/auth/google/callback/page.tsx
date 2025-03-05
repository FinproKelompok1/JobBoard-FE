"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/loading";
import axios from "@/helpers/axios";

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) {
          router.push("/login?error=No authorization code received");
          return;
        }

        const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL_BE}/auth/google/callback`;
        const fullUrl = `${backendUrl}?code=${code}`;

        const response = await axios.get(fullUrl);
        let userRole;
        document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

        if (response.data.admin) {
          document.cookie = `user=${JSON.stringify({
            ...response.data.admin,
            token: response.data.token,
          })}; path=/`;
          userRole = response.data.admin.role;
        }
        if (response.data.user) {
          document.cookie = `user=${JSON.stringify({
            ...response.data.user,
            token: response.data.token,
          })}; path=/`;
          userRole = response.data.user.role;
        }

        if (userRole === "none") {
          router.push("/auth/verify-oauth");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };

    if (typeof window !== 'undefined') {
      handleCallback();
    }
  }, [router]);

  return <LoadingPage />;
}