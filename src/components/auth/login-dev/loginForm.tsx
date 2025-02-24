"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form } from "formik";
import FormInput from "../shared/formInput";
import { validationSchema } from "./validation";
import { authService } from "@/libs/auth";

export default function LoginDevForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  const initialValues = {
    email: "",
    password: "",
    otp: "",
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setError("");
      console.log(values);
      const response = await authService.loginDeveloper({
        email: values.email,
        password: values.password,
        otpToken: values.otp,
      });
      console.log(response);
      router.push("/developer");
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl gap-8 p-8">
        <div className="flex-1 rounded-lg bg-white p-8 shadow-sm">
          <div className="mx-auto max-w-sm">
            <h2 className="mb-8 text-2xl font-bold text-[#0D3880]">
              Welcome Back
            </h2>

            {error && (
              <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
                {error}
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form className="space-y-4">
                  <FormInput label="Email" name="email" type="email" />
                  <FormInput label="Password" name="password" type="password" />
                  <FormInput label="OTP" name="otp" type="text" />

                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#E60278] px-4 py-2 text-white transition-colors hover:bg-[#E60278]/90"
                  >
                    Sign in
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
