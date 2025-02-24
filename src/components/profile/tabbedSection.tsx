"use client";
import { useState } from "react";
import { UserProfile, CurriculumVitae } from "@/types/profile";
import { updateCV } from "@/libs/auth";
import ApplicationsSection from "./applicationSection";
import CvSection from "./CvSection";

interface TabbedSectionProps {
  user: UserProfile;
  onUpdate: () => void;
}

export default function TabbedSection({ user, onUpdate }: TabbedSectionProps) {
  const [activeTab, setActiveTab] = useState<"academic" | "applications">(
    "academic",
  );

  const handleCVSave = async (cvData: Omit<CurriculumVitae, "id">) => {
    try {
      await updateCV(user.id, cvData);
      await onUpdate();
    } catch (error) {
      console.error("Error updating CV:", error);
      throw error;
    }
  };

  return (
    <div className="mb-6 rounded-xl bg-white shadow-lg">
      {/* Tabs Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("academic")}
          className={`relative px-8 py-3 text-lg font-medium transition-colors ${
            activeTab === "academic"
              ? "border-b-2 border-[#0D3880] text-[#0D3880]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Curriculum Vitae
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`relative px-8 py-3 text-lg font-medium transition-colors ${
            activeTab === "applications"
              ? "border-b-2 border-[#0D3880] text-[#0D3880]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Job Applications
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "academic" && (
          <CvSection
            initialCV={user.CurriculumVitae?.[0] || null}
            onSave={handleCVSave}
            user={user}
          />
        )}

        {activeTab === "applications" && (
          <ApplicationsSection applications={user.JobApplication || []} />
        )}
      </div>
    </div>
  );
}
