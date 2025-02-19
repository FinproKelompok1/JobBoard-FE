import React from 'react';
import Link from 'next/link';
import { Building2, Briefcase, MapPin } from 'lucide-react';

interface CompanyCardProps {
  company: {
    id: number;
    companyName: string;
    logo: string | null;
    jobCount: number;
    Job?: Array<{
      location?: {
        city?: string;
        province?: string;
      }
    }>;
  };
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const uniqueLocations = Array.from(new Set(
    company.Job?.map(job => 
      job.location ? `${job.location.city || ''}, ${job.location.province || ''}` : ''
    ).filter(location => location !== ', ' && location !== '') || []
  )).slice(0, 2); 

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-xl w-full p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          {company.logo ? (
            <img 
              src={company.logo} 
              alt={company.companyName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[#0D3880] mb-2 truncate">
            {company.companyName}
          </h3>
          
          <div className="flex items-center mb-2">
            <Briefcase className="w-4 h-4 text-[#E60278] mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600">
              {company.jobCount} open positions
            </span>
          </div>

          {uniqueLocations.length > 0 && (
            <div className="space-y-1 mb-3">
              {uniqueLocations.map((location, index) => (
                <div key={index} className="flex items-center">
                  <MapPin className="w-4 h-4 text-[#E60278] mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{location}</span>
                </div>
              ))}
              {(company.Job?.length || 0) > 2 && (
                <span className="text-sm text-gray-500 ml-6">
                  +{(company.Job?.length || 0) - 2} more locations
                </span>
              )}
            </div>
          )}

          <Link 
            href={`/companies-detail/${company.id}`}
            className="inline-flex items-center text-[#E60278] hover:text-[#E60278]/90 text-sm font-medium transition-colors"
          >
            View Company Profile
            <svg 
              className="w-4 h-4 ml-1 flex-shrink-0" 
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
      </div>
    </div>
  );
}