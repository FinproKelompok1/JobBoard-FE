'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { applyJob } from '@/libs/jobdis';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FileText, ArrowLeft, Upload, Info, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ApplyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [resume, setResume] = useState<File | null>(null);
  const [expectedSalary, setExpectedSalary] = useState<string>('');
  const [formattedSalary, setFormattedSalary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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

  const formatToRupiah = (value: string) => {
    const number = value.replace(/[^\d]/g, '');
    const formatted = new Intl.NumberFormat('id-ID').format(Number(number));
    return `Rp ${formatted}`;
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setExpectedSalary(value);
    setFormattedSalary(formatToRupiah(value));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should not exceed 5MB');
      return;
    }
    setResume(file);
    toast.success('Resume uploaded successfully!');
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
      
      // Process salary - remove non-numeric characters
      const salary = expectedSalary.replace(/[^\d]/g, '');
      console.log('Processed salary:', salary);

      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('expectedSalary', salary);
      formData.append('userId', userData.id.toString());
      formData.append('jobId', params.id);

      // Debug log using Array.from instead of for...of
      Array.from(formData.entries()).forEach(([key, value]) => {
        console.log('FormData entry:', key, value);
      });

      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        toast.error('Session expired. Please login again');
        router.push('/auth/login');
        return;
      }

      const response = await applyJob(params.id, formData, token);
      console.log('Application response:', response);
      
      toast.success('Application submitted successfully');
      router.push('/jobs');
    } catch (error: any) {
      console.error('Full submission error:', {
        error,
        response: error.response,
        data: error.response?.data,
      });
      
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link 
            href={`/job-detail/${params.id}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Job Details
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h1 className="text-3xl font-bold text-[#0D3880] mb-6">Apply for Position</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Resume (PDF, max 5MB)
                  </label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${
                      dragActive ? 'border-[#E60278] bg-pink-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="p-3 bg-gray-100 rounded-full">
                        {resume ? <FileText className="w-6 h-6 text-[#E60278]" /> : <Upload className="w-6 h-6 text-gray-400" />}
                      </div>
                      <div className="text-center">
                        {resume ? (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                              Selected file: <span className="font-medium text-[#E60278]">{resume.name}</span>
                            </p>
                            <button
                              type="button"
                              onClick={() => setResume(null)}
                              className="text-sm text-gray-500 hover:text-[#E60278]"
                            >
                              Change file
                            </button>
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-600">Drag and drop your resume here, or</p>
                            <label className="mt-2 cursor-pointer">
                              <span className="text-[#E60278] hover:text-[#E60278]/90 font-medium">
                                browse files
                              </span>
                              <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Expected Salary
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formattedSalary}
                      onChange={handleSalaryChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#E60278] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Rp 0"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-4 bg-[#E60278] text-white rounded-lg hover:bg-[#E60278]/90 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 font-medium shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center justify-center">
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
                      Submitting Application...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Side Information Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Application Guidelines */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-5 h-5 text-[#0D3880]" />
                <h2 className="text-lg font-semibold text-[#0D3880]">Application Guidelines</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">Ensure your resume is up-to-date and in PDF format</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">File size should not exceed 5MB</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">Include your expected salary range</span>
                </li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="bg-blue-50 rounded-xl shadow-lg p-6 border border-blue-100">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-blue-800">Tips for Success</h2>
              </div>
              <ul className="space-y-3 text-sm text-blue-700">
                <li>Make sure your resume highlights relevant experience</li>
                <li>Research market rates for salary expectations</li>
                <li>Double-check all information before submitting</li>
              </ul>
            </div>

            {/* Contact Support */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you're experiencing any issues, our support team is here to help. Click below to send us an email.
              </p>
              <a 
                href="mailto:finprokelompok1@gmail.com" 
                className="inline-flex items-center text-[#E60278] hover:text-[#E60278]/90 text-sm font-medium group"
              >
                Contact Support 
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}