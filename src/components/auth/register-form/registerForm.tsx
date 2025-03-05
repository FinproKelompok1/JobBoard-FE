'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormInput from '../shared/formInput';
import SocialAuth from '../shared/socialAuth';
import { adminValidationSchema, userValidationSchema } from './validation';
import { authService } from '@/libs/auth';
import UserType from '../verify/userType';
import { Bounce, toast } from 'react-toastify';
import { FaExclamationCircle } from 'react-icons/fa';

interface FormValues {
  email: string;
  username: string;
  password: string;
  companyName: string;
  phoneNumber: string;
  isCompany: boolean;
  terms: boolean;
}

interface SubmitHelpers {
  setSubmitting: (isSubmitting: boolean) => void;
  setFieldError: (field: string, message: string) => void;
}

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('user');

  const initialValues: FormValues = {
    email: '',
    username: '',
    password: '',
    companyName: '',
    phoneNumber: '',
    isCompany: true,
    terms: false
  };

  const handleSubmit = async (values: FormValues, { setSubmitting, setFieldError }: SubmitHelpers) => {
    try {
      setError('');
      if (userType === 'admin') {
        await authService.registerAdmin({
          companyName: values.companyName,
          email: values.email,
          noHandphone: values.phoneNumber,
          password: values.password
        });
      } else {
        await authService.registerUser({
          email: values.email,
          username: values.username,
          password: values.password
        });
      }
      toast('Please check your email', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push('/auth/login');
    } catch (error: unknown) {
      const errorObj = error as { response?: { data?: { message?: string } } };
      const errorMessage = errorObj.response?.data?.message || 'Registration failed';
      if (errorMessage.includes('Email already registered')) {
        setFieldError('email', 'Email already registered');
      } else if (errorMessage.includes('Username already taken')) {
        setFieldError('username', 'Username already taken');
      } else {
        setError(errorMessage);
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
        <div className="w-full max-w-md lg:max-w-[450px] backdrop-blur-md bg-white/10 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-4 md:px-6 py-6">
            <h2 className="text-2xl font-bold text-white">Get Started Now</h2>
            <p className="text-white/80 text-sm mb-4">Create your TalentBridge account</p>
            
            {error && (
              <div className="mb-4 p-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-white rounded-lg text-xs">
                <div className="flex items-center">
                  <FaExclamationCircle className="w-4 h-4 mr-2 text-red-200" />
                  {error}
                </div>
              </div>
            )}

            <UserType userType={userType} setUserType={setUserType} />

            <Formik
              initialValues={initialValues}
              validationSchema={userType === 'admin' ? adminValidationSchema : userValidationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-4" key={userType === 'admin' ? 'admin' : 'user'}>
                  {userType === 'admin' ? (
                    <>
                      <div>
                        <label className="block text-white text-sm mb-1">Company Name</label>
                        <FormInput label="" name="companyName" type="text" />
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-1">Phone Number</label>
                        <FormInput label="" name="phoneNumber" type="tel" />
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-white text-sm mb-1">Username</label>
                      <FormInput label="" name="username" type="text" />
                    </div>
                  )}

                  <div>
                    <label className="block text-white text-sm mb-1">Email address</label>
                    <FormInput label="" name="email" type="email" />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-1">Password</label>
                    <FormInput label="" name="password" type="password" />
                  </div>

                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name="terms"
                      className="h-4 w-4 bg-transparent border-white/30 text-[#E60278] focus:ring-[#E60278] rounded"
                    />
                    <label className="ml-2 text-sm text-white/80">
                      I agree to the Terms & Policy
                    </label>
                  </div>
                  <ErrorMessage
                    name="terms"
                    component="div"
                    className="text-red-300 text-xs"
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#E60278] text-white py-2 rounded-lg font-medium hover:bg-[#E60278]/90 transition-all"
                  >
                    Sign up
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
                    Have an account?{' '}
                    <a 
                      href="/auth/login" 
                      className="text-[#E60278] hover:text-[#E60278]/80 transition-colors"
                    >
                      Sign in
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