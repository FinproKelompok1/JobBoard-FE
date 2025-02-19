'use client';

import React from 'react';
import { Search, MapPin } from 'lucide-react';

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
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search company name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278] focus:border-transparent"
        />
      </div>

      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
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