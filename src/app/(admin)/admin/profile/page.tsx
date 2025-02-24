'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminProfile, updateAdminProfile } from '@/libs/companyProfile';
import AdminProfileForm from '@/components/profile/company';
import LoadingPage from '@/components/loading';
import { toast } from 'react-toastify';
import { AdminProfile, ProfileFormData } from '@/types/company';

export default function AdminProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getAdminProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (formData: ProfileFormData) => {
    try {
      await updateAdminProfile(formData);
      toast.success('Profile updated successfully');
      router.refresh();
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {profile && (
            <AdminProfileForm 
              initialData={profile} 
              onSubmit={handleSubmit} 
            />
          )}
        </div>
      </div>
    </div>
  );
}