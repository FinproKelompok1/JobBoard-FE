'use client';

import React, { useEffect, useState } from 'react';
import { Building2, MapPin, Mail, Calendar, Users, Briefcase, CheckCircle2 } from 'lucide-react';
import LoadingPage from '@/components/loading';

interface CompanyDetail {
  id: number;
  companyName: string;
  email: string;
  description: string;
  logo: string | null;
  isVerified: boolean;
  jobCount: number;
  createdAt: string;
  Job: Array<{
    id: number;
    title: string;
    location: {
      city: string;
      province: string;
    };
  }>;
}

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/companies/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch company details');
        const data = await response.json();
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

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[400px] flex items-center justify-center">
            <LoadingPage />
          </div>
        </div>
      </div>
    );
  }

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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-12">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E60278]/10 rounded-full blur-2xl" />
              <div className="absolute top-1/2 -left-12 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
            </div>
            
            <div className="relative flex items-center space-x-6">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
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
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">
                    {company.companyName}
                  </h1>
                  {company.isVerified && (
                    <CheckCircle2 className="w-6 h-6 text-[#E60278]" />
                  )}
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center text-gray-300">
                    <Briefcase className="w-5 h-5 mr-2 text-[#E60278]" />
                    <span>{company.jobCount} Open Positions</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-5 h-5 mr-2 text-[#E60278]" />
                    <span>Joined {new Date(company.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">About Company</h2>
                  <p className="text-gray-600 leading-relaxed">{company.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Open Positions</h2>
                  <div className="space-y-4">
                    {company.Job.map((job) => (
                      <div 
                        key={job.id}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                      >
                        <h3 className="text-lg font-medium text-[#0D3880] mb-2">{job.title}</h3>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-[#E60278]" />
                          <span>{job.location.city}, {job.location.province}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-[#E60278] mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">{company.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="w-5 h-5 text-[#E60278] mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Status</p>
                        <p className="text-gray-600">
                          {company.isVerified ? 'Verified Company' : 'Unverified Company'}
                        </p>
                      </div>
                    </div>
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