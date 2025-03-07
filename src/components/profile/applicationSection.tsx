import { useState } from 'react';
import { Briefcase, Calendar, AlertCircle, Star, Clock, CheckCircle2 } from 'lucide-react';
import { JobApplication, JobApplicationStatus } from '@/types/profile';
import { formatDate } from '@/helpers/dateFormatter';
import DateFormatter from '@/helpers/dateFormatter';
import { formatRupiahTanpaDesimal } from '@/helpers/formatCurrency';
import axios from '@/helpers/axios';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ApplicationsSectionProps {
  applications: JobApplication[];
}

export default function ApplicationsSection({ applications }: ApplicationsSectionProps) {
  const [selectedRejection, setSelectedRejection] = useState<string | null>(null);
  const [showTakeJobModal, setShowTakeJobModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getStatusColor = (status: JobApplicationStatus, isTaken: boolean): string => {
    const colors: Record<JobApplicationStatus, string> = {
      rejected: 'bg-rose-50 text-rose-600',
      accepted: isTaken 
        ? 'bg-emerald-100 text-emerald-700' 
        : 'bg-emerald-50 text-emerald-600 cursor-pointer hover:bg-emerald-100',
      processed: 'bg-amber-50 text-amber-600',
      interviewed: 'bg-blue-50 text-blue-600'
    };
    return colors[status];
  };

  const getStatusText = (status: JobApplicationStatus, isTaken: boolean): string => {
    if (status === JobApplicationStatus.accepted && isTaken) {
      return 'You already accepted this job';
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleStatusClick = (application: JobApplication): void => {
    if (application.status === JobApplicationStatus.accepted && !application.isTaken) {
      setSelectedJob(application);
      setShowTakeJobModal(true);
    }
  };

  const handleRejectionClick = (rejectionReason: string | undefined): void => {
    if (rejectionReason) {
      setSelectedRejection(rejectionReason);
    }
  };

  const takeJob = async (jobId: string) => {
    try {
      const response = await axios.put(`/auth/applications/${jobId}/take`);
      if (response.data.success) {
        toast.success('Job successfully accepted!');
      }
      return response.data;
    } catch (error) {
      toast.error('Failed to accept job. Please try again.');
      throw error;
    }
  };

  const handleTakeJob = async (): Promise<void> => {
    if (!selectedJob) return;
    
    setIsLoading(true);
    try {
      await takeJob(selectedJob.jobId);
      window.location.reload();
    } catch (error) {
      console.error('Error accepting job:', error);
    } finally {
      setIsLoading(false);
      setShowTakeJobModal(false);
    }
  };


  if (!applications || applications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No job applications yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#0D3880] flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-[#E60278]" />
          Job Applications
        </h2>
        <span className="text-gray-500">
          {applications.length} Application{applications.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-4">
        {applications.map((application, index) => (
          <div 
            key={index}
            className="p-6 border-2 border-gray-100 rounded-xl hover:border-pink-100 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-[#0D3880] mb-2">
                  {application.job.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-[#0D3880] rounded-full text-sm">
                    {application.job.admin.companyName}
                  </span>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(application.status, application.isTaken)}`}
                    onClick={() => handleStatusClick(application)}
                  >
                    {getStatusText(application.status, application.isTaken)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Applied on {formatDate(application.createdAt)}
                </div>
                <div className="font-medium text-[#E60278]">
                  {formatRupiahTanpaDesimal(application.expectedSalary)}
                </div>
              </div>
            </div>

            {application.status === JobApplicationStatus.accepted && application.isTaken && (
              <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3" />
                  <div>
                    <span className="text-emerald-700 font-medium">
                      Congratulations! You&apos;ve accepted this job offer.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {application.interview && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-[#0D3880] mr-3" />
                  <div>
                    <span className="text-[#0D3880] font-medium">Interview Schedule: </span>
                    {application.interview.startTime ? (
                      <span className="text-blue-600">
                        {DateFormatter(application.interview.startTime)}
                      </span>
                    ) : (
                      <span className="text-blue-600">
                        Check your email for interview details.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {application.status === JobApplicationStatus.interviewed && !application.interview && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-[#0D3880] mr-3" />
                  <div>
                    <span className="text-[#0D3880] font-medium">Interview Status: </span>
                    <span className="text-blue-600">
                      Check your email for interview details.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {application.status === JobApplicationStatus.rejected && application.rejectedReview && (
              <div 
                className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 cursor-pointer hover:bg-red-100 transition-colors"
                onClick={() => handleRejectionClick(application.rejectedReview)}
              >
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-red-600">Click to view rejection reason</p>
                </div>
              </div>
            )}

            {application.selectionTestResult && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-[#0D3880] mr-3" />
                  <div>
                    <span className="text-[#0D3880] font-medium">Test Score: </span>
                    <span className="text-blue-600">{application.selectionTestResult}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={!!selectedRejection} onOpenChange={() => setSelectedRejection(null)}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#0D3880]">
              Application Rejected
            </DialogTitle>
          </DialogHeader>
          <div className="bg-red-50 p-4 rounded-xl mt-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-600">{selectedRejection}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTakeJobModal} onOpenChange={setShowTakeJobModal}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#0D3880]">
              Take Job Offer
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Would you like to accept the job offer for the position of {selectedJob?.job.title} at {selectedJob?.job.admin.companyName}?
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowTakeJobModal(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleTakeJob} 
              className="bg-[#E60278] text-white hover:bg-pink-700"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Accept Offer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}