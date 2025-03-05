"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Formik, Form } from "formik";
import FormInput from "../shared/formInput";
import { validationSchema } from "./validation";
import { authService } from "@/libs/auth";
import { LockKeyhole, Mail, ShieldCheck, AlertTriangle } from "lucide-react";

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
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const errorParam = urlParams.get("error");
      if (errorParam) {
        setError(decodeURIComponent(errorParam));
      }
    }
  }, []);

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
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0">
        <Image 
          src="/login.jpg" 
          alt="Secure background" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#0D3880]/80 to-[#000]/85"></div>
      </div>
      
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-center">
        <div className="bg-red-600/90 text-white text-xs font-bold px-4 py-1 flex items-center space-x-1">
          <AlertTriangle className="h-3 w-3" />
          <span>RESTRICTED ACCESS</span>
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-[#0D3880] py-2 px-4 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-white" />
              <p className="text-white text-sm font-semibold">DEVELOPER PORTAL</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0D3880]/20 backdrop-blur-sm border border-[#0D3880]/30">
                <LockKeyhole className="h-6 w-6 text-[#0D3880]" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Developer Access
              </h2>
              <div className="mt-1 flex items-center justify-center">
                <span className="inline-block h-1 w-8 bg-[#E60278]"></span>
              </div>
              <p className="mt-2 text-sm text-white/70">
                Restricted portal entry
              </p>
            </div>

            <div className="mb-4 rounded border border-white/10 bg-white/5 backdrop-blur-sm p-3 text-xs text-white/80">
              <p className="flex items-start">
                <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>This portal is restricted to authorized developer access only. Multi-factor authentication required.</span>
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded border border-red-500/30 bg-red-500/10 backdrop-blur-sm p-3 text-xs text-red-200 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-400 flex-shrink-0" />
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
                  <div>
                    <label className="block text-white/70 text-xs mb-1 font-medium">
                      Developer Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <FormInput 
                        label=""
                        name="email" 
                        type="email" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-xs mb-1 font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <FormInput 
                        label=""
                        name="password" 
                        type="password" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-xs mb-1 font-medium">
                      Authentication Code
                    </label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <FormInput 
                        label=""
                        name="otp" 
                        type="text" 
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full rounded-md py-2.5 text-sm font-medium text-white focus:outline-none disabled:opacity-70 bg-[#0D3880] hover:bg-[#0D3880]/90 transition-colors mt-2"
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

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-center text-xs text-white/50">
                      <span className="text-[#E60278]">Developer Portal</span> - Authorized access only
                    </p>
                    <p className="text-center text-xs text-white/30 mt-1">
                      All access attempts are logged and monitored
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}