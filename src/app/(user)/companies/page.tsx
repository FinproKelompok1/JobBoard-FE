'use client';

import React, { useEffect, useState } from 'react';
import { getCompanies } from '@/libs/company';
import CompaniesList from '@/components/homepage/companyList';
import CompaniesFilter from '@/components/homepage/companyFilter';
import { Building2 } from 'lucide-react';
import LoadingPage from '@/components/loading'; 
import { useRouter } from 'next/navigation';
import { createQueryString } from "@/helpers/createQuery";
import Pagination from '@/components/homepage/pagination'; 

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
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 3, 
    totalItems: 0,
    totalPages: 1
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPageFromUrl = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        return pageParam ? parseInt(pageParam) : 1;
      }
      return 1;
    };
    
    setCurrentPage(getPageFromUrl());
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        const response = await getCompanies(currentPage, 3); 
        
        setCompanies(response.data);
        setFilteredCompanies(response.data);
        setPaginationMeta(response.meta);
      } catch {
        setError('Failed to fetch companies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [currentPage]);

  useEffect(() => {
    const filterCompanies = () => {
      let result = [...companies];

      if (searchQuery.trim()) {
        result = result.filter(company =>
          company.companyName.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );
      }

      if (location.trim()) {
        result = result.filter(company => {
          return company.Job?.some(job => {
            if (!job.location) return false;
            
            const locationLower = location.toLowerCase().trim();
            const cityMatch = job.location.city?.toLowerCase().includes(locationLower) || false;
            const provinceMatch = job.location.province?.toLowerCase().includes(locationLower) || false;
            
            return cityMatch || provinceMatch;
          });
        });
      }

      if (sortBy) {
        switch (sortBy) {
          case 'nameAsc':
            result.sort((a, b) => a.companyName.localeCompare(b.companyName));
            break;
          case 'nameDesc':
            result.sort((a, b) => b.companyName.localeCompare(a.companyName));
            break;
          case 'jobsDesc':
            result.sort((a, b) => b.jobCount - a.jobCount);
            break;
          case 'jobsAsc':
            result.sort((a, b) => a.jobCount - b.jobCount);
            break;
        }
      }

      setFilteredCompanies(result);
    };

    filterCompanies();
  }, [companies, searchQuery, location, sortBy]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > paginationMeta.totalPages) return;
    
    // Update state currentPage
    setCurrentPage(page);
    
    // Update URL dengan query parameter baru
    const query = createQueryString('page', `${page}`);
    router.push(`/companies?${query}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && companies.length === 0) {
    return <LoadingPage isLoading={true} />;
  }

  if (error && companies.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[400px] flex items-center justify-center text-red-500">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E60278]/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 -left-12 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 max-w-2xl">
              <div className="inline-block px-4 py-1 bg-[#E60278]/10 rounded-full mb-6">
                <span className="text-[#E60278] text-sm font-medium">
                  {paginationMeta.totalItems}+ Companies Hiring
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Find Your Perfect
                <span className="text-[#E60278]"> Career </span>
                Path
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Discover great companies that are currently hiring. Connect with leading employers and find opportunities that match your career goals.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Building2 className="w-5 h-5 text-[#E60278]" />
                  <span className="text-white">{paginationMeta.totalItems}+ Companies</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <span className="text-white">{companies.reduce((total, company) => total + company.jobCount, 0)}+ Open Positions</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block flex-shrink-0">
              <div className="relative w-[400px]">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
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
            {isLoading && companies.length > 0 ? (
              <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#E60278] border-t-transparent"></div>
              </div>
            ) : filteredCompanies.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">No companies found matching your criteria.</p>
              </div>
            ) : (
              <>
                <CompaniesList companies={filteredCompanies} />
                
                {/* Gunakan komponen Pagination yang sudah dibuat */}
                {paginationMeta.totalPages > 1 && (
                  <>
                    <Pagination 
                      currentPage={paginationMeta.page}
                      totalPages={paginationMeta.totalPages}
                      onPageChange={handlePageChange}
                    />
                    
                    {/* Jobs count and page info */}
                    <div className="text-center text-gray-500 mt-4">
                      Showing {filteredCompanies.length} of {paginationMeta.totalItems} companies - Page {paginationMeta.page} of {paginationMeta.totalPages}
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