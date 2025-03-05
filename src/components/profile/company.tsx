import React, { useState } from "react";
import { Building2, Mail, Phone, Pencil, Check, X } from "lucide-react";
import dynamic from "next/dynamic";
import { AdminProfile, ProfileFormData } from "@/types/company";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

interface AdminProfileFormProps {
  initialData: AdminProfile;
  onSubmit: (data: ProfileFormData) => Promise<void>;
}

interface FormData {
  companyName: string;
  email: string;
  noHandphone: string;
  description: string;
  logo?: File;
}

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-lg bg-gray-100" />,
});

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

export default function AdminProfileForm({
  initialData,
  onSubmit,
}: AdminProfileFormProps) {
  const [formData, setFormData] = useState<FormData>({
    companyName: initialData.companyName || "",
    email: initialData.email || "",
    noHandphone: initialData.noHandphone || "",
    description: initialData.description || "",
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialData.logo,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [editMode, setEditMode] = useState({
    logo: false,
    basicInfo: false,
    description: false,
  });

  const [passwordChangeData, setPasswordChangeData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Hanya file JPG, JPEG, dan PNG yang diperbolehkan.");
      return;
    }

    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Ukuran file tidak boleh melebihi 1 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));
  }
};

  const handleDescriptionChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setEditMode({
        logo: false,
        basicInfo: false,
        description: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordChangeData.newPassword !== passwordChangeData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    setShowPasswordDialog(false);
  };

  return (
    <div className="rounded-xl bg-white p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
          <p className="mt-1 text-gray-500">
            Manage your company&apos;s public information
          </p>
        </div>
        <div className="hidden h-1 w-32 rounded-full bg-gradient-to-r from-[#E60278] to-[#0D3880] sm:block" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="absolute right-4 top-4">
            {!editMode.logo ? (
              <button
                type="button"
                onClick={() => setEditMode((prev) => ({ ...prev, logo: true }))}
                className="hover:bg-pink-50 rounded-lg p-2 text-gray-400 transition-colors hover:text-[#E60278]"
              >
                <Pencil size={16} />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    setEditMode((prev) => ({ ...prev, logo: false }))
                  }
                  className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
                >
                  <Check size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode((prev) => ({ ...prev, logo: false }));
                    setLogoPreview(initialData.logo);
                  }}
                  className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Company Logo
          </h3>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-gray-50">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Company logo"
                    className="h-full w-full object-cover"
                    width={128}
                    height={128}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Building2 className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
        {editMode.logo && (
  <input
    type="file"
    accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
    onChange={handleLogoChange}
    className="hidden"
    id="logo-upload"
  />
)}
              {editMode.logo && (
                <label
                  htmlFor="logo-upload"
                  className="hover:bg-pink-50 absolute -bottom-2 -right-2 cursor-pointer rounded-xl border border-gray-100 bg-white p-2 shadow-lg transition-colors duration-300"
                >
                  <svg
                    className="h-5 w-5 text-[#E60278]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </label>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Upload a high-quality image of your company logo
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Recommended: Square image, 400x400px, max 1MB, format: JPG, JPEG, PNG
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="absolute right-4 top-4">
            {!editMode.basicInfo ? (
              <button
                type="button"
                onClick={() =>
                  setEditMode((prev) => ({ ...prev, basicInfo: true }))
                }
                className="hover:bg-pink-50 rounded-lg p-2 text-gray-400 transition-colors hover:text-[#E60278]"
              >
                <Pencil size={16} />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    setEditMode((prev) => ({ ...prev, basicInfo: false }))
                  }
                  className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
                >
                  <Check size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode((prev) => ({ ...prev, basicInfo: false }));
                    setFormData((prev) => ({
                      ...prev,
                      companyName: initialData.companyName,
                      noHandphone: initialData.noHandphone,
                    }));
                  }}
                  className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <h3 className="mb-6 text-lg font-semibold text-gray-900">
            Basic Information
          </h3>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  disabled={!editMode.basicInfo}
                  className={`w-full rounded-lg border p-2.5 pl-10 transition-colors ${
                    editMode.basicInfo
                      ? "border-gray-200 hover:border-[#E60278] focus:border-[#E60278] focus:ring-2 focus:ring-[#E60278]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                  placeholder="Enter company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={initialData.email}
                      disabled
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 pl-10"
                    />
                  </div>
                  <button
                    type="button"
                    className="hover:bg-pink-50 rounded-lg px-3 py-2 text-[#E60278] transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="noHandphone"
                    value={formData.noHandphone}
                    onChange={handleInputChange}
                    disabled={!editMode.basicInfo}
                    className={`w-full rounded-lg border p-2.5 pl-10 transition-colors ${
                      editMode.basicInfo
                        ? "border-gray-200 hover:border-[#E60278] focus:border-[#E60278] focus:ring-2 focus:ring-[#E60278]"
                        : "border-gray-200 bg-gray-50"
                    }`}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="absolute right-4 top-4">
            {!editMode.description ? (
              <button
                type="button"
                onClick={() =>
                  setEditMode((prev) => ({ ...prev, description: true }))
                }
                className="hover:bg-pink-50 rounded-lg p-2 text-gray-400 transition-colors hover:text-[#E60278]"
              >
                <Pencil size={16} />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    setEditMode((prev) => ({ ...prev, description: false }))
                  }
                  className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
                >
                  <Check size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode((prev) => ({ ...prev, description: false }));
                    setFormData((prev) => ({
                      ...prev,
                      description: initialData.description,
                    }));
                  }}
                  className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Company Description
          </h3>
          <div
            className={`overflow-hidden rounded-lg transition-colors ${editMode.description ? "border border-gray-200" : "bg-gray-50"}`}
          >
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}
              modules={quillModules}
              className="h-64"
              theme="snow"
              readOnly={!editMode.description}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={
              isSubmitting ||
              (!editMode.logo && !editMode.basicInfo && !editMode.description)
            }
            className={`rounded-lg px-6 py-2.5 font-medium transition-all duration-300 ${
              isSubmitting ||
              (!editMode.logo && !editMode.basicInfo && !editMode.description)
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-[#E60278] text-white shadow-sm hover:bg-[#D1006C] hover:shadow-md"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving Changes...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                value={passwordChangeData.currentPassword}
                onChange={(e) =>
                  setPasswordChangeData((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                className="w-full rounded-lg border p-2.5 focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={passwordChangeData.newPassword}
                onChange={(e) =>
                  setPasswordChangeData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="w-full rounded-lg border p-2.5 focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordChangeData.confirmPassword}
                onChange={(e) =>
                  setPasswordChangeData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="w-full rounded-lg border p-2.5 focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setShowPasswordDialog(false)}
                className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="hover:bg-pink-700 rounded-lg bg-[#E60278] px-4 py-2 text-white"
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