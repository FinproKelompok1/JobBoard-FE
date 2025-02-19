'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, MapPin, Mail, Calendar, Phone, Briefcase } from 'lucide-react';
import LoadingPage from '@/components/loading';
import { getCompanyDetail } from '@/libs/company';

interface Job {
  id: string;
  title: string;
  adminId: number;
  banner: string | null;
  category: string;
  location?: {
    city: string;
    province: string;
  };
}

interface CompanyDetail {
  id: number;
  companyName: string;
  email: string;
  noHandphone: string;
  description: string;
  logo: string | null;
  jobCount: number;
  createdAt: string;
  jobs: Job[];
}

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getCompanyDetail(params.id);
        if (!data) {
          throw new Error('Company not found');
        }
        setCompany(data);
      } catch (err) {
        setError('Failed to load company details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyDetail();
  }, [params.id]);

  if (isLoading) return <LoadingPage />;

  if (error || !company) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[400px] flex items-center justify-center text-red-500">
            {error || 'Company not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Company Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-blue-50 opacity-50" />
            
            <div className="relative p-8">
              <div className="flex items-center space-x-6">
                <div className="w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100">
                  {company.logo ? (
                    <img 
                      src={company.logo} 
                      alt={company.companyName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {company.companyName}
                  </h1>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-5 h-5 mr-2 text-[#E60278]" />
                      <span>{company.jobCount} Open Positions</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2 text-[#E60278]" />
                      <span>Joined {new Date(company.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - About & Jobs */}
          <div className="md:col-span-2">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Company</h2>
              <p className="text-gray-600 leading-relaxed">{company.description}</p>
            </div>

            {/* Jobs Section */}
<div className="bg-white rounded-lg shadow-sm p-6">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">Open Positions</h2>
  <div className={`space-y-4 ${company.jobs.length > 3 ? 'max-h-[500px] overflow-y-auto pr-2' : ''}`}>
    {company.jobs && company.jobs.length > 0 ? (
      company.jobs.map((job) => (
        <div 
          key={job.id}
          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
        >
          <div>
            <h3 className="text-lg font-medium text-[#0D3880] mb-2 hover:text-[#E60278] transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-2 text-[#E60278]" />
              <span>
                {job.location ? 
                  `${job.location.city}, ${job.location.province}` : 
                  'Location not specified'}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="inline-block px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full">
                {job.category}
              </span>
              <Link 
                href={`/job-detail/${job.id}`}
                className="px-4 py-2 text-sm font-medium text-[#E60278] hover:text-white hover:bg-[#E60278] border border-[#E60278] rounded-lg transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Open Positions</h3>
        <p className="text-gray-500">
          There are currently no job openings at {company.companyName}.
          Please check back later for new opportunities.
        </p>
      </div>
    )}
  </div>
</div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-[#E60278] mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{company.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-[#E60278] mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">{company.noHandphone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}