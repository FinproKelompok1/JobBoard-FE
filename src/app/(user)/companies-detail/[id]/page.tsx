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
      <div className="min-h-screen pt-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[400px] flex items-center justify-center text-red-500">
            {error || 'Company not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-50 to-white">
      {/* Company Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 hover:shadow-md transition-shadow duration-300">
          <div className="relative">
            {/* Decorative pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E60278]/5 to-[#0D3880]/5" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#E60278]/10 to-[#0D3880]/10 rounded-bl-full" />
            
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100 shadow-sm mb-4 sm:mb-0">
                  {company.logo ? (
                    <img 
                      src={company.logo} 
                      alt={company.companyName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                  )}
                </div>
                
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    {company.companyName}
                  </h1>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                      <Briefcase className="w-4 h-4 mr-2 text-[#E60278]" />
                      <span className="text-sm">{company.jobCount} Open Positions</span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                      <Calendar className="w-4 h-4 mr-2 text-[#E60278]" />
                      <span className="text-sm">Joined {new Date(company.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - About & Jobs */}
          <div className="md:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-6 bg-[#E60278] rounded-full mr-3"></span>
                About Company
              </h2>
              <div 
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: company.description }}
              />
            </div>

            {/* Jobs Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-6 bg-[#0D3880] rounded-full mr-3"></span>
                Open Positions
              </h2>
              <div className={`space-y-4 ${company.jobs.length > 3 ? 'max-h-[500px] overflow-y-auto pr-2' : ''}`}>
                {company.jobs && company.jobs.length > 0 ? (
                  company.jobs.map((job) => (
                    <div 
                      key={job.id}
                      className="group bg-gray-50 rounded-lg p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-pink-50 transition-all duration-300"
                    >
                      <div>
                        <h3 className="text-lg font-medium text-[#0D3880] mb-2 group-hover:text-[#E60278] transition-colors">
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
                          <span className="inline-block px-3 py-1 text-sm bg-white text-gray-700 rounded-full shadow-sm">
                            {job.category}
                          </span>
                          <Link 
                            href={`/job-detail/${job.id}`}
                            className="px-4 py-2 text-sm font-medium text-[#E60278] hover:text-white hover:bg-[#E60278] border border-[#E60278] rounded-lg transition-all duration-300 hover:shadow-md"
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
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-6 bg-[#E60278] rounded-full mr-3"></span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-[#E60278] mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{company.email}</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors duration-300">
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