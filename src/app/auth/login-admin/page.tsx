'use client'

import LoginDevForm from "@/components/auth/login-dev/loginForm"
import useCookie from "@/hooks/useCookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginAdminPage() {
    const user = useCookie('user')

    const router = useRouter();

    useEffect(() => {
        if (user)
            router.push("/");
    }, [user, router]);

    return (
        <main>
            <LoginDevForm />
        </main>
    )
}