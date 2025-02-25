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
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or continue with</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading.google}
          className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          <FcGoogle className="w-5 h-5" />
          <span>{isLoading.google ? 'Loading...' : 'Google'}</span>
        </button>
      </div>
    </>
  );
}