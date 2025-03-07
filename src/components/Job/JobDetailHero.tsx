import { Job } from '@/types/jobdis';
import { getCategoryIcon } from '@/helpers/category';
import { CurrencyFormatter } from '@/helpers/currencryFormatter';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';
import Image from 'next/image';

interface JobDetailHeroProps {
  job: Job;
}

export function JobDetailHero({ job }: JobDetailHeroProps) {
  return (
    <div className="relative rounded-lg overflow-hidden mb-8">
      <div className="relative h-48 sm:h-56 md:h-64">
        {job.banner ? (
          <>
            <div className="relative w-full h-full">
              <Image 
                src={job.banner} 
                alt={`${job.title} banner`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 768px, 1200px"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
          </>
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
        
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <span className="inline-flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 bg-white/90 backdrop-blur-sm text-blue-800 rounded-full text-xs sm:text-sm shadow-lg hover:bg-white transition-colors">
            <span className="text-lg sm:text-xl">{getCategoryIcon(job.category)}</span>
            <span className="font-medium">{job.category}</span>
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">{job.title}</h1>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6">
              <div className="flex items-center text-white bg-black/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-[#E60278]" />
                {job.location.city}, {job.location.province}
              </div>
              <div className="flex items-center text-white bg-black/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-[#E60278]" />
                {job.role}
              </div>
              {job.salary && (
                <div className="flex items-center text-white bg-black/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-[#E60278]" />
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