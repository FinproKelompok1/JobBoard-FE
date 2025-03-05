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
  CurrencyFormatter, 
  getCategoryIcon 
}: JobsListProps) {
  return (
    <>

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