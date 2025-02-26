import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Briefcase, MapPin, ChevronRight } from 'lucide-react';

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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow transition-all duration-300 w-full max-w-xs mx-auto">
      <div className="p-4 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-50">
            {company.logo ? (
              <div className="relative w-full h-full">
                <Image 
                  src={company.logo} 
                  alt={company.companyName} 
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-[#0D3880] truncate max-w-full">
              {company.companyName}
            </h3>
            <div className="flex items-center mt-1">
              <Briefcase className="w-3.5 h-3.5 text-[#E60278] mr-1.5 flex-shrink-0" />
              <span className="text-xs text-gray-600 truncate">{company.jobCount} open positions</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        {uniqueLocations.length > 0 && (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-2">Locations</div>
            <div className="space-y-2">
              {uniqueLocations.map((location, index) => (
                <div key={index} className="flex items-start">
                  <MapPin className="w-3.5 h-3.5 text-[#E60278] mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 leading-tight truncate max-w-[200px]">{location}</span>
                </div>
              ))}
              {(company.Job?.length || 0) > 2 && (
                <div className="text-xs text-gray-500 ml-5 truncate">
                  +{(company.Job?.length || 0) - 2} more locations
                </div>
              )}
            </div>
          </div>
        )}
        
        <Link 
          href={`/companies-detail/${company.id}`}
          className="mt-4 flex w-full items-center justify-center gap-1 py-2 px-4 bg-gray-50 hover:bg-[#E60278] hover:text-white text-[#E60278] rounded-md transition-colors text-sm font-medium border border-gray-200"
        >
          <span className="truncate">View Company Profile</span>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
        </Link>
      </div>
    </div>
  );
}