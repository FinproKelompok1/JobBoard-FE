import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function SocialAuth() {
  const [isLoading, setIsLoading] = useState({ google: false });

  const handleSocialLogin = async (provider: 'google') => {
    try {
      setIsLoading(prev => ({ ...prev, [provider]: true }));

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_BE || 'http://localhost:8000/api';
      const authUrl = `${baseUrl}/auth/${provider}`;

      window.location.href = authUrl;
    } catch (error) {
      console.error(`${provider} login error:`, error);
    }
  };

  return (
    <>
      <div className="relative my-3">
        <div className="absolute inset-0 flex items-center">
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading.google}
          className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-white">{isLoading.google ? 'Loading...' : 'Google'}</span>
        </button>
      </div>
    </>
  );
}