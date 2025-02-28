'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import FormInput from '@/components/auth/shared/formInput';
import { validationSchema } from './validation';
import UserTypeToggle from '@/components/auth/shared/userTypeToggle';
import { authService } from '@/libs/auth';
import Image from 'next/image';
import axios from 'axios';

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-4xl w-full flex gap-8 p-8">
                <div className="flex-1 bg-white p-8 rounded-lg shadow-sm">
                    <div className="max-w-sm mx-auto">
                        <h2 className="text-2xl font-bold text-[#0D3880] mb-8">Complete Registration</h2>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, setFieldValue }) => (
                                <Form className="space-y-4" key={values.isCompany ? 'admin' : 'user'}>
                                    <UserTypeToggle
                                        isCompany={values.isCompany}
                                        setFieldValue={setFieldValue}
                                    />

                                    {values.isCompany ? (
                                        <>
                                            <FormInput label="Company Name" name="companyName" type="text" />
                                            <FormInput label="Phone Number" name="phoneNumber" type="tel" />
                                        </>
                                    ) : (
                                        <FormInput label="Username" name="username" type="text" />
                                    )}

                                    <div className="flex items-center">
                                        <Field
                                            type="checkbox"
                                            name="terms"
                                            className="h-4 w-4 text-[#E60278] rounded"
                                        />
                                        <label className="ml-2 text-sm text-gray-600">
                                            I agree to the Terms & Policy
                                        </label>
                                        <ErrorMessage
                                            name="terms"
                                            component="div"
                                            className="text-red-500 text-sm ml-2"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#E60278] text-white py-2 px-4 rounded-md hover:bg-[#E60278]/90 transition-colors"
                                    >
                                        Submit
                                    </button>
                                </Form>
                            )}

                        </Formik>
                    </div>
                </div>

                <div className="hidden lg:block flex-1">
                    <Image
                        src="/api/placeholder/600/800"
                        alt="Decorative"
                        width={600}
                        height={800}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}
