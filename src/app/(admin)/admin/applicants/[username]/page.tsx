"use client";

import GoBack from "@/components/applicantsList/goBack";
import LoadingPage from "@/components/loading";
import ProfileInfo from "@/components/profile/profileInfo";
import { getApplicantDetail } from "@/libs/applicants";
import { UserProfile } from "@/types/profile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplicantDetailPage() {
  const { username } = useParams()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const data = await getApplicantDetail(username as string);
      setUser(data);
    } catch {
      setError("You cannot access this profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <LoadingPage />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>No user data found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-[940px] px-4">
        <GoBack />
        <ProfileInfo user={user} onUpdate={fetchUserProfile} />
      </div>
    </div>
  )
}