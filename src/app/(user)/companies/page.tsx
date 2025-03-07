'use client';

import React, { useEffect, useState } from 'react';
import { getCompanies } from '@/libs/company';
import CompaniesList from '@/components/homepage/companyList';
import CompaniesFilter from '@/components/homepage/companyFilter';
import LoadingPage from '@/components/loading'; 
import { useRouter } from 'next/navigation';
import { createQueryString } from "@/helpers/createQuery";
import Pagination from '@/components/homepage/pagination'; 
import ComHeader from '@/components/company/headerAllPage';

interface Company {
  id: number;
  companyName: string;
  logo: string | null;
  description: string;
  jobCount: number;
  Job: Array<{ location: { city: string; province: string; } }>;
}

interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({ page: 1, limit: 4, totalItems: 0, totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageChanging, setIsPageChanging] = useState(false);
  
  const totalJobs = companies.reduce((total, company) => total + company.jobCount, 0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      setCurrentPage(pageParam ? parseInt(pageParam) : 1);
    }
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        const response = await getCompanies(currentPage, 4); 
        setCompanies(response.data);
        setFilteredCompanies(response.data);
        setPaginationMeta(response.meta);
      } catch {
        setError('Failed to fetch companies');
      } finally {
        setIsLoading(false);
        setIsPageChanging(false);
      }
    };
    fetchCompanies();
  }, [currentPage]);

  useEffect(() => {
    let result = [...companies];
    if (searchQuery.trim()) {
      result = result.filter(company => 
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }
    if (location.trim()) {
      result = result.filter(company => 
        company.Job?.some(job => {
          if (!job.location) return false;
          const locationLower = location.toLowerCase().trim();
          return job.location.city?.toLowerCase().includes(locationLower) || 
                 job.location.province?.toLowerCase().includes(locationLower);
        })
      );
    }
    if (sortBy) {
      const sortOptions = {
        nameAsc: (a: Company, b: Company) => a.companyName.localeCompare(b.companyName),
        nameDesc: (a: Company, b: Company) => b.companyName.localeCompare(a.companyName),
        jobsDesc: (a: Company, b: Company) => b.jobCount - a.jobCount,
        jobsAsc: (a: Company, b: Company) => a.jobCount - b.jobCount
      };
      if (sortOptions[sortBy as keyof typeof sortOptions]) {
        result.sort(sortOptions[sortBy as keyof typeof sortOptions]);
      }
    }
    setFilteredCompanies(result);
  }, [companies, searchQuery, location, sortBy]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > paginationMeta.totalPages) return;
    setIsPageChanging(true);
    setCurrentPage(page);
    router.push(`/companies?${createQueryString('page', `${page}`)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading || isPageChanging) return <LoadingPage isLoading={true} />;
  
  if (error && companies.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[400px] flex items-center justify-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ComHeader totalCompanies={paginationMeta.totalItems} totalJobs={totalJobs} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <CompaniesFilter
              searchQuery={searchQuery}
              location={location}
              sortBy={sortBy}
              onSearchChange={setSearchQuery}
              onLocationChange={setLocation}
              onSortChange={setSortBy}
            />
          </div>
          <div className="md:col-span-3">
            {filteredCompanies.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">No companies found matching your criteria.</p>
              </div>
            ) : (
              <>
                <CompaniesList companies={filteredCompanies} />
                {paginationMeta.totalPages > 1 && (
                  <>
                    <Pagination 
                      currentPage={paginationMeta.page}
                      totalPages={paginationMeta.totalPages}
                      onPageChange={handlePageChange}
                    />
                    <div className="text-center text-gray-500 mt-4">
                      Showing {filteredCompanies.length} of {paginationMeta.totalItems} companies - 
                      Page {paginationMeta.page} of {paginationMeta.totalPages}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}