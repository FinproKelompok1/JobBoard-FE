import React from 'react';
import Link from 'next/link';
import { Building2, Briefcase } from 'lucide-react';

interface CompanyCardProps {
  company: {
    id: number;
    companyName: string;
    logo: string | null;
    description: string;
    jobCount: number;
  };
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow w-63 h-54 flex flex-col">
      <div className="flex items-start space-x-4 flex-grow">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          {company.logo ? (
            <img 
              src={company.logo} 
              alt={company.companyName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-[#0D3880] mb-2">
            {company.companyName}
          </h3>
          
          <div className="flex items-center mb-3">
            <Briefcase className="w-4 h-4 text-[#E60278] mr-2" />
            <span className="text-sm text-gray-600">
              {company.jobCount} open positions
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            {truncateDescription(company.description, 50)}
          </p>
        </div>
      </div>

      <Link 
        href={`/companies-detail/${company.id}`}
        className="inline-flex items-center text-[#E60278] hover:text-[#E60278]/90 text-sm font-medium transition-colors"
      >
        View Company Profile
        <svg 
          className="w-4 h-4 ml-1" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </Link>
    </div>
  );
}
