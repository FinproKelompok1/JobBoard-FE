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
        const error = searchParams.get('error');

        if (error) {
          router.push(`/login?error=${encodeURIComponent(error)}`);
          return;
        }

        if (!code) {
          router.push('/login?error=No authorization code received');
          return;
        }

        // Langsung ke endpoint backend yang benar
        const backendUrl = `${process.env.BASE_URL_BE}/auth/google/callback`;
        const fullUrl = `${backendUrl}?code=${code}`;
        
        console.log('Redirecting to:', fullUrl); // Untuk debugging
        window.location.replace(fullUrl);
        
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login?error=Authentication failed');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return <LoadingPage />;
}