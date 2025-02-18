import { useState, useCallback } from "react";
import { Job } from "@/types/jobdis";
import { discoverJobs } from "@/libs/jobdis";
import { toast } from "react-toastify";
import { FilterParams } from "@/components/homepage/filter";

interface LocationState {
  city: string;
  province: string;
}

export function useJobs(userLocation: LocationState | null) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = useCallback(
    async (filters?: FilterParams) => {
      try {
        setIsLoading(true);

        const params = {
          ...(userLocation && {
            city: userLocation.city,
            province: userLocation.province,
          }),
          ...(filters && {
            search: filters.searchTerm,
            category: filters.category,
            province: filters.province,
            city: filters.city,
          }),
        };

        const jobsData = await discoverJobs(params);
        setJobs(jobsData || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Gagal mengambil data pekerjaan");
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    },
    [userLocation],
  );

  return { jobs, isLoading, fetchJobs };
}
