'use client';

import { Job, JobCategory } from '@/types/jobdis';
import JobCard from '../homepage/jobCards';
import { createQueryString } from "@/helpers/createQuery";
import { useState, useMemo } from 'react';

interface JobsListProps {
  jobs: Job[];
  userLocation?: { city: string; province: string } | null;
  CurrencyFormatter: (salary: number) => string;
  getCategoryIcon: (category: JobCategory) => string;
  itemsPerPage?: number;
}

export default function JobsList({ 
  jobs = [],
  userLocation = null, 
  CurrencyFormatter, 
  getCategoryIcon,
  itemsPerPage = 6
}: JobsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!Array.isArray(jobs) || !jobs.length) return 0;
    return Math.ceil(jobs.length / itemsPerPage);
  }, [jobs, itemsPerPage]);

  const currentJobs = useMemo(() => {
    if (!Array.isArray(jobs) || !jobs.length) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return jobs.slice(startIndex, startIndex + itemsPerPage);
  }, [jobs, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    createQueryString('page', page.toString());
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (!Array.isArray(jobs) || !jobs.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No jobs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0D3880] mb-2">
          {userLocation ? 'Jobs Near You' : 'Available Jobs'}
        </h2>
        <p className="text-gray-600">
          {userLocation 
            ? `Showing jobs in ${userLocation.city}, ${userLocation.province}`
            : 'Explore the best career opportunities'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <JobCard 
            key={job.id}
            job={job}
            CurrencyFormatter={CurrencyFormatter}
            getCategoryIcon={getCategoryIcon}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center pt-8">
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`border rounded-md px-4 py-2 ${
                currentPage === 1
                  ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'text-black/60 hover:border-[#E60278] hover:text-[#E60278]'
              }`}
            >
              Previous
            </button>

            {getPageNumbers().map((pageNum, idx) => {
              if (pageNum === '...') {
                return (
                  <span 
                    key={`ellipsis-${idx}`} 
                    className="flex items-center px-2"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => handlePageChange(Number(pageNum))}
                  className={`border rounded-md px-4 py-2 ${
                    currentPage === pageNum
                      ? 'bg-[#E60278] text-white border-[#E60278]'
                      : 'text-black/60 hover:border-[#E60278] hover:text-[#E60278]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`border rounded-md px-4 py-2 ${
                currentPage === totalPages
                  ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'text-black/60 hover:border-[#E60278] hover:text-[#E60278]'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}