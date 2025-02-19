'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form } from 'formik';
import FormInput from '../shared/formInput';
import SocialAuth from '../shared/socialAuth';
import { validationSchema } from './validation';
import { authService } from '@/libs/auth';
import UserTypeToggle from '../shared/userTypeToggle';

export default function LoginForm() {
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
    rememberMe: false,
    isCompany: false
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setError('');
      if (!values.isCompany)
        await authService.login({
          email: values.email,
          password: values.password
        });
      else
        await authService.loginAdmin({
          email: values.email,
          password: values.password
        });
      router.push('/');
    } catch (error: any) {
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
              {({ values, setFieldValue }) => (
                <Form className="space-y-4">
                  <UserTypeToggle
                    isCompany={values.isCompany}
                    setFieldValue={setFieldValue}
                  />
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

                  <div className="flex justify-between items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={(e) => {
                          // Handle checkbox change
                        }}
                        className="h-4 w-4 text-[#E60278] rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="/forgot-password" className="text-sm text-[#E60278] hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E60278] text-white py-2 px-4 rounded-md hover:bg-[#E60278]/90 transition-colors"
                  >
                    Sign in
                  </button>

                  <SocialAuth role='' />
                </Form>
              )}
            </Formik>


            <p className="text-sm text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <a href="/auth/register" className="text-[#E60278] hover:underline">Sign up</a>
            </p>
          </div>
        </div>

        <div className="hidden lg:block flex-1">
          <img
            src="/api/placeholder/600/800"
            alt="Decorative"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}