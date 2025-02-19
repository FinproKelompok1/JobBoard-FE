'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { applyJob } from '@/libs/jobdis';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function ApplyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [resume, setResume] = useState<File | null>(null);
  const [expectedSalary, setExpectedSalary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Get user data from cookie
  const getUserData = () => {
    try {
      const userStr = document.cookie
        .split('; ')
        .find(row => row.startsWith('user='))
        ?.split('=')[1];
      return userStr ? JSON.parse(decodeURIComponent(userStr)) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  useEffect(() => {
    const userData = getUserData();
    if (!userData) {
      toast.error('Please login first');
      router.push('/auth/login');
    }
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should not exceed 5MB');
        return;
      }
      setResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = getUserData();
    if (!userData) {
      toast.error('Please login first');
      router.push('/auth/login');
      return;
    }

    if (!resume) {
      toast.error('Please upload your resume');
      return;
    }

    if (!expectedSalary) {
      toast.error('Please enter your expected salary');
      return;
    }

    try {
      setIsLoading(true);

      // Create form data
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('expectedSalary', expectedSalary);
      // Add both userId and jobId
      formData.append('userId', userData.id.toString());
      formData.append('jobId', params.id.toString());

      // Get token
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        toast.error('Session expired. Please login again');
        router.push('/auth/login');
        return;
      }

      // Log the data being sent
      console.log('Submitting application with:', {
        userId: userData.id,
        jobId: params.id.toString(),
        expectedSalary,
        resume: resume.name
      });

      await applyJob(params.id, formData, token);
      toast.success('Application submitted successfully');
      router.push('/jobs');
    } catch (error: any) {
      console.error('Submission error:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again');
        router.push('/auth/login');
      } else if (error.response?.status === 400) {
        toast.error(error.response.data?.message || 'Please check your application details');
      } else {
        toast.error('Failed to submit application. Please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <Link 
            href={`/job-detail/${params.id}`}
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
            Back to Job Details
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-[#0D3880] mb-6">Apply for Position</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Upload Resume (PDF, max 5MB)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {resume && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {resume.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Expected Salary (IDR)
              </label>
              <input
                type="number"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your expected salary"
                min="0"
                step="100000"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-[#E60278] text-white rounded-lg hover:bg-[#E60278]/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <span className="inline-flex items-center">
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}