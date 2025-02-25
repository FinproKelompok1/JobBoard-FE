"use client";
import { useState } from "react";
import {
  FileText,
  Edit,
  BriefcaseIcon,
  GraduationCap,
  Award,
  RadioTower,
  Download,
  Plus,
} from "lucide-react";
import { CurriculumVitae, UserProfile } from "@/types/profile";
import { handleDownloadCV } from "../cv/downloadCV";
import CreateCV from "../cv/createCV";
import { SimpleDateFormatter } from "@/helpers/dateFormatter";
import UpdateCV from "../cv/updateCV";
import Link from "next/link";

export interface CvSectionProps {
  user: UserProfile;
  initialCV: CurriculumVitae;
  onSave: (cvData: Omit<CurriculumVitae, "id">) => Promise<void>;
}

export default function CvSection({ user, initialCV }: CvSectionProps) {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const cvData = {
    summary: initialCV?.summary,
    workExperience: initialCV?.experience,
    skill: initialCV?.skill,
    education: initialCV?.education,
  };

  const parseWorkExperiences = (workExperiences: string) => {
    return (
      workExperiences &&
      workExperiences
        .split(";")
        .map((experience) => {
          const parts = experience.split(",");
          if (parts.length < 5) return null;

          return {
            company: parts[0].trim(),
            jobTitle: parts[1].trim(),
            startDate: parts[2].trim(),
            endDate: parts[3].trim(),
            description: parts.slice(4).join(",").trim(),
          };
        })
        .filter(Boolean)
    );
  };

  const workExperiencesArray =
    parseWorkExperiences(cvData.workExperience) || [];

  const parseEducations = (educations: string) => {
    return (
      educations &&
      educations
        .split(";")
        .map((education) => {
          const parts = education.split(",");
          if (parts.length < 5) return null;

          return {
            schoolName: parts[0].trim(),
            degree: parts[1].trim(),
            field: parts[2].trim(),
            startDate: parts[3].trim(),
            endDate: parts[4].trim(),
            description: parts.slice(5).join(",").trim(),
          };
        })
        .filter(Boolean)
    );
  };

  const educationsArray = parseEducations(cvData.education) || [];

  const hasActiveSubscription = user.UserSubscription?.some(
    (sub) => sub.isActive || new Date(sub.endDate) > new Date(),
  );

  if (!isEditing && !isCreating) {
    return (
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-7 w-7 text-[#E60278]" />
            <h2 className="text-2xl font-bold text-[#0D3880]">
              Curriculum Vitae
            </h2>
          </div>
          <div className="flex items-center gap-5">
            {hasActiveSubscription ? (
              !cvData.summary &&
              !cvData.workExperience &&
              !cvData.skill &&
              !cvData.education ? (
                <button
                  onClick={() => setIsCreating(true)}
                  className="flex items-center gap-2 rounded-lg border border-accent bg-accent px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/80"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create CV</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-accent px-4 py-2 font-medium text-[#E60278] transition-all duration-300 ease-in-out hover:bg-accent hover:text-white"
                  >
                    <Edit className="h-5 w-5" />
                    <span>Edit CV</span>
                  </button>
                  <button
                    onClick={() =>
                      handleDownloadCV(user.username, setIsDownloading)
                    }
                    disabled={isDownloading}
                    className="flex items-center gap-2 rounded-lg border border-accent bg-accent px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/80"
                  >
                    <Download className="h-5 w-5" />
                    {isDownloading ? "Downloading..." : "Download"}
                  </button>
                </>
              )
            ) : (
              <p className="text-lg text-gray-700">
                Please{" "}
                <Link
                  href="/subscription"
                  className="text-accent hover:underline"
                >
                  subscribe
                </Link>{" "}
                to generate CV.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <RadioTower className="h-5 w-5 text-[#0D3880]" />
            <h3 className="text-lg font-semibold text-[#0D3880]">Summary</h3>
          </div>
          <p className="whitespace-pre-wrap text-gray-600">
            {cvData?.summary || "No summary provided yet"}
          </p>
        </div>

        <div className="border-pink-100 rounded-xl border bg-gradient-to-r from-pink/10 to-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <BriefcaseIcon className="h-5 w-5 text-[#E60278]" />
            <h3 className="text-lg font-semibold text-[#0D3880]">
              Work Experience
            </h3>
          </div>
          <div className="whitespace-pre-wrap text-gray-600">
            {cvData?.workExperience ? (
              workExperiencesArray.length > 0 ? (
                <div className="ml-4 mt-5">
                  <ul className="list-disc space-y-4">
                    {workExperiencesArray.map((exp, index) => (
                      <li key={index} className="border-b pb-5">
                        <h1 className="text-xl font-bold">{exp?.jobTitle}</h1>
                        <h2 className="text-lg font-medium">{exp?.company}</h2>
                        <p className="mt-1 text-lg font-medium text-gray-600">
                          {SimpleDateFormatter(exp!.startDate)} -{" "}
                          {exp?.endDate === "Present"
                            ? "Present"
                            : SimpleDateFormatter(exp!.endDate)}
                        </p>
                        <p className="mt-1 text-gray-800">{exp?.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No work experience provided yet</p>
              )
            ) : (
              <p>No work experience provided yet</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-[#0D3880]">Education</h3>
          </div>
          <div className="whitespace-pre-wrap text-gray-600">
            {cvData?.education ? (
              educationsArray.length > 0 ? (
                <div className="ml-4 mt-5">
                  <ul className="list-disc space-y-4">
                    {educationsArray.map((edu, index) => (
                      <li key={index} className="border-b pb-5">
                        <h1 className="text-xl font-bold">{edu?.schoolName}</h1>
                        <div className="flex items-center gap-1">
                          <h2 className="text-lg font-medium">{edu?.degree}</h2>
                          <p>-</p>
                          <h2 className="text-lg font-medium">{edu?.field}</h2>
                        </div>

                        <p className="mt-1 text-lg font-medium text-gray-500">
                          {SimpleDateFormatter(edu!.startDate)} -{" "}
                          {edu?.endDate === "Present"
                            ? "Present"
                            : SimpleDateFormatter(edu!.endDate)}
                        </p>
                        <p className="mt-1 text-gray-800">{edu?.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No education provided yet</p>
              )
            ) : (
              <p>No education provided yet</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-[#0D3880]">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {cvData?.skill ? (
              cvData.skill.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full border border-purple-200 bg-white px-3 py-1 text-sm text-[#0D3880] shadow-sm"
                >
                  {skill.trim()}
                </span>
              ))
            ) : (
              <p className="text-gray-600">No skill provided yet</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div>
        <CreateCV setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div>
        <UpdateCV setIsEditing={setIsEditing} cv={initialCV} />
      </div>
    );
  }
}
