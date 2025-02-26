import React from 'react';
import CompanyCard from './companyCard';

interface Company {
  id: number;
  companyName: string;
  logo: string | null;
  jobCount: number;
  Job?: {
    location?: {
      city?: string;
      province?: string;
    }
  }[];
}

interface CompaniesListProps {
  companies?: Company[];
}

export default function CompaniesList({ companies }: CompaniesListProps) {
  const validCompanies = Array.isArray(companies) ? companies : [];

  return (
    <div>
      <div className="mb-3">
        <h2 className="text-2xl font-bold text-[#0D3880] mb-1">
          Top Employers
        </h2>
        <p className="text-gray-600">
          Discover great companies hiring now
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-3">
        {validCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}