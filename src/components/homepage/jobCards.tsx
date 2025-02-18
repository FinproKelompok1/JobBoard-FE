import { Job, JobCategory } from '@/types/jobdis';
import { CurrencyFormatter } from '../../helpers/currencryFormatter';
import Link from 'next/link';
import DOMPurify from 'dompurify';

interface JobCardProps {
  job: Job;
  getCategoryIcon: (category: JobCategory) => string;
  CurrencyFormatter: (salary: number) => string;
}

export default function JobCard({ job, getCategoryIcon, CurrencyFormatter }: JobCardProps) {
  const createMarkup = (htmlContent: string) => {
    return {
      __html: DOMPurify.sanitize(htmlContent)
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {job.banner && (
        <div className="mb-4 -mx-6 -mt-6">
          <img 
            src={job.banner} 
            alt={job.title} 
            className="w-full h-32 object-cover rounded-t-lg"
          />
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            {job.admin?.logo ? (
              <img 
                src={job.admin.logo} 
                alt={job.admin?.companyName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                {job.admin?.companyName.charAt(0)}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-full">
            <span className="text-lg">{getCategoryIcon(job.category)}</span>
            <span className="text-sm text-blue-800">{job.category}</span>
          </div>
          {job.isTestActive && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              Test Required
            </span>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#0D3880] mb-2">
        {job.title}
      </h3>
      <p className="text-gray-600 text-sm mb-1">
        {job.admin?.companyName}
      </p>
      <p className="text-gray-500 text-sm mb-4">
        {job.role}
      </p>

      <div className="space-y-2 mb-4">
        <p className="text-gray-600 text-sm flex items-center">
          <span className="mr-2">📍</span>
          {job.location.city}, {job.location.province}
        </p>
        {job.salary && (
          <p className="text-gray-600 text-sm flex items-center">
            <span className="mr-2">💰</span>
            {CurrencyFormatter(job.salary)}
          </p>
        )}
      </div>

      <div 
        className="text-gray-600 text-sm mb-4 line-clamp-2"
        dangerouslySetInnerHTML={createMarkup(job.description)}
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {job.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          Deadline: {new Date(job.endDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
        <Link 
          href={`/jobs-detail/${job.id}`}
          className="inline-flex items-center text-[#E60278] hover:text-[#E60278]/90 text-sm font-medium transition-colors"
        >
          View Details
          <svg 
            className="w-4 h-4 ml-1" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}