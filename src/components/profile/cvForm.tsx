'use client'
import { useState } from 'react';
import { FileText, Edit, Save, BriefcaseIcon, GraduationCap, Award, RadioTower } from 'lucide-react';
import { CurriculumVitae } from '@/types/profile';

export interface CVInputSectionProps {
  initialCV: CurriculumVitae | null; 
  onSave: (cvData: Omit<CurriculumVitae, 'id'>) => Promise<void>;
}


export default function CVInputSection({ initialCV, onSave }: CVInputSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cvData, setCvData] = useState({
    summary: initialCV?.summary || '',
    experience: initialCV?.experience || '',
    skill: initialCV?.skill || '',
    education: initialCV?.education || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSave(cvData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving CV:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <FileText className="w-7 h-7 text-[#E60278]" />
            <h2 className="text-2xl font-bold text-[#0D3880]">Data CV</h2>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-[#E60278] hover:bg-pink-50 p-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Edit className="w-5 h-5" />
            <span>Edit CV</span>
          </button>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <RadioTower className="w-5 h-5 text-[#0D3880]" />
            <h3 className="text-lg font-semibold text-[#0D3880]">Summary</h3>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap">
            {cvData.summary || 'Belum ada summary'}
          </p>
        </div>

        {/* Experience */}
        <div className="bg-gradient-to-r from-pink-50 to-white p-6 rounded-xl border border-pink-100">
          <div className="flex items-center gap-2 mb-4">
            <BriefcaseIcon className="w-5 h-5 text-[#E60278]" />
            <h3 className="text-lg font-semibold text-[#0D3880]">Experience</h3>
          </div>
          <div className="text-gray-600 whitespace-pre-wrap">
            {cvData.experience || 'Belum ada pengalaman'}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-[#0D3880]">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {cvData.skill ? (
              cvData.skill.split(',').map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-white text-[#0D3880] rounded-full text-sm border border-purple-200 shadow-sm"
                >
                  {skill.trim()}
                </span>
              ))
            ) : (
              <p className="text-gray-600">Belum ada skills</p>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-[#0D3880]">Education</h3>
          </div>
          <div className="text-gray-600 whitespace-pre-wrap">
            {cvData.education || 'Belum ada data pendidikan'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <FileText className="w-7 h-7 text-[#E60278]" />
          <h2 className="text-2xl font-bold text-[#0D3880]">Edit Data CV</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#E60278] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors inline-flex items-center gap-2"
            disabled={loading}
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary Input */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <RadioTower className="w-4 h-4 text-[#0D3880]" />
            <label className="text-sm font-medium text-gray-700">
              Summary
            </label>
          </div>
          <textarea
            value={cvData.summary}
            onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278] bg-gray-50"
            rows={4}
            placeholder="Tuliskan ringkasan tentang diri Anda..."
          />
        </div>

        {/* Experience Input */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BriefcaseIcon className="w-4 h-4 text-[#E60278]" />
            <label className="text-sm font-medium text-gray-700">
              Experience
            </label>
          </div>
          <textarea
            value={cvData.experience}
            onChange={(e) => setCvData(prev => ({ ...prev, experience: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278] bg-gray-50"
            rows={6}
            placeholder="Ceritakan pengalaman kerja Anda (bisa lebih dari satu)..."
          />
        </div>

        {/* Skills Input */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-purple-600" />
            <label className="text-sm font-medium text-gray-700">
              Skills (pisahkan dengan koma)
            </label>
          </div>
          <input
            type="text"
            value={cvData.skill}
            onChange={(e) => setCvData(prev => ({ ...prev, skill: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278] bg-gray-50"
            placeholder="Contoh: JavaScript, React, Node.js"
          />
        </div>

        {/* Education Input */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4 text-green-600" />
            <label className="text-sm font-medium text-gray-700">
              Education
            </label>
          </div>
          <textarea
            value={cvData.education}
            onChange={(e) => setCvData(prev => ({ ...prev, education: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278] bg-gray-50"
            rows={4}
            placeholder="Tuliskan riwayat pendidikan Anda..."
          />
        </div>
      </div>
    </form>
  );
}