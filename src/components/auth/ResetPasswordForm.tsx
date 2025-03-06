'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormInput from './formInput';
import { resetPassword } from '@/libs/changePassword';
import { toast } from 'react-toastify';
import { LockKeyhole, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isCompany, setIsCompany] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenParam = urlParams.get('token');
      const isCompanyParam = urlParams.get('isCompany') === 'true';
      
      setToken(tokenParam);
      setIsCompany(isCompanyParam);
    }
  }, []);

  useEffect(() => {
    if (token === null) return; 
    
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

  if (token === null) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0">
          <Image 
            src="/login.jpg" 
            alt="Background" 
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-[#000000]/70"></div>
        </div>
        <div className="relative z-10 w-full max-w-md p-8">
          <div className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-lg text-center border border-white/20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white/80">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Full background image */}
      <div className="absolute inset-0">
        <Image 
          src="/login.jpg" 
          alt="Background" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-[#000000]/70"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header Bar */}
          <div className="bg-[#0D3880]/80 backdrop-blur-sm py-2 px-4 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-white" />
              <p className="text-white text-sm font-semibold">SECURE PASSWORD RESET</p>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-[#0D3880]/20 backdrop-blur-sm border border-[#0D3880]/30 rounded-full mb-4">
                <LockKeyhole className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
              <p className="text-white/70 text-sm">
                Please enter and confirm your new password below.
              </p>
            </div>

            {resetSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Password Reset Successful!</h3>
                <p className="text-white/70 mb-4">Redirecting you to login...</p>
              </div>
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="space-y-5">
                  <div>
                    <label className="block text-white/80 text-sm mb-1">New Password</label>
                    <div className="relative">
                      <FormInput
                        label=""
                        name="password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm mb-1">Confirm New Password</label>
                    <div className="relative">
                      <FormInput
                        label=""
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

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

            <div className="mt-6 text-center">
              <a 
                href="/auth/login" 
                className="inline-flex items-center text-sm text-white/80 hover:text-white transition-colors"
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