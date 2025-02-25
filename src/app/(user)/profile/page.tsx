"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/libs/auth";
import { UserProfile } from "@/types/profile";
import ProfileInfo from "@/components/profile/profileInfo";
import Loading from "@/components/loading";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data } = await getUserProfile();
      setUser(data);
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>No user data found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <ProfileInfo user={user} onUpdate={fetchUserProfile} />
      </div>
    </div>
  );
}
