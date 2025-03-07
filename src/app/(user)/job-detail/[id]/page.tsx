'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJobDetail, getRelatedJobs, checkUserApplication } from '@/libs/jobdis';
import { Job } from '@/types/jobdis';
import LoadingState from '@/components/loading';
import { toast } from 'react-toastify';
import { JobDetailHero } from '@/components/Job/JobDetailHero';
import { JobDescription } from '@/components/Job/JobDescription';
import { JobSidebar } from '@/components/Job/JobSidebar';
import { ApplyButton } from '@/components/Job/ApplyButton';
import { RelatedJobs } from '@/components/Job/RelatedJobs';
import { IoIosArrowBack } from 'react-icons/io'; 

export default function JobDetailPage({ params }: { params: { id: string } }) {
 const router = useRouter();
 const [job, setJob] = useState<Job | null>(null);
 const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [hasApplied, setHasApplied] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
   const fetchData = async () => {
     try {
       setIsLoading(true);
       const [jobData, relatedJobsData] = await Promise.all([
         getJobDetail(params.id),
         getRelatedJobs(params.id)
       ]);

       if (!jobData) {
         router.push('/jobs');
         return;
       }

       setJob(jobData);
       setRelatedJobs(relatedJobsData);
     } catch (error) {
       console.error('Error fetching data:', error);
     } finally {
       setIsLoading(false);
     }
   };

   fetchData();
 }, [params.id, router]);

 useEffect(() => {
   const token = document.cookie
     .split('; ')
     .find(row => row.startsWith('token='))
     ?.split('=')[1];

   if (!token) {
     setIsLoggedIn(false);
     setHasApplied(false);
     return;
   }

   setIsLoggedIn(true);
   const checkApplicationStatus = async () => {
     try {
       console.log("Checking application status for job:", params.id);
       const result = await checkUserApplication(params.id);
       console.log("Application status result:", result);
       setHasApplied(result);
     } catch (error) {
       console.error("Error checking application status:", error);
       setHasApplied(false);
     }
   };

   checkApplicationStatus();
 }, [params.id]);

const handleApply = () => {
  if (!job) return;
  
  if (new Date(job.endDate) < new Date()) {
    toast.info('The application deadline has passed');
    return;
  }

  if (!isLoggedIn) {
    router.push('/auth/login');
    return;
  }

  if (hasApplied) {
    toast.info('You have already applied for this job');
    return;
  }

  router.push(`/apply-job/${params.id}`);
};

 if (isLoading) return <LoadingState />;
 if (!job) return null;

 return (
   <main className="min-h-screen bg-gray-50 py-12">
     <div className="container mx-auto px-4">
       <div className="mb-8">
         <Link 
           href="/jobs"
           className="inline-flex items-center text-gray-600 hover:text-gray-900"
         >
           <IoIosArrowBack className="w-5 h-5 mr-2" /> 
           Back to Jobs
         </Link>
       </div>

       <JobDetailHero job={job} />

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2">
           <JobDescription description={job.description} tags={job.tags} />
         </div>
         <div>
           <JobSidebar job={job} />
         </div>
       </div>

   <ApplyButton
  jobId={params.id}
  jobTitle={job.title}
  companyName={job.admin.companyName}
  location={`${job.location.city}, ${job.location.province}`}
  isTestActive={job.isTestActive} 
  hasApplied={hasApplied}
  isLoggedIn={isLoggedIn}
  endDate={job.endDate} 
  onApply={handleApply}
/>

       {relatedJobs.length > 0 && (
         <RelatedJobs jobs={relatedJobs} />
       )}
     </div>
   </main>
 );
}