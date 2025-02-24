// components/apply/Sidebar.tsx
import { Info, CheckCircle, AlertTriangle } from 'lucide-react';

export function ApplicationGuidelines() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <Info className="w-5 h-5 text-[#0D3880]" />
        <h2 className="text-lg font-semibold text-[#0D3880]">Application Guidelines</h2>
      </div>
      <ul className="space-y-3">
        <li className="flex items-start space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          <span className="text-sm text-gray-600">Ensure your resume is up-to-date and in PDF format</span>
        </li>
        <li className="flex items-start space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          <span className="text-sm text-gray-600">File size should not exceed 5MB</span>
        </li>
        <li className="flex items-start space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          <span className="text-sm text-gray-600">Include your expected salary range</span>
        </li>
      </ul>
    </div>
  );
}

export function SuccessTips() {
  return (
    <div className="bg-blue-50 rounded-xl shadow-lg p-6 border border-blue-100">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-blue-800">Tips for Success</h2>
      </div>
      <ul className="space-y-3 text-sm text-blue-700">
        <li>Make sure your resume highlights relevant experience</li>
        <li>Research market rates for salary expectations</li>
        <li>Double-check all information before submitting</li>
      </ul>
    </div>
  );
}

export function ContactSupport() {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Need Help?</h3>
      <p className="text-sm text-gray-600 mb-4">
        If you're experiencing any issues, our support team is here to help. Click below to send us an email.
      </p>
      <a 
        href="mailto:finprokelompok1@gmail.com" 
        className="inline-flex items-center text-[#E60278] hover:text-[#E60278]/90 text-sm font-medium group"
      >
        Contact Support 
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </a>
    </div>
  );
}