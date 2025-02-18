'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useJobs } from '@/hooks/useJobs';
import JobFilter, { FilterParams } from '@/components/homepage/filter';
import JobsList from '@/components/homepage/jobList';
import LoadingState from '@/components/homepage/loadingState';
import { getCategoryIcon } from '@/helpers/category';
import { CurrencyFormatter } from '../../../helpers/currencryFormatter';

export default function AllJobsPage() {
  const searchParams = useSearchParams();
  const { jobs, isLoading, fetchJobs } = useJobs(null);

  React.useEffect(() => {
    const initialFilters = {
      searchTerm: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      province: searchParams.get('province') || '',
      city: searchParams.get('city') || ''
    };
    
    fetchJobs(initialFilters);
  }, [searchParams, fetchJobs]);

  const handleFilter = (filters: FilterParams) => {
    fetchJobs(filters);
  };

  const initialFilters = {
    searchTerm: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    province: searchParams.get('province') || '',
    city: searchParams.get('city') || ''
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0D3880] mb-2">
            Semua Lowongan Pekerjaan
          </h1>
          <p className="text-gray-600">
            Temukan peluang karir yang sesuai dengan keahlian dan minat Anda
          </p>
        </div>

        <JobFilter 
          onSearch={handleFilter} 
          isHero={false}
          className="mb-8 p-4 bg-white rounded-lg shadow"
          initialFilters={initialFilters}
        />

        {isLoading ? (
          <LoadingState />
        ) : (
         <JobsList 
  jobs={jobs}
  userLocation={null}
  CurrencyFormatter={CurrencyFormatter}
  getCategoryIcon={getCategoryIcon}
/>

        )}
      </div>
    </main>
  );
}