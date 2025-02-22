"use client";

import useCookie from "@/hooks/useCookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const getCookie = (key: string): string | null => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            let [cookieKey, cookieVal] = cookie.trim().split('=');
            if (cookieKey === key) {
                return decodeURIComponent(cookieVal);
            }
        }
        return null;
    };


    useEffect(() => {
        const user = getCookie('user')
        if (!user) {
            router.push("/auth/login");
            return;
        }

        try {
            const userObject = JSON.parse(user);

            if (userObject.role === 'none')
                router.push("/auth/verify-oauth");

            if (userObject.role !== "admin") {
                router.push("/unauthorized");
            }
        } catch (error) {
            router.push("/auth/login");
        }
    }, []);

    return <>{children}</>;
}
