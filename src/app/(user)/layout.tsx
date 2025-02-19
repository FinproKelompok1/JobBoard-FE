"use client";

import useCookie from "@/hooks/useCookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const user = useCookie('user');
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
            return;
        }

        try {
            const userObject = JSON.parse(user);

            if (userObject.role === 'none')
                router.push("/auth/verify-oauth");
            
            if (userObject.role !== "user") {
                router.push("/unauthorized");
            }
        } catch (error) {
            router.push("/auth/login");
        }
    }, [user, router]);

    if (!user) return null;

    return <>{children}</>;
}
