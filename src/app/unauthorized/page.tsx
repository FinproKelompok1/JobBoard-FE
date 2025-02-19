"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect user setelah beberapa detik
    setTimeout(() => {
      router.push("/"); // Kembali ke halaman utama atau halaman login
    }, 3000); // Redirect setelah 3 detik
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-lg text-gray-600">
          You do not have permission to access this page.
        </p>
        <p className="mt-2 text-gray-500">Redirecting...</p>
      </div>
    </div>
  );
}
