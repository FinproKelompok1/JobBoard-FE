import { useState, useEffect } from 'react';

interface LocationPromptProps {
  onAllow: (allow: boolean) => void;
}

export default function LocationPrompt({ onAllow }: LocationPromptProps) {
  const [showPrompt, setShowPrompt] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const hasShownPrompt = sessionStorage.getItem('locationPromptShown');
    
    if (hasShownPrompt) {
      setShowPrompt(false);
      
      const previousChoice = sessionStorage.getItem('locationChoice');
      if (previousChoice) {
        onAllow(previousChoice === 'true');
      }
    }
  }, [onAllow]);

  const handleLocationChoice = async (useLocation: boolean) => {
    sessionStorage.setItem('locationPromptShown', 'true');
    
    sessionStorage.setItem('locationChoice', String(useLocation));
    
    if (!useLocation) {
      onAllow(false);
      return;
    }
    
    setShowPrompt(false);
    setShowLoading(true);
    
    setTimeout(() => {
      onAllow(true);
    }, 3000);
  };

  if (!showPrompt && !showLoading) {
    return null;
  }

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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Requesting Location
          </h2>
          <p className="text-gray-600 mb-6">
            Please respond to the browser&apos;s location request prompt.
          </p>
          <p className="text-gray-600 mb-6">
            If you deny access, we&apos;ll show you the latest jobs instead.
          </p>
        </div>
      )}
    </div>
  );
}