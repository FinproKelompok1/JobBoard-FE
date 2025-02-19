import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';

export default function SocialAuth({ role }: { role: string }) {
  const [isLoading, setIsLoading] = useState({
    google: false,
    facebook: false
  });

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setIsLoading(prev => ({ ...prev, [provider]: true }));

      // Langsung ke backend, bukan melalui frontend route
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_BE || 'http://localhost:8000/api';
      const authUrl = `${baseUrl}/auth/${provider}`;

      // Gunakan window.location.href untuk redirect
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

      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading.google}
          className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          <FcGoogle className="w-5 h-5" />
          <span>{isLoading.google ? 'Loading...' : 'Google'}</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin('facebook')}
          disabled={isLoading.facebook}
          className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          <BsFacebook className="w-5 h-5 text-blue-600" />
          <span>{isLoading.facebook ? 'Loading...' : 'Facebook'}</span>
        </button>
      </div>
    </>
  );
}