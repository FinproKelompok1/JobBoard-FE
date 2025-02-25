import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Company {
  id: number;
  companyName: string;
  logo: string | null;
  description: string;
  jobCount: number;
  Job: Array<{
    location: {
      city: string;
      province: string;
    }
  }>;
}

interface CompanyPreviewProps {
  companies: Company[];
}

export default function CompanyPreview({ companies }: CompanyPreviewProps) {
  const previewCompanies = companies.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#0D3880] mb-2">
            Featured Companies
          </h2>
          <p className="text-gray-600">
            Discover top companies hiring now
          </p>
        </div>
        <Link 
          href="/companies" 
          className="px-4 py-2 bg-[#E60278] text-white rounded-lg hover:bg-[#E60278]/90 transition-colors"
        >
          View All Companies
        </Link>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewCompanies.map((company) => (
          <div key={company.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {company.companyName}
                </h3>
                {company.Job[0] && (
                  <p className="text-sm text-gray-500">
                    {company.Job[0].location.city}, {company.Job[0].location.province}
                  </p>
                )}
              </div>
              {company.logo && (
                <div className="relative h-12 w-12">
                  <Image
                    src={company.logo}
                    alt={company.companyName}
                    fill
                    sizes="48px"
                    className="object-contain rounded"
                  />
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {company.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#E60278]">
                {company.jobCount} open positions
              </span>
              <Link
                href={`/companies/${company.id}`}
                className="text-sm font-medium text-[#0D3880] hover:text-[#0D3880]/80 transition-colors"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}