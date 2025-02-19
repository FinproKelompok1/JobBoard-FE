'use client';

import React, { useCallback } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce'; 

interface CompaniesFilterProps {
  searchQuery: string;
  location: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function CompaniesFilter({
  searchQuery,
  location,
  sortBy,
  onSearchChange,
  onLocationChange,
  onSortChange
}: CompaniesFilterProps) {
  // Debounced handlers
  const debouncedSearch = useDebounce((value: string) => {
    onSearchChange(value);
  }, 300);

  const debouncedLocation = useDebounce((value: string) => {
    onLocationChange(value);
  }, 300);

  // Handle input changes with debounce
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    debouncedSearch(value);
  }, [debouncedSearch]);

  const handleLocationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    debouncedLocation(value);
  }, [debouncedLocation]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 sticky top-24">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search company name..."
          defaultValue={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278] focus:border-transparent"
        />
      </div>

      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Filter by location..."
          defaultValue={location}
          onChange={handleLocationChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278] focus:border-transparent"
        />
      </div>

      <div>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278] focus:border-transparent"
        >
          <option value="">Sort by...</option>
          <option value="nameAsc">Company Name (A-Z)</option>
          <option value="nameDesc">Company Name (Z-A)</option>
          <option value="jobsDesc">Most Job Openings</option>
          <option value="jobsAsc">Least Job Openings</option>
        </select>
      </div>
    </div>
  );
}