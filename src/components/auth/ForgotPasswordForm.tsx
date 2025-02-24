'use client';

import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from './formInput';
import UserTypeToggle from './UserType';
import { forgotPassword } from '@/libs/changePassword';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  isCompany: Yup.boolean()
});

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    isCompany: false
  };

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      setLoading(true);
      await forgotPassword({
        email: values.email,
        isCompany: values.isCompany
      });
      
      // Reset form after successful submission
      resetForm();
      
    } catch (error: any) {
      // Error handling done in service
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-sm">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold text-[#0D3880] mb-6">Forgot Password</h2>
          <p className="text-gray-600 mb-8">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>

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
                  placeholder="Enter your email"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#E60278] text-white py-2 px-4 rounded-md hover:bg-[#E60278]/90 transition-colors ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Sending Instructions...' : 'Send Reset Instructions'}
                </button>
              </Form>
            )}
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
    </div>
  );
}