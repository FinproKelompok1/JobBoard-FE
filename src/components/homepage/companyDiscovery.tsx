'use client';

import React, { useEffect, useState } from 'react';
import { getCompanies, type Company } from '@/libs/company';
import CompanyCard from './companyCard';
import LoadingState from './loadingState';
import { useRouter } from 'next/navigation';

export default function CompanyDiscovery() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const DISPLAY_LIMIT = 4; // Limit to display only 4 companies
  const router = useRouter();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        const response = await getCompanies();
        setCompanies(response.data);
      } catch  {
        setError('Failed to fetch companies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleViewAllCompanies = () => {
    router.push('/companies');
  };

  if (isLoading) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <LoadingState />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[150px] flex items-center justify-center text-red-500">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (companies.length === 0) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[150px] flex items-center justify-center text-gray-500">
            No companies found
          </div>
        </div>
      </section>
    );
  }

  // Get only the first 4 companies
  const limitedCompanies = companies.slice(0, DISPLAY_LIMIT);
  const hasMoreCompanies = companies.length > DISPLAY_LIMIT;

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#0D3880] mb-1">
              Top Employers
            </h2>
            <p className="text-gray-600">
              Discover great companies hiring now
            </p>
          </div>
          {hasMoreCompanies && (
            <button
              onClick={handleViewAllCompanies}
              className="px-4 py-2 bg-[#0D3880] text-white rounded hover:bg-[#0D3880]/90 transition-colors"
            >
              View All Companies
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3">
          {limitedCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}