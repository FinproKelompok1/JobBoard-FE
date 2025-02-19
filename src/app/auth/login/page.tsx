'use client'

import LoginForm from "@/components/auth/login-form/loginForm";
import useCookie from "@/hooks/useCookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function LoginPage() {
  const user = useCookie('user')

  const router = useRouter();

  useEffect(() => {
    if (user)
      router.push("/");
  }, [user, router]);

  return (
    <main>
      <LoginForm />
    </main>
  );
}