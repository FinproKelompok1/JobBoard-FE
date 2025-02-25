import { Job } from '@/types/company';
import { MapPin, Briefcase } from 'lucide-react';
import Link from 'next/link';

interface JobsListProps {
  jobs: Job[];
  companyName: string;
}

export function JobsList({ jobs, companyName }: JobsListProps) {
  if (!jobs.length) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Open Positions</h3>
        <p className="text-gray-500">
          There are currently no job openings at {companyName}.
          Please check back later for new opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${jobs.length > 3 ? 'max-h-[500px] overflow-y-auto pr-2' : ''}`}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <div className="group bg-gray-50 rounded-lg p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-pink-50 transition-all duration-300">
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
  );
}