'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import  { isAxiosError } from 'axios';
import { useEffect } from 'react';

export default function VerifyEmailChangePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmailChange = async () => {
      try {
        setTimeout(() => {
          router.push('/profile');
        }, 3000);
        
        toast.success('Email changed successfully!');
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data?.message || 'Email change verification failed');
        } else {
          toast.error('Email change verification failed');
        }
      }
    };

    verifyEmailChange();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-[#0D3880] mb-4">
          Email Changed Successfully!
        </h2>
        <p className="text-gray-600 mb-4">
          Your email has been verified and updated.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to profile page in a few seconds...
        </p>
      </div>
    </div>
  );
}