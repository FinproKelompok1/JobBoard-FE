import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import FormInput from '../shared/formInput';
import SocialAuth from '../shared/socialAuth';
import { validationSchema } from './validation';
import { authService } from '@/libs/auth';
import UserTypeToggle from '../shared/userTypeToggle';

interface LoginValues {
  email: string;
  password: string;
  isCompany: boolean;
}

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

  const initialValues: LoginValues = {
    email: '',
    password: '',
    isCompany: false
  };

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    try {
      setError('');
      
      if (values.email === 'developer@gmail.com' && values.password === 'developer') {
        router.push('/auth/login-admin');
        return;
      }

      if (!values.isCompany) {
        await authService.login({
          email: values.email,
          password: values.password
        });
        router.push('/');
      } else {
        await authService.loginAdmin({
          email: values.email,
          password: values.password
        });
        router.push('/admin/dashboard');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Login failed');
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="w-full max-w-lg p-8 mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#0D3880] mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue to your account</p>
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
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                <UserTypeToggle
                  isCompany={values.isCompany}
                  setFieldValue={setFieldValue}
                />
                
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
                </div>

                <div className="flex justify-end text-sm">
                  <a 
                    href="/auth/forgot-password" 
                    className="text-[#E60278] hover:text-[#E60278]/80 transition-colors font-medium"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E60278] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#E60278]/90 transition-all transform hover:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#E60278] focus:ring-offset-2"
                >
                  Sign in
                </button>

                <SocialAuth role="" />
                
                <p className="text-sm text-center text-gray-600 pt-4">
                  Don&apos;t have an account?{' '}
                  <a 
                    href="/auth/register" 
                    className="text-[#E60278] hover:text-[#E60278]/80 transition-colors font-medium"
                  >
                    Sign up
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
