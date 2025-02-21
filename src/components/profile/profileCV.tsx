import React, { useState } from 'react';
import { X, Upload, Mail, Lock, Save } from 'lucide-react';
import { UserProfile, Gender, LastEdu } from '@/types/profile';
import { UpdateProfile, uploadProfileImage } from '@/libs/auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProfileEditFormProps {
  user: UserProfile;
  handleClose: () => void;
  onUpdate: () => void;
}

export default function ProfileEditForm({ user, handleClose, onUpdate }: ProfileEditFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: user.fullname || '',
    gender: user.gender || '',
    dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    lastEdu: user.lastEdu || '',
    avatar: user.avatar,
  });

  const [emailData, setEmailData] = useState({
    newEmail: '',
    password: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await UpdateProfile(user.id.toString(), formData);
      onUpdate();
      handleClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        setError('');
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({ ...prev, avatar: e.target?.result as string }));
        };
        reader.readAsDataURL(file);

        const response = await uploadProfileImage(file);
        setFormData(prev => ({ ...prev, avatar: response.data.avatar }));
        onUpdate();
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Failed to upload image. Please try again.');
        setFormData(prev => ({ ...prev, avatar: user.avatar }));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email change requested:', emailData);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password change requested:', passwordData);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#0D3880]">Edit Profile</h2>
        <button 
          onClick={handleClose} 
          className="text-gray-500 hover:text-gray-700"
          disabled={loading}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium mb-2">Profile Picture</label>
          <div className="flex items-center gap-4">
            <img 
              src={formData.avatar} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover border border-gray-200"
            />
            <label className="cursor-pointer flex items-center gap-2 text-[#E60278] hover:bg-pink-50 px-4 py-2 rounded-lg">
              <Upload className="w-4 h-4" />
              Upload New Photo
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={formData.fullname}
              onChange={(e) => setFormData(prev => ({ ...prev, fullname: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
              disabled={loading}
            />
          </div>

          {/* Current Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium mb-2">Current Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={user.email}
                className="w-full p-2 border rounded-lg bg-gray-50"
                disabled
              />
              <button
                type="button"
                onClick={() => setShowEmailDialog(true)}
                className="px-3 py-2 text-[#E60278] hover:bg-pink-50 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as Gender }))}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
              disabled={loading}
            >
              <option value="">Select Gender</option>
              <option value={Gender.male}>Male</option>
              <option value={Gender.female}>Female</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
              disabled={loading}
            />
          </div>

          {/* Last Education */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Last Education</label>
            <select
              value={formData.lastEdu}
              onChange={(e) => setFormData(prev => ({ ...prev, lastEdu: e.target.value as LastEdu }))}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
              disabled={loading}
            >
              <option value="">Select Education</option>
              <option value={LastEdu.highSchoolDiploma}>High School Diploma</option>
              <option value={LastEdu.bachelor}>Bachelor</option>
              <option value={LastEdu.diploma}>Diploma</option>
              <option value={LastEdu.master}>Master</option>
              <option value={LastEdu.doctoral}>Doctoral</option>
            </select>
          </div>
        </div>

        {/* Password Change Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowPasswordDialog(true)}
            className="text-[#E60278] hover:bg-pink-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Change Password
          </button>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end pt-4 border-t">
          <button 
            type="button"
            onClick={handleClose}
            className="mr-3 px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="bg-[#E60278] text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            disabled={loading}
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Email Change Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Email Address</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEmailChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">New Email Address</label>
              <input
                type="email"
                value={emailData.newEmail}
                onChange={(e) => setEmailData(prev => ({ ...prev, newEmail: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={emailData.password}
                onChange={(e) => setEmailData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowEmailDialog(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#E60278] text-white px-4 py-2 rounded-lg hover:bg-pink-700"
              >
                Change Email
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPasswordDialog(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#E60278] text-white px-4 py-2 rounded-lg hover:bg-pink-700"
              >
                Change Password
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}