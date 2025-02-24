import { Job } from '@/types/jobdis';
import JobCard from '@/components/homepage/jobCards';
import { CurrencyFormatter } from '@/helpers/currencryFormatter';
import { getCategoryIcon } from '@/helpers/category';

interface RelatedJobsProps {
  jobs: Job[];
}

export function RelatedJobs({ jobs }: RelatedJobsProps) {
  if (!jobs.length) return null;

  return (
    <section className="mt-12 mb-20">
      <h2 className="text-2xl font-bold text-[#0D3880] mb-6">
        Related Jobs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            CurrencyFormatter={CurrencyFormatter}
            getCategoryIcon={getCategoryIcon}
          />
        ))}
      </div>
    </section>
  );
}