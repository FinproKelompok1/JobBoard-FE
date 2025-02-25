import { Job, JobCategory } from '@/types/jobdis';
import JobCard from './jobCards';

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
          {userLocation ? 'Jobs Near You' : 'Latest Jobs'}
        </h2>
        <p className="text-gray-600">
          {userLocation 
            ? `Showing jobs in ${userLocation.city}, ${userLocation.province}`
            : 'Explore the most recent job opportunities'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard 
              key={job.id}
              job={job}
              CurrencyFormatter={CurrencyFormatter}
              getCategoryIcon={getCategoryIcon}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-8">
            <p className="text-lg text-gray-600">No jobs found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or location preferences.</p>
          </div>
        )}
      </div>
    </>
  );
}