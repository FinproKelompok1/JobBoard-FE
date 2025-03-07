'use client';

import React from 'react';
import { Building2 } from 'lucide-react';

interface CompaniesHeaderProps {
  totalCompanies: number;
  totalJobs: number;
}

export default function ComHeader({ totalCompanies, totalJobs }: CompaniesHeaderProps) {
  return (
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
                {totalCompanies}+ Companies Hiring
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
                <span className="text-white">{totalCompanies}+ Companies</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-white">{totalJobs}+ Open Positions</span>
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
  );
}