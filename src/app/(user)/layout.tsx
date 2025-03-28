"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { authService } from "@/libs/auth"; 

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const publicRoutes = [
    "/about-us",
    "/companies",
    "/companies-detail",
    "/job-detail",
    "/jobs",
    "/certificate-verification",
    "/review/company",
  ];

  const exemptFromProfileCheck = [
    "/profile",
    ...publicRoutes,
  ];

  const isPublicRoute = () => {
    return publicRoutes.some((route) => pathname?.startsWith(route));
  };

  const isExemptFromProfileCheck = () => {
    return exemptFromProfileCheck.some((route) => pathname?.startsWith(route));
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

  const checkProfileCompletion = async () => {
    try {
      const response = await authService.checkProfileCompletion();

      if (response.success && response.data) {
        const { isComplete, missingFields: missingData } = response.data;
        
        const missingFieldList = [];
        if (missingData.gender) missingFieldList.push('gender');
        if (missingData.dob) missingFieldList.push('date of birth');
        if (missingData.lastEdu) missingFieldList.push('education');
        if (missingData.domicileId) missingFieldList.push('current location');

        if (!isComplete && missingFieldList.length > 0) {
          setMissingFields(missingFieldList);
          setShowModal(true);
        } else {
          setShowModal(false);
        }
      } else {
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error checking profile:", error);
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (isPublicRoute()) {
      return;
    }

    if (pathname?.startsWith('/profile')) {
      setShowModal(false);
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
        return;
      }

      if (!isExemptFromProfileCheck()) {
        checkProfileCompletion();
      }
    } catch  {
      router.push("/auth/login");
    }
  }, [pathname]); 

  return (
    <div className="relative">
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Incomplete Profile
            </h2>
            <div className="mb-4">
              <p>Please complete the following information:</p>
              <ul className="list-disc ml-5 mt-2">
                {missingFields.map((field, index) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/profile')}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}