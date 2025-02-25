"use client";
import { useState } from "react";
import { User, Calendar, GraduationCap, Mail, Edit, Check, MapPin } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { formatDate } from "@/helpers/dateFormatter";
import { eduFormatter } from "@/helpers/educationFormatter";
import ProfileEditForm from "./profileCV";
import TabbedSection from "./tabbedSection";
import Image from "next/image";
import Link from "next/link";

interface ProfileInfoProps {
  user: UserProfile;
  onUpdate: () => void;
}

export default function ProfileInfo({ user, onUpdate }: ProfileInfoProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl space-y-6 px-4 py-8">
        {/* Profile Card */}
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            {/* Avatar & Verification */}
            <div className="text-center md:text-left">
              <div className="relative">
                <Image
                  src={user.avatar}
                  alt={user.fullname || user.username}
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full border-4 border-blue-50 object-cover"
                />
                {user.isVerified && (
                  <span className="absolute bottom-2 right-2 rounded-full bg-green-500 p-2">
                    <Check className="h-5 w-5 text-white" />
                  </span>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-6">
              {/* Name & Username */}
              <div className="flex items-center gap-5">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-[#0D3880]">
                    {user.fullname || user.username}
                  </h1>
                  <p className="text-lg text-gray-500">@{user.username}</p>
                </div>
                <div>
                  {user.UserAssessment && user.UserAssessment.length > 0 &&
                    user.UserAssessment
                      .filter((data) => data.status === "passed")
                      .map((data, index) => (
                        <Link
                          href={`/assessment/${data.User?.username}/${data.id}/certificate`}
                          key={index}
                          className="flex flex-col items-center justify-center rounded-xl border bg-primary p-1"
                        >
                          <Image
                            src={data.certificate?.badgeIcon || ''}
                            alt="badge image"
                            width={100}
                            height={100}
                            className="w-10"
                          />
                          <span className="font-bold tracking-widest text-white">
                            {data.assessment?.title
                              ? data.assessment.title
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .toUpperCase()
                              : ''}
                          </span>
                        </Link>
                      ))}
                </div>
              </div>

              {/* User Details Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Email */}
                <div className="flex items-center rounded-lg bg-gray-50 p-3">
                  <Mail className="mr-3 h-5 w-5 text-[#E60278]" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700">{user.email}</p>
                  </div>
                </div>

                {/* Gender */}
                {user.gender && (
                  <div className="flex items-center rounded-lg bg-gray-50 p-3">
                    <User className="mr-3 h-5 w-5 text-[#E60278]" />
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="capitalize text-gray-700">{user.gender}</p>
                    </div>
                  </div>
                )}

                {/* Date of Birth */}
                {user.dob && (
                  <div className="flex items-center rounded-lg bg-gray-50 p-3">
                    <Calendar className="mr-3 h-5 w-5 text-[#E60278]" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-gray-700">{formatDate(user.dob)}</p>
                    </div>
                  </div>
                )}

                {/* Education */}
                {user.lastEdu && (
                  <div className="flex items-center rounded-lg bg-gray-50 p-3">
                    <GraduationCap className="mr-3 h-5 w-5 text-[#E60278]" />
                    <div>
                      <p className="text-sm text-gray-500">Education</p>
                      <p className="text-gray-700">
                        {eduFormatter(user.lastEdu)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Location */}
                {(user.province || user.city) && (
                  <div className="flex items-center rounded-lg bg-gray-50 p-3">
                    <MapPin className="mr-3 h-5 w-5 text-[#E60278]" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-700">
                        {[user.province, user.city].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setShowEditForm(true)}
              className="hover:bg-pink-50 rounded-xl p-3 text-[#E60278] transition-colors"
            >
              <Edit className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Tabbed Sections */}
        <TabbedSection user={user} onUpdate={onUpdate} />

        {/* Edit Form Modal */}
        {showEditForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white">
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