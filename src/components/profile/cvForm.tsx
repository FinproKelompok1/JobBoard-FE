"use client";
import { useState } from "react";
import {
  FileText,
  Edit,
  Save,
  BriefcaseIcon,
  GraduationCap,
  Award,
  RadioTower,
} from "lucide-react";
import { CurriculumVitae } from "@/types/profile";

export interface CVInputSectionProps {
  initialCV: CurriculumVitae | null;
  onSave: (cvData: Omit<CurriculumVitae, "id">) => Promise<void>;
}

export default function CVInputSection({
  initialCV,
  onSave,
}: CVInputSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cvData, setCvData] = useState({
    summary: initialCV?.summary || "",
    experience: initialCV?.experience || "",
    skill: initialCV?.skill || "",
    education: initialCV?.education || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSave(cvData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving CV:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-7 w-7 text-[#E60278]" />
            <h2 className="text-2xl font-bold text-[#0D3880]">
              Curriculum Vitae
            </h2>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="hover:bg-pink-50 inline-flex items-center gap-2 rounded-lg p-2 text-[#E60278] transition-colors"
          >
            <Edit className="h-5 w-5" />
            <span>Edit CV</span>
          </button>
        </div>

        {/* Summary */}
        <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <RadioTower className="h-5 w-5 text-[#0D3880]" />
            <h3 className="text-lg font-semibold text-[#0D3880]">Summary</h3>
          </div>
          <p className="whitespace-pre-wrap text-gray-600">
            {cvData.summary || "Belum ada summary"}
          </p>
        </div>

        {/* Experience */}
        <div className="from-pink-50 border-pink-100 rounded-xl border bg-gradient-to-r to-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <BriefcaseIcon className="h-5 w-5 text-[#E60278]" />
            <h3 className="text-lg font-semibold text-[#0D3880]">Experience</h3>
          </div>
          <div className="whitespace-pre-wrap text-gray-600">
            {cvData.experience || "Belum ada pengalaman"}
          </div>
        </div>

        {/* Skills */}
        <div className="rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-[#0D3880]">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {cvData.skill ? (
              cvData.skill.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full border border-purple-200 bg-white px-3 py-1 text-sm text-[#0D3880] shadow-sm"
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
        <div className="rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-[#0D3880]">Education</h3>
          </div>
          <div className="whitespace-pre-wrap text-gray-600">
            {cvData.education || "Belum ada data pendidikan"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-7 w-7 text-[#E60278]" />
          <h2 className="text-2xl font-bold text-[#0D3880]">Edit Data CV</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded-lg px-4 py-2 text-gray-500 transition-colors hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="hover:bg-pink-700 inline-flex items-center gap-2 rounded-lg bg-[#E60278] px-4 py-2 text-white transition-colors"
            disabled={loading}
          >
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary Input */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <RadioTower className="h-4 w-4 text-[#0D3880]" />
            <label className="text-sm font-medium text-gray-700">Summary</label>
          </div>
          <textarea
            value={cvData.summary}
            onChange={(e) =>
              setCvData((prev) => ({ ...prev, summary: e.target.value }))
            }
            className="w-full rounded-lg border bg-gray-50 p-3 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
            rows={4}
            placeholder="Tuliskan ringkasan tentang diri Anda..."
          />
        </div>

        {/* Experience Input */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <BriefcaseIcon className="h-4 w-4 text-[#E60278]" />
            <label className="text-sm font-medium text-gray-700">
              Experience
            </label>
          </div>
          <textarea
            value={cvData.experience}
            onChange={(e) =>
              setCvData((prev) => ({ ...prev, experience: e.target.value }))
            }
            className="w-full rounded-lg border bg-gray-50 p-3 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
            rows={6}
            placeholder="Ceritakan pengalaman kerja Anda (bisa lebih dari satu)..."
          />
        </div>

        {/* Skills Input */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-600" />
            <label className="text-sm font-medium text-gray-700">
              Skills (pisahkan dengan koma)
            </label>
          </div>
          <input
            type="text"
            value={cvData.skill}
            onChange={(e) =>
              setCvData((prev) => ({ ...prev, skill: e.target.value }))
            }
            className="w-full rounded-lg border bg-gray-50 p-3 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
            placeholder="Contoh: JavaScript, React, Node.js"
          />
        </div>

        {/* Education Input */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-green-600" />
            <label className="text-sm font-medium text-gray-700">
              Education
            </label>
          </div>
          <textarea
            value={cvData.education}
            onChange={(e) =>
              setCvData((prev) => ({ ...prev, education: e.target.value }))
            }
            className="w-full rounded-lg border bg-gray-50 p-3 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
            rows={4}
            placeholder="Tuliskan riwayat pendidikan Anda..."
          />
        </div>
      </div>
    </form>
  );
}
