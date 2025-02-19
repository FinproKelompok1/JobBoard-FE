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
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow max-w-2xl">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
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
        
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-[#0D3880] mb-1">
            {job.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {job.admin?.companyName}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-blue-50 rounded-full">
            <span className="text-base">{getCategoryIcon(job.category)}</span>
            <span className="text-xs text-blue-800">{job.category}</span>
          </div>
          {job.isTestActive && (
            <span className="px-2.5 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
              Test Required
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        <p className="text-gray-500 text-sm">
          {job.role}
        </p>
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
        className="text-gray-600 text-sm mb-3 line-clamp-2"
        dangerouslySetInnerHTML={createMarkup(job.description)}
      />

      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Deadline: {new Date(job.endDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
        <Link 
          href={`/job-detail/${job.id}`}
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