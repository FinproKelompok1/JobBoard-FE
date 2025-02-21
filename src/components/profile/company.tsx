import React, { useState } from 'react';
import { Building2, Mail, Phone, Pencil, Check, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { AdminProfile, ProfileFormData } from '@/types/company';

// Define types
interface InitialData {
  companyName: string;
  email: string;
  noHandphone: string;
  description: string;
  logo: string | null;
}

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

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="bg-gray-100 animate-pulse h-64 rounded-lg" />
});

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean']
  ]
};

export default function AdminProfileForm({ initialData, onSubmit }: AdminProfileFormProps) {
    const [formData, setFormData] = useState<FormData>({
        companyName: initialData.companyName || '',
        email: initialData.email || '',
        noHandphone: initialData.noHandphone || '',
        description: initialData.description || ''
    });
  
    const [logoPreview, setLogoPreview] = useState<string | null>(initialData.logo);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editMode, setEditMode] = useState({
        logo: false,
        basicInfo: false,
        description: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size should be less than 2MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setFormData(prev => ({
                ...prev,
                logo: file
            }));
        }
    };

    const handleDescriptionChange = (content: string) => {
        setFormData(prev => ({
            ...prev,
            description: content
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            // Reset all edit modes after successful submit
            setEditMode({
                logo: false,
                basicInfo: false,
                description: false
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
                    <p className="text-gray-500 mt-1">Manage your company's public information</p>
                </div>
                <div className="hidden sm:block w-32 h-1 bg-gradient-to-r from-[#E60278] to-[#0D3880] rounded-full" />
            </div>
      
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Logo Upload Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group">
                    <div className="absolute right-4 top-4">
                        {!editMode.logo ? (
                            <button
                                type="button"
                                onClick={() => setEditMode(prev => ({ ...prev, logo: true }))}
                                className="p-2 text-gray-400 hover:text-[#E60278] hover:bg-pink-50 rounded-lg transition-colors"
                            >
                                <Pencil size={16} />
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setEditMode(prev => ({ ...prev, logo: false }))}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                >
                                    <Check size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditMode(prev => ({ ...prev, logo: false }));
                                        setLogoPreview(initialData.logo);
                                    }}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
          
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Logo</h3>
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group-hover:border-[#E60278] transition-colors">
                                {logoPreview ? (
                                    <img
                                        src={logoPreview}
                                        alt="Company logo"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Building2 className="w-16 h-16 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            {editMode.logo && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                    id="logo-upload"
                                />
                            )}
                            {editMode.logo && (
                                <label
                                    htmlFor="logo-upload"
                                    className="absolute -bottom-2 -right-2 bg-white rounded-xl p-2 shadow-lg cursor-pointer hover:bg-pink-50 transition-colors duration-300 border border-gray-100"
                                >
                                    <svg className="w-5 h-5 text-[#E60278]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </label>
                            )}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Upload a high-quality image of your company logo</p>
                            <p className="text-gray-400 text-xs mt-2">Recommended: Square image, 400x400px, max 2MB</p>
                        </div>
                    </div>
                </div>

                {/* Basic Information Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
                    <div className="absolute right-4 top-4">
                        {!editMode.basicInfo ? (
                            <button
                                type="button"
                                onClick={() => setEditMode(prev => ({ ...prev, basicInfo: true }))}
                                className="p-2 text-gray-400 hover:text-[#E60278] hover:bg-pink-50 rounded-lg transition-colors"
                            >
                                <Pencil size={16} />
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setEditMode(prev => ({ ...prev, basicInfo: false }))}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                >
                                    <Check size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditMode(prev => ({ ...prev, basicInfo: false }));
                                        setFormData(prev => ({
                                            ...prev,
                                            companyName: initialData.companyName || '',
                                            email: initialData.email || '',
                                            noHandphone: initialData.noHandphone || ''
                                        }));
                                    }}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
          
                    <div className="space-y-6">
                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                    className={`pl-10 w-full p-2.5 border rounded-lg transition-colors
                    ${editMode.basicInfo
                                            ? 'border-gray-200 focus:ring-2 focus:ring-[#E60278] focus:border-[#E60278] hover:border-[#E60278]'
                                            : 'bg-gray-50 border-gray-200'
                                        }`}
                                    placeholder="Enter company name"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!editMode.basicInfo}
                                        className={`pl-10 w-full p-2.5 border rounded-lg transition-colors
                      ${editMode.basicInfo
                                                ? 'border-gray-200 focus:ring-2 focus:ring-[#E60278] focus:border-[#E60278] hover:border-[#E60278]'
                                                : 'bg-gray-50 border-gray-200'
                                            }`}
                                        placeholder="Enter email address"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                        className={`pl-10 w-full p-2.5 border rounded-lg transition-colors
                      ${editMode.basicInfo
                                                ? 'border-gray-200 focus:ring-2 focus:ring-[#E60278] focus:border-[#E60278] hover:border-[#E60278]'
                                                : 'bg-gray-50 border-gray-200'
                                            }`}
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
                    <div className="absolute right-4 top-4">
                        {!editMode.description ? (
                            <button
                                type="button"
                                onClick={() => setEditMode(prev => ({ ...prev, description: true }))}
                                className="p-2 text-gray-400 hover:text-[#E60278] hover:bg-pink-50 rounded-lg transition-colors"
                            >
                                <Pencil size={16} />
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setEditMode(prev => ({ ...prev, description: false }))}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                >
                                    <Check size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditMode(prev => ({ ...prev, description: false }));
                                        setFormData(prev => ({
                                            ...prev,
                                            description: initialData.description || ''
                                        }));
                                    }}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Description</h3>
                    <div className={`rounded-lg overflow-hidden transition-colors
            ${editMode.description
                            ? 'border border-gray-200'
                            : 'bg-gray-50'
                        }`}
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

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting || (!editMode.logo && !editMode.basicInfo && !editMode.description)}
                        className={`px-6 py-2.5 rounded-lg transition-all duration-300 font-medium
              ${(isSubmitting || (!editMode.logo && !editMode.basicInfo && !editMode.description))
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-[#E60278] text-white hover:bg-[#D1006C] shadow-sm hover:shadow-md'
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving Changes...
                            </span>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}