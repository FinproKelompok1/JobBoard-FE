// src/components/profile/tabbedSection.tsx

import { useState } from 'react';
import { UserProfile, CurriculumVitae } from '@/types/profile';
import { updateCV } from '@/libs/auth';
import CVInputSection from './cvForm';
import ApplicationsSection from './applicationSection';

interface TabbedSectionProps {
  user: UserProfile;
  onUpdate: () => void;
}

export default function TabbedSection({ user, onUpdate }: TabbedSectionProps) {
  const [activeTab, setActiveTab] = useState<'academic' | 'applications'>('academic');

  const handleCVSave = async (cvData: Omit<CurriculumVitae, 'id'>) => {
    try {
      // Save CV data to backend
      await updateCV(user.id, cvData);
      // Refresh profile data after successful update
      await onUpdate();
    } catch (error) {
      console.error('Error updating CV:', error);
      throw error;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6">
      {/* Tabs Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('academic')}
          className={`px-8 py-3 font-medium text-lg transition-colors relative ${
            activeTab === 'academic' 
              ? 'text-[#0D3880] border-b-2 border-[#0D3880]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Data Academic
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-8 py-3 font-medium text-lg transition-colors relative ${
            activeTab === 'applications'
              ? 'text-[#0D3880] border-b-2 border-[#0D3880]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Job Applications
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'academic' && (
          <CVInputSection 
            initialCV={user.CurriculumVitae?.[0] || null}  // Changed to null as fallback
            onSave={handleCVSave}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsSection 
            applications={user.JobApplication || []} 
          />
        )}
      </div>
    </div>
  );
}