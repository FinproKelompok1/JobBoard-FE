'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormInput from './formInput';
import { resetPassword } from '@/libs/changePassword';
import { toast } from 'react-toastify';
import { LockKeyhole, CheckCircle, ArrowLeft } from 'lucide-react';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

interface FormValues {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const token = searchParams.get('token');
  const isCompany = searchParams.get('isCompany') === 'true';

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing reset token');
      router.push('/auth/login');
    }
  }, [token, router]);

  const initialValues: FormValues = {
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      setLoading(true);
      await resetPassword({
        token: token!,
        password: values.password,
        isCompany
      });

      setResetSuccess(true);
      toast.success('Password has been reset successfully');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to reset password');
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-md p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-20 -mt-20 z-0" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-50 rounded-full -ml-16 -mb-16 z-0" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                <LockKeyhole className="w-8 h-8 text-[#0D3880]" />
              </div>
              <h2 className="text-3xl font-bold text-[#0D3880] mb-3">Reset Password</h2>
              <p className="text-gray-600">
                Please enter and confirm your new password below.
              </p>
            </div>

            {resetSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Password Reset Successful!</h3>
                <p className="text-gray-600 mb-4">Redirecting you to login...</p>
              </div>
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="space-y-6">
                  <FormInput
                    label="New Password"
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                  />
                  <FormInput
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-[#E60278] text-white py-3 px-4 rounded-lg hover:bg-[#E60278]/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Resetting Password...
                      </span>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </Form>
              </Formik>
            )}

            <div className="mt-8 text-center">
              <a 
                href="/auth/login" 
                className="inline-flex items-center text-sm text-gray-600 hover:text-[#E60278] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
