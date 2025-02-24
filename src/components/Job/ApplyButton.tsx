import { ClipboardCheck } from 'lucide-react';
import ShareButton from './shareButton';
import { useState, useEffect, useRef } from 'react';

interface ApplyButtonProps {
  jobId: string;
  isTestActive: boolean;
  hasApplied: boolean;
  isLoggedIn: boolean;
  onApply: () => void;
  footerSelector?: string; // Selector for the footer element
}

export function ApplyButton({ 
  jobId, 
  isTestActive, 
  hasApplied, 
  isLoggedIn,
  onApply,
  footerSelector = 'footer' // Default selector
}: ApplyButtonProps) {
  const [isVisible, setIsVisible] = useState(true);
  const buttonRef = useRef(null);

  useEffect(() => {
    const footer = document.querySelector(footerSelector);
    if (!footer || !buttonRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide button when footer is intersecting
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, [footerSelector]);

  const buttonStyle = isLoggedIn && hasApplied 
    ? 'bg-gray-400 text-white cursor-not-allowed opacity-50'
    : 'bg-blue-600 text-white hover:bg-blue-700';

  const buttonText = isLoggedIn && hasApplied 
    ? 'Already Applied'
    : 'Apply Now';

  if (!isVisible) return null;

  return (
    <div ref={buttonRef} className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
      <div className="container mx-auto flex justify-end items-center gap-4">
        <div>
          <ShareButton 
            jobTitle="Programmer"
            jobUrl={window.location.href}
            companyName="Bagaskara"
            location="KOTA BANDUNG, JAWA BARAT"
          />
        </div>
        <button 
          onClick={onApply}
          disabled={isLoggedIn && hasApplied}
          className={`px-8 py-3 rounded-lg ${buttonStyle}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}