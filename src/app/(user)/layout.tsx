"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = [
    "/about-us",
    "/companies",
    "/companies-detail",
    "/job-detail",
    "/jobs",
    "/certificate-verification",
    "/review/company",
  ];

  const isPublicRoute = () => {
    return publicRoutes.some((route) => pathname?.startsWith(route));
  };

  const getCookie = (key: string): string | null => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [cookieKey, cookieVal] = cookie.trim().split("=");
      if (cookieKey === key) {
        return decodeURIComponent(cookieVal);
      }
    }
    return null;
  };

  useEffect(() => {
    if (isPublicRoute()) {
      return;
    }

    const user = getCookie("user");
    if (!user) {
      router.push("/auth/login");
      return;
    }

    try {
      const userObject = JSON.parse(user);

      if (userObject.role === "none") {
        router.push("/auth/verify-oauth");
        return; 
      }

      if (userObject.role !== "user") {
        router.push("/unauthorized");
      }
    } catch {
      router.push("/auth/login");
    }
  }, [router, pathname, isPublicRoute]); 

  return <>{children}</>;
}
