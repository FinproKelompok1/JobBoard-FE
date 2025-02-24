'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form } from 'formik';
import FormInput from '../shared/formInput';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="w-full max-w-lg p-8 mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-block p-2 bg-blue-50 rounded-xl mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-8 h-8 text-blue-500"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-6-5Z" />
                <path d="m10 13-2 2 2 2" />
                <path d="m14 17 2-2-2-2" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#0D3880] mb-2">Developer Access</h2>
            <p className="text-gray-600">Sign in to continue to developer dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
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
                    label="OTP Token"
                    name="otp"
                    type="text"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0D3880] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#0D3880]/90 transition-all transform hover:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#0D3880] focus:ring-offset-2"
                >
                  Access Developer Dashboard
                </button>

                <div className="pt-6 text-center">
                  <a 
                    href="/auth/login"
                    className="text-sm text-gray-600 hover:text-[#0D3880] transition-colors"
                  >
                    ← Back to regular login
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is a restricted access area. 
          <br />Please ensure you have the necessary permissions.</p>
        </div>
      </div>
    </div>
  );
}