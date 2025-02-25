import { useState } from 'react';

interface LocationPromptProps {
  onAllow: (allow: boolean) => void;
}

export default function LocationPrompt({ onAllow }: LocationPromptProps) {
  const [showPrompt, setShowPrompt] = useState(true);
  
  const handleLocationChoice = async (useLocation: boolean) => {
    if (!useLocation) {
      onAllow(false);
      return;
    }
    
    setShowPrompt(false);
    
    setTimeout(() => {
      onAllow(true);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {showPrompt ? (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Location Access
          </h2>
          <p className="text-gray-600 mb-6">
            Would you like to see jobs near your location or view the latest jobs?
          </p>
          <div className="flex justify-between space-x-4">
            <button
              onClick={() => handleLocationChoice(false)}
              className="px-4 py-3 text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition-colors flex-1"
            >
              Latest Jobs
            </button>
            <button
              onClick={() => handleLocationChoice(true)}
              className="px-4 py-3 bg-[#0D3880] text-white rounded hover:bg-[#0D3880]/90 transition-colors flex-1"
            >
              Jobs Near Me
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Requesting Location
          </h2>
          <p className="text-gray-600 mb-6">
            Please respond to the browser&apos;s location request prompt.
          </p>
          <p className="text-sm text-gray-500">
            If you deny access, we&apos;ll show you the latest jobs instead.
          </p>
        </div>
      )}
    </div>
  );
}