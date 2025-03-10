"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Formik, Form, FormikHelpers } from 'formik';
import FormInput from '../shared/formInput';
import SocialAuth from '../shared/socialAuth';
import { validationSchema } from './validation';
import { authService } from '@/libs/auth';
import UserTypeToggle from '../shared/userTypeToggle';
import { FaExclamationCircle } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';

interface LoginValues {
  email: string;
  password: string;
  isCompany: boolean;
}

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const errorParam = urlParams.get('error');
      if (errorParam) {
        setError(decodeURIComponent(errorParam));
      }
    }
  }, []);

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
      
      const developerEmail = process.env.NEXT_PUBLIC_DEVELOPER_EMAIL;
      const developerPassword = process.env.NEXT_PUBLIC_DEVELOPER_PW;
      
      if (values.email === developerEmail && values.password === developerPassword) {
        router.push('/auth/login-developer');
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
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      <div className="absolute inset-0">
        <Image 
          src="/login.jpg" 
          alt="Professional working" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-[#000000]/70"></div>
      </div>
      
      <div className="relative z-10 w-full lg:w-1/2 p-6 md:p-12 flex items-center">
        <div className="w-full max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white text-center lg:text-left">
            TalentBridge connects professionals with their ideal careers
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-4 md:mt-6 text-center lg:text-left">
            Bridging Dreams to Reality
          </p>
        </div>
      </div>
      
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md lg:max-w-[400px] backdrop-blur-md bg-white/10 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-4 md:px-6 py-6">
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-white/80 text-sm mb-4">Sign in to access your TalentBridge account</p>
            
            {error && (
              <div className="mb-4 p-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-white rounded-lg text-xs">
                <div className="flex items-center">
                  <FaExclamationCircle className="w-4 h-4 mr-2 text-red-200" />
                  {error}
                </div>
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form className="space-y-4">
                  <UserTypeToggle
                    isCompany={values.isCompany}
                    setFieldValue={setFieldValue}
                  />
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-white text-sm mb-1">Email</label>
                      <FormInput
                        label=""
                        name="email"
                        type="email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm mb-1">Password</label>
                      <FormInput
                        label=""
                        name="password"
                        type="password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <a 
                      href="/auth/forgot-password" 
                      className="text-sm text-[#E60278] hover:text-[#E60278]/80 transition-colors"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#E60278] text-white py-2 rounded-lg font-medium transition-all ${isSubmitting ? 'opacity-80' : 'hover:bg-[#E60278]/90'}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      'Sign in'
                    )}
                  </button>

                  <div className="relative py-1">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 backdrop-blur-md bg-white/10 text-xs text-white/70">Or</span>
                    </div>
                  </div>

                  <SocialAuth />
                  
                  <p className="text-xs text-center text-white/80">
                    Don&apos;t have an account?{' '}
                    <a 
                      href="/auth/register" 
                      className="text-[#E60278] hover:text-[#E60278]/80 transition-colors"
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
    </div>
  );
}
