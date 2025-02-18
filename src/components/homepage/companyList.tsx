import React from 'react';
import CompanyCard from './companyCard';

interface CompaniesListProps {
  companies: Array<{
    id: number;
    companyName: string;
    logo: string | null;
    description: string;
    jobCount: number;
  }>;
}

export default function CompaniesList({ companies }: CompaniesListProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0D3880] mb-2">
          Top Employers
        </h2>
        <p className="text-gray-600">
          Discover great companies hiring now
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}