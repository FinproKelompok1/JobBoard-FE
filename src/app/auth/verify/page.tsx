'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/libs/auth';
import { toastErrAxios } from '@/helpers/toast';
import axios from 'axios';

type VerificationStatus = 'loading' | 'success' | 'error' | 'already-verified';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          setStatus('error');
          setMessage('No verification token provided');
          return;
        }

        await authService.verifyEmail(token);
        setStatus('success');
        setMessage('Email verified successfully!');
        
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } catch (error) {
        toastErrAxios(error);

        if (axios.isAxiosError(error) && error.response?.data) {
          setStatus(
            error.response.data.message === 'Email already verified'
              ? 'already-verified'
              : 'error'
          );
          setMessage(error.response.data.message);
        } else {
          setStatus('error');
          setMessage('Verification failed');
        }
      }
    };

    verifyEmail();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        {status === 'loading' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0D3880] mb-4">
              Verifying your email...
            </h2>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E60278] mx-auto"></div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0D3880] mb-4">
              Email Verified!
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting to login page in a few seconds...
            </p>
          </div>
        )}

        {status === 'already-verified' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0D3880] mb-4">
              Already Verified
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => router.push('/auth/login')}
              className="text-[#E60278] hover:underline"
            >
              Go to Login
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => router.push('/auth/login')}
              className="text-[#E60278] hover:underline"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
