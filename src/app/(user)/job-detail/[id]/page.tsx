'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJobDetail, getRelatedJobs } from '@/libs/jobdis';
import { Job } from '@/types/jobdis';
import { CurrencyFormatter } from '@/helpers/currencryFormatter';
import { getCategoryIcon } from '@/helpers/category';
import JobCard from '@/components/homepage/jobCards';
import LoadingState from '@/components/loading';
import { toast } from 'react-toastify';
import { Briefcase, ClipboardCheck, DollarSign, MapPin } from 'lucide-react';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

const handleApply = async () => {
  try {
    router.push(`/apply-job/${params.id}`);
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to process application');
  }
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
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Jobs
          </Link>
        </div>

        {job.banner && (
          <div className="w-full h-64 mb-8 rounded-lg overflow-hidden">
            <img 
              src={job.banner} 
              alt={job.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#0D3880] mb-2">
                {job.title}
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                {job.admin.companyName}
              </p>
              <div className="flex items-center gap-6 text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#E60278]" />
                  {job.location.city}, {job.location.province}
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-[#E60278]" />
                  {job.role}
                </div>
                {job.salary && (
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-[#E60278]" />
                    {CurrencyFormatter(job.salary)}
                  </div>
                )}
              </div>
            </div>
            <div>
              <span className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm">
                <span className="text-lg">{getCategoryIcon(job.category)}</span>
                <span>{job.category}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: job.description }} 
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Deadline</p>
                  <p className="font-medium">
                    {new Date(job.endDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                {job.isTestActive && (
                  <div>
                    <p className="text-gray-600">Assessment Test</p>
                    <p className="font-medium text-green-600">Required</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold mb-4">About Company</h2>
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto mb-4">
                  {job.admin.logo ? (
                    <img 
                      src={job.admin.logo} 
                      alt={job.admin.companyName}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-400">
                      {job.admin.companyName[0]}
                    </div>
                  )}
                </div>
                <p className="text-gray-600">{job.admin.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Apply Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-gray-600">
              {job.isTestActive && (
                <div className="flex items-center">
                  <ClipboardCheck className="w-5 h-5 mr-2 text-[#E60278]" />
                  Assessment test required
                </div>
              )}
            </div>
            <button 
              onClick={handleApply}
              className="px-8 py-3 bg-[#E60278] text-white rounded-lg hover:bg-[#E60278]/90 transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Related Jobs Section */}
        {relatedJobs.length > 0 && (
          <section className="mt-12 mb-20">
            <h2 className="text-2xl font-bold text-[#0D3880] mb-6">
              Related Jobs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedJobs.map(relatedJob => (
                <JobCard
                  key={relatedJob.id}
                  job={relatedJob}
                  CurrencyFormatter={CurrencyFormatter}
                  getCategoryIcon={getCategoryIcon}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}