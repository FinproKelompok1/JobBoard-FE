import React, { useState } from "react";
import { X, Upload, Mail, Save } from "lucide-react";
import { UserProfile, Gender, LastEdu } from "@/types/profile";
import { changeEmail, UpdateProfile, uploadProfileImage } from "@/libs/auth";
import { PasswordChangeForm } from "@/components/profile/PasswordChangeForm";
import SelectProfileProvince from "./SelectProfileProvince";
import SelectProfileCity from "./SelectProfileCity";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { changePassword } from "@/libs/changePassword";
import { toastErrAxios } from "@/helpers/toast";

interface ProfileEditFormProps {
  user: UserProfile;
  handleClose: () => void;
  onUpdate: () => void;
}

// Updated FormData to include more specific type for index signature
interface FormData {
  fullname: string;
  gender: string;
  dob: string;
  lastEdu: string;
  avatar: string;
  province: string;
  city: string;
  cityCoordinates?: {
    latitude: number;
    longitude: number;
  };
  [key: string]: string | number | boolean | object | undefined;
}

export default function ProfileEditForm({
  user,
  handleClose,
  onUpdate,
}: ProfileEditFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [provinceId, setProvinceId] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    fullname: user.fullname || "",
    gender: user.gender || "",
    dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
    lastEdu: user.lastEdu || "",
    avatar: user.avatar,
    province: user.province || "",
    city: user.city || "",
  });

  const [emailData, setEmailData] = useState({
    newEmail: "",
    password: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await UpdateProfile(user.id.toString(), formData);
      onUpdate();
      handleClose();
    } catch (e) {
      setError("Failed to update profile. Please try again.");
      toastErrAxios(e);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        setError("");

        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData((prev) => ({
            ...prev,
            avatar: e.target?.result as string,
          }));
        };
        reader.readAsDataURL(file);

        const response = await uploadProfileImage(file);
        setFormData((prev) => ({ ...prev, avatar: response.data.avatar }));
        onUpdate();
      } catch (e) {
        setError("Failed to upload image. Please try again.");
        setFormData((prev) => ({ ...prev, avatar: user.avatar }));
        toastErrAxios(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      city: e.target.value,
    }));
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      await changeEmail({
        newEmail: emailData.newEmail,
        password: emailData.password,
      });

      setEmailData({
        newEmail: "",
        password: "",
      });
      setShowEmailDialog(false);
    } catch {
      // Error handling sudah ditangani oleh toastErrAxios di fungsi changeEmail
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setPasswordError("");

      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordDialog(false);
    } catch (e) {
      toastErrAxios(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0D3880]">Edit Profile</h2>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700"
          disabled={loading}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-200">
              <Image
                src={formData.avatar}
                alt="Profile"
                className="object-cover"
                fill
                sizes="80px"
              />
            </div>
            <label className="hover:bg-pink-50 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-[#E60278]">
              <Upload className="h-4 w-4" />
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
            <label className="mb-2 block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={formData.fullname}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullname: e.target.value }))
              }
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
              disabled={loading}
            />
          </div>

          {/* Current Email field with change button */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Current Email
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={user.email}
                className="w-full rounded-lg border bg-gray-50 p-2"
                disabled
              />
              <button
                type="button"
                onClick={() => setShowEmailDialog(true)}
                className="hover:bg-pink-50 rounded-lg px-3 py-2 text-[#E60278] transition-colors"
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="mb-2 block text-sm font-medium">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  gender: e.target.value as Gender,
                }))
              }
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
              disabled={loading}
            >
              <option value="">Select Gender</option>
              <option value={Gender.male}>Male</option>
              <option value={Gender.female}>Female</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
              disabled={loading}
            />
          </div>

          {/* Last Education */}
          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Last Education
            </label>
            <select
              value={formData.lastEdu}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lastEdu: e.target.value as LastEdu,
                }))
              }
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
              disabled={loading}
            >
              <option value="">Select Education</option>
              <option value={LastEdu.highSchoolDiploma}>
                High School Diploma
              </option>
              <option value={LastEdu.bachelor}>Bachelor</option>
              <option value={LastEdu.diploma}>Diploma</option>
              <option value={LastEdu.master}>Master</option>
              <option value={LastEdu.doctoral}>Doctoral</option>
            </select>
          </div>

          {/* Province & City */}
          <div>
            <label className="mb-2 block text-sm font-medium">Province</label>
            <SelectProfileProvince
              values={formData}
              handleChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData((prev) => ({ ...prev, province: e.target.value }))
              }
              setProvinceId={setProvinceId}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">City</label>
            <SelectProfileCity
              values={formData}
              handleChange={handleCityChange}
              provinceId={provinceId}
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end border-t pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="mr-3 rounded-lg px-6 py-2 text-gray-600 transition-colors hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="hover:bg-pink-700 flex items-center gap-2 rounded-lg bg-[#E60278] px-6 py-2 text-white transition-colors disabled:opacity-50"
            disabled={loading}
          >
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : "Save Changes"}
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
              <label className="mb-2 block text-sm font-medium">
                New Email Address
              </label>
              <input
                type="email"
                value={emailData.newEmail}
                onChange={(e) =>
                  setEmailData((prev) => ({
                    ...prev,
                    newEmail: e.target.value,
                  }))
                }
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                value={emailData.password}
                onChange={(e) =>
                  setEmailData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowEmailDialog(false)}
                className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="hover:bg-pink-700 rounded-lg bg-[#E60278] px-4 py-2 text-white"
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
          <form onSubmit={handlePasswordChange}>
            <PasswordChangeForm
              passwordData={passwordData}
              setPasswordData={setPasswordData}
              loading={loading}
              passwordError={passwordError}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPasswordDialog(false)}
                className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="hover:bg-pink-700 rounded-lg bg-[#E60278] px-4 py-2 text-white disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}