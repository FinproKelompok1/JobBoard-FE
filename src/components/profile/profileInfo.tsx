// src/components/profile/ProfileInfo.tsx

import { useState } from 'react';
import { User, Calendar, GraduationCap, Mail, Edit, Check } from 'lucide-react';
import { UserProfile } from '@/types/profile';
import { formatDate } from '@/helpers/dateFormatter';
import { eduFormatter } from '@/helpers/educationFormatter';
import ProfileEditForm from './profileCV';
import TabbedSection from './tabbedSection';

interface ProfileInfoProps {
  user: UserProfile;
  onUpdate: () => void;
}

export default function ProfileInfo({ user, onUpdate }: ProfileInfoProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar & Verification */}
            <div className="text-center md:text-left">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.fullname || user.username} 
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-50"
                />
                {user.isVerified && (
                  <span className="absolute bottom-2 right-2 bg-green-500 p-2 rounded-full">
                    <Check className="w-5 h-5 text-white" />
                  </span>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-6">
              {/* Name & Username */}
              <div>
                <h1 className="text-3xl font-bold text-[#0D3880] mb-2">
                  {user.fullname || user.username}
                </h1>
                <p className="text-gray-500 text-lg">@{user.username}</p>
              </div>

              {/* User Details */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-[#E60278] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700">{user.email}</p>
                  </div>
                </div>

                {/* Gender */}
                {user.gender && (
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <User className="w-5 h-5 text-[#E60278] mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="text-gray-700 capitalize">{user.gender}</p>
                    </div>
                  </div>
                )}

                {/* Date of Birth */}
                {user.dob && (
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#E60278] mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-gray-700">{formatDate(user.dob)}</p>
                    </div>
                  </div>
                )}

                {/* Education */}
                {user.lastEdu && (
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-[#E60278] mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Education</p>
                      <p className="text-gray-700">{eduFormatter(user.lastEdu)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <button 
              onClick={() => setShowEditForm(true)}
              className="text-[#E60278] hover:bg-pink-50 p-3 rounded-xl transition-colors"
            >
              <Edit className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabbed Sections */}
        <TabbedSection user={user} onUpdate={onUpdate} />

        {/* Edit Form Modal */}
        {showEditForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <ProfileEditForm
                user={user}
                handleClose={() => setShowEditForm(false)}
                onUpdate={onUpdate}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}