'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
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
import { ArrowLeft, Mail, AlertTriangle } from 'lucide-react';

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
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-[#0D3880]/20 backdrop-blur-sm border border-[#0D3880]/30 rounded-full mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Forgot Password</h2>
              <p className="text-white/70 text-sm">
                Enter your email address and we&apos;ll send you instructions to reset your password.
              </p>
            </div>

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
                  <Form className="space-y-5">
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
                        <label htmlFor="email" className="block text-sm font-medium text-white/80">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-3 py-2.5 bg-white/10 backdrop-blur-md border border-white/30 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-[#E60278] focus:border-[#E60278]"
                            onBlur={async (e: React.FocusEvent<HTMLInputElement>) => {
                              formikHandleBlur(e);
                              if (e.target.value) {
                                setIsTouched(true);
                                await checkOauthStatus(e.target.value, values.isCompany);
                              }
                            }}
                          />
                        </div>
                      </div>
                      
                      {isOauth && isTouched && (
                        <div className="flex items-start mt-2 p-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-md">
                          <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-amber-200 text-sm">
                            This email is associated with a social login account. Password reset is not available.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading || (isOauth && isTouched)}
                      className={`w-full py-2.5 px-4 rounded-md transition-colors
                        ${
                          isOauth && isTouched
                            ? 'bg-gray-500/30 text-white/50 backdrop-blur-sm cursor-not-allowed'
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
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending Instructions...
                        </span>
                      ) : (
                        'Send Reset Instructions'
                      )}
                    </button>
                  </Form>
                );
              }}
            </Formik>
            
            <div className="mt-6 text-center">
              <a 
                href="/auth/login" 
                className="inline-flex items-center text-sm text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Remember your password? Back to Login
              </a>
            </div>
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