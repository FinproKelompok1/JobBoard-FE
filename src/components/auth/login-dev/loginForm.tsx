"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form } from "formik";
import FormInput from "../shared/formInput";
import { validationSchema } from "./validation";
import { authService } from "@/libs/auth";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";

interface FormValues {
  email: string;
  password: string;
  otp: string;
}

interface SubmitHelpers {
  setSubmitting: (isSubmitting: boolean) => void;
}

export default function RestrictedDevLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  const initialValues: FormValues = {
    email: "",
    password: "",
    otp: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: SubmitHelpers,
  ) => {
    try {
      setError("");
      setIsLoading(true);
      await authService.loginDeveloper({
        email: values.email,
        password: values.password,
        otpToken: values.otp,
      });
      router.push("/developer");
    } catch (error: unknown) {
      const errorObj = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        errorObj.response?.data?.message || "Authentication failed";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto w-full max-w-md rounded-md bg-white p-6 shadow-md">
        <div className="mb-6">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <LockKeyhole className="h-5 w-5" style={{ color: "#0D3880" }} />
          </div>
          <h2
            className="text-center text-xl font-semibold"
            style={{ color: "#0D3880" }}
          >
            Developer Access
          </h2>
          <div className="mt-1 flex items-center justify-center">
            <span
              className="inline-block h-1 w-6"
              style={{ backgroundColor: "#E60278" }}
            ></span>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Restricted portal entry
          </p>
        </div>

        <div className="mb-4 rounded border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
          <p>
            This portal is restricted to authorized developer access only.
            Please authenticate with your credentials.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <FormInput label="Developer Email" name="email" type="email" />
              </div>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <FormInput label="Password" name="password" type="password" />
              </div>

              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <FormInput label="Authentication Code" name="otp" type="text" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full rounded py-2 text-sm font-medium text-white focus:outline-none disabled:opacity-70"
                style={{ backgroundColor: "#0D3880" }}
              >
                {isSubmitting || isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  "Authenticate"
                )}
              </button>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <p className="text-center text-xs text-gray-500">
                  <span style={{ color: "#E60278" }}>Developer Portal</span> -
                  Authorized access only
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
