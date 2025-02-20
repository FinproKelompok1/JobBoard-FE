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

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/about-us",
    "/companies",
    "/companies-detail",
    "/job-detail",
    "/jobs",
  ];

  const isPublicRoute = () => {
    return publicRoutes.some((route) => pathname?.startsWith(route));
  };

  const getCookie = (key: string): string | null => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      let [cookieKey, cookieVal] = cookie.trim().split("=");
      if (cookieKey === key) {
        return decodeURIComponent(cookieVal);
      }
    }
    return null;
  };

  useEffect(() => {
    // If it's a public route, don't check for authentication
    if (isPublicRoute()) {
      return;
    }

    const user = getCookie("user");
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const userObject = JSON.parse(user);

      if (userObject.role === "none") {
        router.push("/auth/verify-oauth");
      }

      if (userObject.role !== "user") {
        router.push("/unauthorized");
      }
    } catch (error) {
      router.push("/auth/login");
    }
  }, [router, pathname]);

  return <>{children}</>;
}
