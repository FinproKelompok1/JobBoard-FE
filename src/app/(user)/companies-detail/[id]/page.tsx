'use client';

import { useEffect, useState } from 'react';
import { CompanyDetail } from '@/types/company';
import { getCompanyDetail } from '@/libs/company';
import LoadingPage from '@/components/loading';
import { CompanyHeader } from '@/components/company/CompanyHeader';
import { AboutSection } from '@/components/company/AboutSection';
import { JobsList } from '@/components/company/JobList';
import { ContactInfo } from '@/components/company/ContactInfo';

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getCompanyDetail(params.id);
        if (!data) throw new Error('Company not found');
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
      <div className="container mx-auto px-4 py-6">
        <CompanyHeader company={company} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <AboutSection description={company.description} />
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-6 bg-[#0D3880] rounded-full mr-3"></span>
                Open Positions
              </h2>
              <JobsList jobs={company.jobs} companyName={company.companyName} />
            </div>
          </div>

          <div className="md:col-span-1">
            <ContactInfo email={company.email} phone={company.noHandphone} />
          </div>
        </div>
      </div>
    </div>
  );
}