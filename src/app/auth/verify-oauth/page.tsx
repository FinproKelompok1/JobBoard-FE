'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { validationSchema } from './validation';
import UserTypeToggle from '@/components/auth/shared/userTypeToggle';
import { authService } from '@/libs/auth';
import Image from 'next/image';
import axios from 'axios';
import { ArrowLeft, Mail} from 'lucide-react';

interface FormValues {
    username: string;
    companyName: string;
    phoneNumber: string;
    isCompany: boolean;
    terms: boolean;
}

export default function VerifyOauthPage() {
    const router = useRouter();
    const [error, setError] = useState<string>('');

    const getCookie = (key: string): string | null => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieKey, cookieVal] = cookie.trim().split('=');
            if (cookieKey === key) {
                return decodeURIComponent(cookieVal);
            }
        }
        return null;
    };

    useEffect(() => {
        const user = getCookie('user');
        if (!user) {
            router.push("/login");
            return;
        }

        try {
            const userObject = JSON.parse(user);

            if (userObject.role === 'none') return;

            router.push("/");
        } catch (err) {
            console.error(err);
        }
    }, [router]);

    const initialValues: FormValues = {
        username: '',
        companyName: '',
        phoneNumber: '',
        isCompany: false,
        terms: false
    };

    const handleSubmit = async (values: FormValues, { setSubmitting, setFieldError }: FormikHelpers<FormValues>) => {
        try {
            await authService.completeOauth({
                type: values.isCompany ? 'admin' : 'user',
                username: values.username,
                company: values.companyName,
                phone: values.phoneNumber,
            });

            router.push('/');
            setError('');
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data) {
                const errorMessage = err.response.data.message || 'Registration failed';
                if (errorMessage.includes('Email already registered')) {
                    setFieldError('email', 'Email already registered');
                } else if (errorMessage.includes('Username already taken')) {
                    setFieldError('username', 'Username already taken');
                } else {
                    setError(errorMessage);
                }
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setSubmitting(false);
        }
    };

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
            
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="text-center mb-6">
                            <div className="inline-block p-3 bg-[#0D3880]/20 backdrop-blur-sm border border-[#0D3880]/30 rounded-full mb-4">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Complete Registration</h2>
                            <p className="text-white/70 text-sm">
                                Complete your account information to continue
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-md text-red-200">
                                {error}
                            </div>
                        )}

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, setFieldValue }) => (
                                <Form className="space-y-5" key={values.isCompany ? 'admin' : 'user'}>
                                    <UserTypeToggle
                                        isCompany={values.isCompany}
                                        setFieldValue={setFieldValue}
                                    />

                                    {values.isCompany ? (
                                        <>
                                            <div className="space-y-1">
                                                <label htmlFor="companyName" className="block text-sm font-medium text-white/80 mb-1">
                                                    Company Name
                                                </label>
                                                <div className="relative">
                                                    <Field
                                                        id="companyName"
                                                        name="companyName"
                                                        type="text"
                                                        placeholder="Enter company name"
                                                        className="w-full pl-3 pr-3 py-2.5 bg-white/10 backdrop-blur-md border border-white/30 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-[#E60278] focus:border-[#E60278]"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="companyName"
                                                    component="div"
                                                    className="text-red-300 text-sm mt-1"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-white/80 mb-1">
                                                    Phone Number
                                                </label>
                                                <div className="relative">
                                                    <Field
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        type="tel"
                                                        placeholder="Enter phone number"
                                                        className="w-full pl-3 pr-3 py-2.5 bg-white/10 backdrop-blur-md border border-white/30 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-[#E60278] focus:border-[#E60278]"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="phoneNumber"
                                                    component="div"
                                                    className="text-red-300 text-sm mt-1"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-1">
                                            <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-1">
                                                Username
                                            </label>
                                            <div className="relative">
                                                <Field
                                                    id="username"
                                                    name="username"
                                                    type="text"
                                                    placeholder="Enter username"
                                                    className="w-full pl-3 pr-3 py-2.5 bg-white/10 backdrop-blur-md border border-white/30 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-[#E60278] focus:border-[#E60278]"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="username"
                                                component="div"
                                                className="text-red-300 text-sm mt-1"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center">
                                        <Field
                                            type="checkbox"
                                            name="terms"
                                            className="h-4 w-4 text-[#E60278] bg-white/10 border-white/30 rounded"
                                        />
                                        <label className="ml-2 text-sm text-white/80">
                                            I agree to the Terms & Policy
                                        </label>
                                        <ErrorMessage
                                            name="terms"
                                            component="div"
                                            className="text-red-300 text-sm ml-2"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#E60278] text-white py-2.5 px-4 rounded-md hover:bg-[#E60278]/90 transition-colors"
                                    >
                                        Submit
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        
                        <div className="mt-6 text-center">
                            <a 
                                href="/login" 
                                className="inline-flex items-center text-sm text-white/80 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Already have an account? Back to Login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
