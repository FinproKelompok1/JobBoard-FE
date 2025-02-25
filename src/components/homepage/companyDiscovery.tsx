'use client';

import React, { useEffect, useState } from 'react';
import { getCompanies, type Company } from '@/libs/company';
import CompaniesList from './companyList';
import LoadingState from './loadingState';

export default function CompanyDiscovery() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <LoadingState />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[200px] flex items-center justify-center text-red-500">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (companies.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[200px] flex items-center justify-center text-gray-500">
            No companies found
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <CompaniesList companies={companies} />
      </div>
    </section>
  );
}