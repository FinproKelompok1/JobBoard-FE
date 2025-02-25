import { Job } from '@/types/jobdis';

interface JobSidebarProps {
  job: Job;
}

export function JobSidebar({ job }: JobSidebarProps) {
  return (
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
          <div className="text-center mb-4">
            <h3 className="font-semibold text-lg text-gray-900">
              {job.admin.companyName}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}