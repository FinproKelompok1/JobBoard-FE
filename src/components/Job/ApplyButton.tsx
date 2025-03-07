import ShareButton from './shareButton';
import { useState, useEffect, useRef } from 'react';

interface ApplyButtonProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  location: string;
  isTestActive: boolean;
  hasApplied: boolean;
  isLoggedIn: boolean;
  endDate: string; 
  onApply: () => void;
  footerSelector?: string; 
}

export function ApplyButton({ 
  jobTitle,
  companyName,
  location,
  hasApplied, 
  isLoggedIn,
  endDate, 
  onApply,
  footerSelector = 'footer' 
}: ApplyButtonProps) {
  const [isVisible, setIsVisible] = useState(true);
  const buttonRef = useRef(null);
  
  const isDeadlinePassed = new Date(endDate) < new Date();

  useEffect(() => {
    const footer = document.querySelector(footerSelector);
    if (!footer || !buttonRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
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

  const getButtonStyle = () => {
    if (isDeadlinePassed) {
      return 'bg-gray-400 text-white cursor-not-allowed opacity-50';
    } else if (isLoggedIn && hasApplied) {
      return 'bg-gray-400 text-white cursor-not-allowed opacity-50';
    } else {
      return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  const getButtonText = () => {
    if (isDeadlinePassed) {
      return 'Deadline Passed';
    } else if (isLoggedIn && hasApplied) {
      return 'Already Applied';
    } else {
      return 'Apply Now';
    }
  };

  if (!isVisible) return null;

  return (
    <div ref={buttonRef} className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
      <div className="container mx-auto flex justify-between items-start md:items-center md:flex-row flex-col gap-4">
        <div>
          <ShareButton 
            jobTitle={jobTitle}
            jobUrl={window.location.href}
            companyName={companyName}
            location={location}
          />
        </div>
        <button 
          onClick={onApply}
          disabled={isDeadlinePassed || (isLoggedIn && hasApplied)}
          className={`px-8 py-3 rounded-lg ${getButtonStyle()}`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}