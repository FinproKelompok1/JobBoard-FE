'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormInput from '../shared/formInput';
import SocialAuth from '../shared/socialAuth';
import { adminValidationSchema, userValidationSchema } from './validation';
import { authService } from '@/libs/auth';
import UserType from '../verify/userType';
import { Bounce, toast } from 'react-toastify';

// Define types for the form values and submit handler
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
      console.log(values)
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
      console.log(error)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-sm">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold text-[#0D3880] mb-8">Get Started Now</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
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
                    <FormInput label="Company Name" name="companyName" type="text" />
                    <FormInput label="Phone Number" name="phoneNumber" type="tel" />
                  </>
                ) : (
                  <FormInput label="Username" name="username" type="text" />
                )}

                <FormInput label="Email address" name="email" type="email" />
                <FormInput label="Password" name="password" type="password" />

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="terms"
                    className="h-4 w-4 text-[#E60278] rounded"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    I agree to the Terms & Policy
                  </label>
                </div>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <button
                  type="submit"
                  className="w-full bg-[#E60278] text-white py-2 px-4 rounded-md hover:bg-[#E60278]/90 transition-colors"
                >
                  Sign up
                </button>

                <SocialAuth />
              </Form>
            )}
          </Formik>

          <p className="text-sm text-center text-gray-600 mt-6">
            Have an account?{' '}
            <a href="/auth/login" className="text-[#E60278] hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}