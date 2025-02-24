import { Building2, Briefcase, Calendar } from 'lucide-react';
import { CompanyDetail } from '@/types/company';

interface CompanyHeaderProps {
  company: CompanyDetail;
}

export function CompanyHeader({ company }: CompanyHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 hover:shadow-md transition-shadow duration-300">
      <div className="relative">
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
  );
}