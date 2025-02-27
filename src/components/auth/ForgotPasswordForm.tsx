'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import UserTypeToggle from './UserType';
import { forgotPassword } from '@/libs/changePassword';
import { checkIfOauthUser } from '@/libs/auth'; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'; 

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  isCompany: Yup.boolean()
});

interface FormValues {
  email: string;
  isCompany: boolean;
}

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [isOauth, setIsOauth] = useState(false);
  const [isOauthDialogOpen, setIsOauthDialogOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const initialValues: FormValues = {
    email: '',
    isCompany: false
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      setLoading(true);
      
      const isOauthUser = await checkIfOauthUser(values.email, values.isCompany);
      
      if (isOauthUser) {
        setIsOauthDialogOpen(true);
      } else {
        await forgotPassword({ email: values.email, isCompany: values.isCompany });
        resetForm();
      }
    } catch (error) {
      console.error('Error in forgot password:', error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const checkOauthStatus = async (email: string, isCompany: boolean) => {
    if (email) {
      try {
        const isOauthUser = await checkIfOauthUser(email, isCompany);
        setIsOauth(isOauthUser);
        return isOauthUser;
      } catch (error) {
        console.error('Error checking OAuth status:', error);
        return false;
      }
    }
    return false;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-sm">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold text-[#0D3880] mb-6">Forgot Password</h2>
          <p className="text-gray-600 mb-8">Enter your email address and we&apos;ll send you instructions to reset your password.</p>
          
          <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, handleBlur: formikHandleBlur }) => {
              const handleCompanyToggle = async (isCompany: boolean) => {
                setFieldValue('isCompany', isCompany);
                if (values.email && isTouched) {
                  await checkOauthStatus(values.email, isCompany);
                }
              };

              return (
                <Form className="space-y-4">
                  <UserTypeToggle 
                    isCompany={values.isCompany} 
                    setFieldValue={(field, value) => {
                      if (field === 'isCompany') {
                        handleCompanyToggle(value);
                      } else {
                        setFieldValue(field, value);
                      }
                    }}
                  />
                  
                  <div className="space-y-1">
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E60278] focus:border-[#E60278]"
                        onBlur={async (e: React.FocusEvent<HTMLInputElement>) => {
                          formikHandleBlur(e);
                          if (e.target.value) {
                            setIsTouched(true);
                            await checkOauthStatus(e.target.value, values.isCompany);
                          }
                        }}
                      />
                    </div>
                    
                    {isOauth && isTouched && (
                      <p className="text-amber-600 text-sm">
                        This email is associated with a social login account. Password reset is not available.
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || (isOauth && isTouched)}
                    className={`w-full py-2 px-4 rounded-md transition-colors
                      ${
                        isOauth && isTouched
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-[#E60278] text-white hover:bg-[#E60278]/90'
                      } 
                      ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={async (e) => {
                      if (isOauth && isTouched) {
                        e.preventDefault();
                        setIsOauthDialogOpen(true);
                      }
                    }}
                  >
                    {loading ? 'Sending Instructions...' : 'Send Reset Instructions'}
                  </button>
                </Form>
              );
            }}
          </Formik>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <a href="/auth/login" className="text-[#E60278] hover:underline">Back to Login</a>
            </p>
          </div>
        </div>
      </div>
      
      <Dialog open={isOauthDialogOpen} onOpenChange={setIsOauthDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#0D3880]">Social Login Account</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-gray-700 mb-2">We&apos;ve detected that you signed up using a social login provider (Google or Facebook).</p>
            <p className="text-gray-700 mb-2">Password reset is not available for social login accounts.</p>
            <p className="text-gray-700">Please use the &quot;Continue with Google&quot; or &quot;Continue with Facebook&quot; button on the login page to access your account.</p>
          </div>
          
          <DialogFooter>
            <button
              onClick={() => setIsOauthDialogOpen(false)}
              className="bg-[#E60278] text-white py-2 px-4 rounded-md hover:bg-[#E60278]/90 transition-colors"
            >
              I Understand
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}