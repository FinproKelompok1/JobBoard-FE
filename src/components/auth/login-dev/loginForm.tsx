'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form } from 'formik';
import FormInput from '../shared/formInput';
import SocialAuth from '../shared/socialAuth';
import { validationSchema } from './validation';
import { authService } from '@/libs/auth';

export default function LoginDevForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  const initialValues = {
    email: '',
    password: '',
    otp: ''
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setError('');
      console.log(values)
      const response = await authService.loginDeveloper({
        email: values.email,
        password: values.password,
        otpToken: values.otp
      });
      console.log(response)
      router.push('/');
    } catch (error: any) {
      console.log(error)
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full flex gap-8 p-8">
        <div className="flex-1 bg-white p-8 rounded-lg shadow-sm">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-[#0D3880] mb-8">Welcome Back</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
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
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                  />
                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <FormInput
                    label="OTP"
                    name="otp"
                    type="text"
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#E60278] text-white py-2 px-4 rounded-md hover:bg-[#E60278]/90 transition-colors"
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
