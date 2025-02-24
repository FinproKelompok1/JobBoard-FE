'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from './formInput';
import { resetPassword } from '@/libs/changePassword';
import { toast } from 'react-toastify';

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

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // Get token and isCompany from URL
  const token = searchParams.get('token');
  const isCompany = searchParams.get('isCompany') === 'true';

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing reset token');
      router.push('/auth/login');
    }
  }, [token, router]);

  const initialValues = {
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setLoading(true);
      await resetPassword({
        token: token!,
        password: values.password,
        isCompany
      });
      
      toast.success('Password has been reset successfully');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error: any) {
      // Error handling done in service
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full flex gap-8 p-8">
        <div className="flex-1 bg-white p-8 rounded-lg shadow-sm">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-[#0D3880] mb-6">Set New Password</h2>
            <p className="text-gray-600 mb-8">
              Please enter and confirm your new password below.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-4">
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
                  className={`w-full bg-[#E60278] text-white py-2 px-4 rounded-md hover:bg-[#E60278]/90 transition-colors ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </button>
              </Form>
            </Formik>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <a href="/auth/login" className="text-[#E60278] hover:underline">
                  Back to Login
                </a>
              </p>
            </div>
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