'use client'

import RegisterForm from "@/components/auth/register-form/registerForm";
import useCookie from "@/hooks/useCookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function RegisterPage() {
  const user = useCookie('user')

  const router = useRouter();

  useEffect(() => {
    if (user)
      router.push("/");
  }, [user, router]);

  return (
    <main>
      <RegisterForm />
    </main>
  );
}