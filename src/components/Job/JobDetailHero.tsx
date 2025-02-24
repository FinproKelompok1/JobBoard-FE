import { Job } from '@/types/jobdis';
import { getCategoryIcon } from '@/helpers/category';
import { CurrencyFormatter } from '@/helpers/currencryFormatter';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

interface JobDetailHeroProps {
  job: Job;
}

export function JobDetailHero({ job }: JobDetailHeroProps) {
  return (
    <div className="relative rounded-lg overflow-hidden mb-8">
      <div className="relative h-64">
        {job.banner ? (
          <>
            <img 
              src={job.banner} 
              alt={`${job.title} banner`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
          </>
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
        
        <div className="absolute top-6 right-6">
          <span className="inline-flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-blue-800 rounded-full text-sm shadow-lg hover:bg-white transition-colors">
            <span className="text-xl">{getCategoryIcon(job.category)}</span>
            <span className="font-medium">{job.category}</span>
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{job.title}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center text-white bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                <MapPin className="w-5 h-5 mr-2 text-[#E60278]" />
                {job.location.city}, {job.location.province}
              </div>
              <div className="flex items-center text-white bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                <Briefcase className="w-5 h-5 mr-2 text-[#E60278]" />
                {job.role}
              </div>
              {job.salary && (
                <div className="flex items-center text-white bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <DollarSign className="w-5 h-5 mr-2 text-[#E60278]" />
                  {CurrencyFormatter(job.salary)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}