import { Job, JobCategory } from '@/types/jobdis';
import JobCard from './jobCards';
import { CurrencyFormatter } from '@/helpers/currencryFormatter';

interface JobsListProps {
  jobs: Job[];
  userLocation: { city: string; province: string } | null;
  CurrencyFormatter: (salary: number) => string;
  getCategoryIcon: (category: JobCategory) => string;
}

export default function JobsList({ 
  jobs, 
  userLocation, 
  CurrencyFormatter, 
  getCategoryIcon 
}: JobsListProps) {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0D3880] mb-2">
          {userLocation ? 'Jobs Near You' : 'Available Jobs'}
        </h2>
        <p className="text-gray-600">
          {userLocation 
            ? `Showing jobs in ${userLocation.city}, ${userLocation.province}`
            : 'Explore the best career opportunities'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard 
            key={job.id}
            job={job}
            CurrencyFormatter={CurrencyFormatter}
            getCategoryIcon={getCategoryIcon}
          />
        ))}
      </div>
    </>
  );
}