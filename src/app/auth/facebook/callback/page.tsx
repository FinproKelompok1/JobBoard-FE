'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingPage from '@/components/loading';

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        if (!code) {
          router.push('/login?error=No authorization code received');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_BE}/auth/google/callback?code=${code}`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate');
        }

        router.push('/dashboard');
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login?error=Authentication failed');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return <LoadingPage />;
}