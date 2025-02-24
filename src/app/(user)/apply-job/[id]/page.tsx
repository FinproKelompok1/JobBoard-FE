'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { ResumeUpload } from '@/components/apply/ResumeUpload';
import { SalaryInput } from '@/components/apply/SalaryInput';
import { SubmitButton } from '@/components/apply/SubmitBUtton';
import { ApplicationGuidelines, SuccessTips, ContactSupport } from '@/components/apply/Sidebar';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useApplyForm } from '@/hooks/useApplyForm';
import { getUserData } from '@/helpers/cookies';

export default function ApplyPage({ params }: { params: { id: string } }) {
  const { resume, dragActive, handleFileChange, handleDrag, handleDrop, setResume } = useFileUpload();
  const { formattedSalary, isLoading, handleSalaryChange, handleSubmit } = useApplyForm(params.id);

  useEffect(() => {
    const userData = getUserData();
    if (!userData) {
      toast.error('Please login first');
    }
  }, []);

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
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h1 className="text-3xl font-bold text-[#0D3880] mb-6">Apply for Position</h1>
              
              <form onSubmit={(e) => handleSubmit(e, resume)} className="space-y-6" encType="multipart/form-data">
                <ResumeUpload
                  resume={resume}
                  dragActive={dragActive}
                  handleDrag={handleDrag}
                  handleDrop={handleDrop}
                  handleFileChange={handleFileChange}
                  setResume={setResume}
                />

                <SalaryInput
                  formattedSalary={formattedSalary}
                  handleSalaryChange={handleSalaryChange}
                />

                <SubmitButton isLoading={isLoading} />
              </form>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <ApplicationGuidelines />
            <SuccessTips />
            <ContactSupport />
          </div>
        </div>
      </div>
    </main>
  );
}